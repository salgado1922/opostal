/* Passaporte O Postal — carimbos guardados neste telemóvel. */
import coords from "@/data/stop-coords.json";
import { STAMP_STOPS } from "@/data/stamp-stops";
import { supabase } from "@/integrations/supabase/client";

export type Stamp = { at: string; verified: boolean; photo?: string; day?: string };
export type CityPassport = { name: string; total: number; stamps: Record<string, Stamp>; photos?: string[] };
export type Passport = Record<string, CityPassport>;

const KEY = "opostal:passaporte";
export const PASSPORT_EVENT = "opostal:passaporte";
export const VERIFY_RADIUS_M = 150;

const COORDS = coords as unknown as Record<string, [number, number]>;
export const coordsFor = (slug: string, title: string) => COORDS[`${slug}|${title}`];

export function readPassport(): Passport {
  try {
    const raw = window.localStorage.getItem(KEY);
    const p = raw ? (JSON.parse(raw) as Passport) : {};
    return p && typeof p === "object" ? normalize(p) : {};
  } catch {
    return {};
  }
}

export function writePassport(p: Passport): boolean {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(p));
    window.dispatchEvent(new Event(PASSPORT_EVENT));
    pushRemote(p);
    return true;
  } catch {
    return false;
  }
}

/** Traz os carimbos da versão antiga do modo de rua (sem verificação). */
export function migrateLegacy(slug: string, name: string, total: number) {
  try {
    const legacyKey = `opostal:rua:${slug}`;
    const raw = window.localStorage.getItem(legacyKey);
    if (!raw) return;
    const old = JSON.parse(raw) as Record<string, string[]>;
    const p = readPassport();
    const city = p[slug] ?? { name, total, stamps: {} };
    for (const [day, titles] of Object.entries(old)) {
      for (const t of titles ?? []) {
        if (!city.stamps[t]) city.stamps[t] = { at: new Date().toISOString(), verified: false, day };
      }
    }
    p[slug] = city;
    writePassport(p);
    window.localStorage.removeItem(legacyKey);
  } catch {
    /* ignora */
  }
}

export function distanceM(a: [number, number], b: [number, number]) {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b[0] - a[0]);
  const dLon = toRad(b[1] - a[1]);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

/** Dá folga para o erro do GPS (até 100 m) antes de comparar com o raio. */
export function isNear(distance: number, accuracy: number) {
  return distance - Math.min(accuracy, 100) <= VERIFY_RADIUS_M;
}

export function getPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) return reject(new Error("unsupported"));
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 30000,
    });
  });
}

/** Reduz a foto para caber no telemóvel sem encher a memória. */
export function compressPhoto(file: File, max = 520): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * scale);
      c.height = Math.round(img.height * scale);
      c.getContext("2d")?.drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL("image/jpeg", 0.68));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("img"));
    };
    img.src = url;
  });
}

export type Badge = { id: string; title: string; body: string; earned: boolean };

export function badgesFor(p: Passport): Badge[] {
  const all = Object.values(p).flatMap((c) => Object.values(c.stamps));
  const citiesWith = Object.values(p).filter((c) => Object.keys(c.stamps).length > 0).length;
  const complete = Object.values(p).filter(isComplete).length;
  const verified = all.filter((s) => s.verified).length;
  const early = all.some((s) => new Date(s.at).getHours() < 9);
  const photos = all.filter((s) => s.photo).length;
  return [
    { id: "primeiro", title: "Primeiro carimbo", body: "O passaporte já não está em branco.", earned: all.length > 0 },
    { id: "completa", title: "Cidade completa", body: "Todas as paragens de uma cidade.", earned: complete > 0 },
    { id: "tres", title: "Três cidades", body: "Carimbos em três cidades diferentes.", earned: citiesWith >= 3 },
    { id: "madrugador", title: "Madrugador", body: "Um carimbo antes das 9h.", earned: early },
    { id: "verificado", title: "Estive lá", body: "Dez carimbos confirmados no local.", earned: verified >= 10 },
    { id: "album", title: "Álbum", body: "Cinco carimbos com fotografia.", earned: photos >= 5 },
  ];
}

export function isComplete(c: CityPassport) {
  return c.total > 0 && Object.keys(c.stamps).length >= c.total;
}

/** Recompensa: cidade completa e pelo menos 60% das paragens com local confirmado. */
export function rewardFor(slug: string, c: CityPassport): string | null {
  if (!isComplete(c)) return null;
  const checkable = Object.keys(c.stamps).filter((t) => coordsFor(slug, t));
  if (!checkable.length) return null;
  const ok = checkable.filter((t) => c.stamps[t].verified).length;
  if (ok / checkable.length < 0.6) return null;
  let h = 0;
  for (const s of Object.values(c.stamps)) for (const ch of s.at) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return `POSTAL-${slug.slice(0, 4).toUpperCase()}-${h.toString(36).slice(-4).toUpperCase().padStart(4, "0")}`;
}

/* ---------- Conta: o passaporte só se guarda com sessão iniciada ---------- */
export const PASSPORT_AUTH_EVENT = "opostal:passaporte-auth";
let currentUser: string | null = null;
let started = false;
let pushTimer: ReturnType<typeof setTimeout> | undefined;

export const passportUser = () => currentUser;

function pushRemote(p: Passport) {
  if (!currentUser) return;
  const uid = currentUser;
  clearTimeout(pushTimer);
  pushTimer = setTimeout(() => {
    supabase.from("passports").upsert({ user_id: uid, data: p as never, updated_at: new Date().toISOString() }).then(({ error }) => { if (error) console.warn("passaporte: falhou guardar", error.message); });
  }, 400);
}

function merge(a: Passport, b: Passport): Passport {
  const out: Passport = JSON.parse(JSON.stringify(a));
  for (const [slug, c] of Object.entries(b)) {
    const t = out[slug] ?? { name: c.name, total: c.total, stamps: {} };
    for (const [title, s] of Object.entries(c.stamps)) {
      const prev = t.stamps[title];
      if (!prev || (s.verified && !prev.verified) || (s.photo && !prev.photo)) t.stamps[title] = { ...prev, ...s };
    }
    if (c.photos?.length) t.photos = Array.from(new Set([...(t.photos ?? []), ...c.photos])).slice(0, 6);
    out[slug] = t;
  }
  return out;
}

/** Só contam as atrações com carimbo; o total é o número delas. */
function normalize(p: Passport): Passport {
  for (const [slug, c] of Object.entries(p)) {
    const list = STAMP_STOPS[slug];
    if (!list) continue;
    const ok = new Set(list.map((s) => s.title));
    c.total = list.length;
    for (const k of Object.keys(c.stamps)) if (!ok.has(k)) delete c.stamps[k];
  }
  return p;
}

/** Todas as atrações confirmadas — o passaporte de quem escreveu os guias. */
export function fullPassport(): Passport {
  const out: Passport = {};
  const names: Record<string, string> = { barcelona: "Barcelona", budapeste: "Budapeste", florenca: "Florença", istambul: "Istambul", lisboa: "Lisboa", londres: "Londres", paris: "Paris", praga: "Praga", viena: "Viena" };
  for (const [slug, list] of Object.entries(STAMP_STOPS)) {
    const stamps: Record<string, Stamp> = {};
    for (const s of list) stamps[s.title] = { at: new Date().toISOString(), verified: true };
    out[slug] = { name: names[slug] ?? slug, total: list.length, stamps };
  }
  return out;
}

async function onSignedIn(uid: string) {
  currentUser = uid;
  window.dispatchEvent(new Event(PASSPORT_AUTH_EVENT));
  const { data } = await supabase.from("passports").select("data").eq("user_id", uid).maybeSingle();
  let p = merge((data?.data as Passport | undefined) ?? {}, readPassport());
  const { data: isAdmin } = await supabase.rpc("has_role", { _user_id: uid, _role: "admin" });
  if (isAdmin) p = merge(p, fullPassport());
  writePassport(normalize(p));
}

export function startPassportSync() {
  if (started || typeof window === "undefined") return;
  started = true;
  supabase.auth.getSession().then(({ data }) => {
    if (data.session) void onSignedIn(data.session.user.id);
    else window.dispatchEvent(new Event(PASSPORT_AUTH_EVENT));
  });
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN" && session && session.user.id !== currentUser) void onSignedIn(session.user.id);
    if (event === "SIGNED_OUT") {
      currentUser = null;
      window.localStorage.removeItem(KEY);
      window.dispatchEvent(new Event(PASSPORT_EVENT));
      window.dispatchEvent(new Event(PASSPORT_AUTH_EVENT));
    }
  });
}

/** Leva a pessoa a entrar e volta ao sítio onde estava. */
export function goSignIn() {
  try { window.sessionStorage.setItem("opostal:next", window.location.pathname); } catch { /* ignora */ }
  window.location.href = "/auth?passaporte=1";
}

/** Guarda (ou troca) a fotografia de um carimbo já feito. */
export function setStampPhoto(slug: string, title: string, photo: string | undefined) {
  const p = readPassport();
  const s = p[slug]?.stamps[title];
  if (!s) return false;
  if (photo) s.photo = photo;
  else delete s.photo;
  return writePassport(p);
}

/** Memórias da cidade — até 6 fotografias junto ao selo da cidade. */
export const CITY_PHOTOS_MAX = 6;
export function addCityPhoto(slug: string, photo: string) {
  const p = readPassport();
  const c = p[slug];
  if (!c) return false;
  c.photos = [...(c.photos ?? []), photo].slice(-CITY_PHOTOS_MAX);
  return writePassport(p);
}
export function removeCityPhoto(slug: string, i: number) {
  const p = readPassport();
  const c = p[slug];
  if (!c?.photos) return false;
  c.photos = c.photos.filter((_, k) => k !== i);
  return writePassport(p);
}

import { useEffect, useState } from "react";
import { PASSPORT_EVENT, readPassport, startPassportSync, type Passport } from "@/lib/passport";

/** Passaporte lido só depois de o ecrã carregar, sempre atualizado. */
export function usePassport(): Passport {
  const [p, setP] = useState<Passport>({});
  useEffect(() => {
    startPassportSync();
    const sync = () => setP(readPassport());
    sync();
    window.addEventListener(PASSPORT_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(PASSPORT_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return p;
}

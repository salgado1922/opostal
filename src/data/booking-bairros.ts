/**
 * Links Booking por bairro ("Ver alojamentos em ...").
 * Cola um deep link em `affiliateUrl`; enquanto estiver vazio usa-se `fallback` (o URL atual).
 */
export type BairroLink = { affiliateUrl: string; fallback: string };

export const BOOKING_BAIRROS: Record<string, Record<string, BairroLink>> = {
  praga: {
    "praga-stare-mesto": { affiliateUrl: "", fallback: "https://www.kqzyfj.com/click-101800647-15734352?sid=praga-stare-mesto&url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.pt-pt.html%3Fss%3DStar%25C3%25A9%2BM%25C4%259Bsto%252C%2BPraga%252C%2BRep%25C3%25BAblica%2BCheca%26lang%3Dpt-pt%26selected_currency%3DEUR%26group_adults%3D2%26no_rooms%3D1%26group_children%3D0" },
    "praga-mala-strana": { affiliateUrl: "", fallback: "https://www.kqzyfj.com/click-101800647-15734352?sid=praga-mala-strana&url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.pt-pt.html%3Fss%3DMal%25C3%25A1%2BStrana%252C%2BPraga%252C%2BRep%25C3%25BAblica%2BCheca%26lang%3Dpt-pt%26selected_currency%3DEUR%26group_adults%3D2%26no_rooms%3D1%26group_children%3D0" },
    "praga-nove-mesto": { affiliateUrl: "", fallback: "https://www.kqzyfj.com/click-101800647-15734352?sid=praga-nove-mesto&url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.pt-pt.html%3Fss%3DNov%25C3%25A9%2BM%25C4%259Bsto%252C%2BPraga%252C%2BRep%25C3%25BAblica%2BCheca%26lang%3Dpt-pt%26selected_currency%3DEUR%26group_adults%3D2%26no_rooms%3D1%26group_children%3D0" },
  },
  londres: {
    "londres-covent-garden-soho": { affiliateUrl: "", fallback: "https://www.kqzyfj.com/click-101800647-15734352?sid=londres-covent-garden-soho&url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.pt-pt.html%3Fss%3DSoho%252C%2BLondres%252C%2BReino%2BUnido%26lang%3Dpt-pt%26selected_currency%3DEUR%26group_adults%3D2%26no_rooms%3D1%26group_children%3D0" },
    "londres-south-bank": { affiliateUrl: "", fallback: "https://www.kqzyfj.com/click-101800647-15734352?sid=londres-south-bank&url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.pt-pt.html%3Fss%3DSouth%2BBank%252C%2BLondres%252C%2BReino%2BUnido%26lang%3Dpt-pt%26selected_currency%3DEUR%26group_adults%3D2%26no_rooms%3D1%26group_children%3D0" },
    "londres-kensington": { affiliateUrl: "", fallback: "https://www.kqzyfj.com/click-101800647-15734352?sid=londres-kensington&url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.pt-pt.html%3Fss%3DKensington%252C%2BLondres%252C%2BReino%2BUnido%26lang%3Dpt-pt%26selected_currency%3DEUR%26group_adults%3D2%26no_rooms%3D1%26group_children%3D0" },
  },
  istambul: {
    "istambul-sultanahmet": { affiliateUrl: "", fallback: "https://www.kqzyfj.com/click-101800647-15734352?sid=istambul-sultanahmet&url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.pt-pt.html%3Fss%3DSultanahmet%252C%2BIstambul%252C%2BTurquia%26lang%3Dpt-pt%26selected_currency%3DEUR%26group_adults%3D2%26no_rooms%3D1%26group_children%3D0" },
    "istambul-beyoglu-galata": { affiliateUrl: "", fallback: "https://www.kqzyfj.com/click-101800647-15734352?sid=istambul-beyoglu-galata&url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.pt-pt.html%3Fss%3DBeyoglu%252C%2BIstambul%252C%2BTurquia%26lang%3Dpt-pt%26selected_currency%3DEUR%26group_adults%3D2%26no_rooms%3D1%26group_children%3D0" },
    "istambul-kadikoy": { affiliateUrl: "", fallback: "https://www.kqzyfj.com/click-101800647-15734352?sid=istambul-kadikoy&url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.pt-pt.html%3Fss%3DKadikoy%252C%2BIstambul%252C%2BTurquia%26lang%3Dpt-pt%26selected_currency%3DEUR%26group_adults%3D2%26no_rooms%3D1%26group_children%3D0" },
  },
  florenca: {
    "florenca-centro-storico": { affiliateUrl: "", fallback: "https://www.kqzyfj.com/click-101800647-15734352?sid=florenca-centro-storico&url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.pt-pt.html%3Fss%3DCentro%2BStorico%252C%2BFloren%25C3%25A7a%252C%2BIt%25C3%25A1lia%26lang%3Dpt-pt%26selected_currency%3DEUR%26group_adults%3D2%26no_rooms%3D1%26group_children%3D0" },
    "florenca-santa-croce": { affiliateUrl: "", fallback: "https://www.kqzyfj.com/click-101800647-15734352?sid=florenca-santa-croce&url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.pt-pt.html%3Fss%3DSanta%2BCroce%252C%2BFloren%25C3%25A7a%252C%2BIt%25C3%25A1lia%26lang%3Dpt-pt%26selected_currency%3DEUR%26group_adults%3D2%26no_rooms%3D1%26group_children%3D0" },
    "florenca-oltrarno": { affiliateUrl: "", fallback: "https://www.kqzyfj.com/click-101800647-15734352?sid=florenca-oltrarno&url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.pt-pt.html%3Fss%3DOltrarno%252C%2BFloren%25C3%25A7a%252C%2BIt%25C3%25A1lia%26lang%3Dpt-pt%26selected_currency%3DEUR%26group_adults%3D2%26no_rooms%3D1%26group_children%3D0" },
  },
  barcelona: {
    "barcelona-eixample": { affiliateUrl: "", fallback: "https://www.kqzyfj.com/click-101800647-15734352?url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.pt-pt.html%3Fss%3DEixample%252C%2BBarcelona%252C%2BEspanha%26lang%3Dpt-pt%26selected_currency%3DEUR%26group_adults%3D2%26no_rooms%3D1%26group_children%3D0&sid=barcelona-eixample" },
    "barcelona-barri-gotic": { affiliateUrl: "", fallback: "https://www.kqzyfj.com/click-101800647-15734352?url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.pt-pt.html%3Fss%3DBarri%2BG%25C3%25B2tic%252C%2BBarcelona%252C%2BEspanha%26lang%3Dpt-pt%26selected_currency%3DEUR%26group_adults%3D2%26no_rooms%3D1%26group_children%3D0&sid=barcelona-barri-gotic" },
    "barcelona-barceloneta": { affiliateUrl: "", fallback: "https://www.kqzyfj.com/click-101800647-15734352?url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.pt-pt.html%3Fss%3DBarceloneta%252C%2BBarcelona%252C%2BEspanha%26lang%3Dpt-pt%26selected_currency%3DEUR%26group_adults%3D2%26no_rooms%3D1%26group_children%3D0&sid=barcelona-barceloneta" },
  },
  viena: {
    "viena-innere-stadt": { affiliateUrl: "", fallback: "https://www.kqzyfj.com/click-101800647-15734352?url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.pt-pt.html%3Fss%3DInnere%2BStadt%252C%2BViena%252C%2B%25C3%2581ustria%26lang%3Dpt-pt%26selected_currency%3DEUR%26group_adults%3D2%26no_rooms%3D1%26group_children%3D0&sid=viena-innere-stadt" },
    "viena-mariahilf": { affiliateUrl: "", fallback: "https://www.kqzyfj.com/click-101800647-15734352?url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.pt-pt.html%3Fss%3DMariahilf%252C%2BViena%252C%2B%25C3%2581ustria%26lang%3Dpt-pt%26selected_currency%3DEUR%26group_adults%3D2%26no_rooms%3D1%26group_children%3D0&sid=viena-mariahilf" },
    "viena-landstrasse": { affiliateUrl: "", fallback: "https://www.kqzyfj.com/click-101800647-15734352?url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.pt-pt.html%3Fss%3DLandstra%25C3%259Fe%252C%2BViena%252C%2B%25C3%2581ustria%26lang%3Dpt-pt%26selected_currency%3DEUR%26group_adults%3D2%26no_rooms%3D1%26group_children%3D0&sid=viena-landstrasse" },
  },
  lisboa: {
    "lisboa-baixa": { affiliateUrl: "", fallback: "https://www.kqzyfj.com/click-101800647-15734352?url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.pt-pt.html%3Fss%3DBaixa%252C%2BLisboa%252C%2BPortugal%26lang%3Dpt-pt%26selected_currency%3DEUR%26group_adults%3D2%26no_rooms%3D1%26group_children%3D0&sid=lisboa-baixa" },
    "lisboa-alfama": { affiliateUrl: "", fallback: "https://www.kqzyfj.com/click-101800647-15734352?url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.pt-pt.html%3Fss%3DAlfama%252C%2BLisboa%252C%2BPortugal%26lang%3Dpt-pt%26selected_currency%3DEUR%26group_adults%3D2%26no_rooms%3D1%26group_children%3D0&sid=lisboa-alfama" },
    "lisboa-bairro-alto": { affiliateUrl: "", fallback: "https://www.kqzyfj.com/click-101800647-15734352?url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.pt-pt.html%3Fss%3DBairro%2BAlto%252C%2BLisboa%252C%2BPortugal%26lang%3Dpt-pt%26selected_currency%3DEUR%26group_adults%3D2%26no_rooms%3D1%26group_children%3D0&sid=lisboa-bairro-alto" },
  },
  budapeste: {
    "budapeste-erzsebetvaros": { affiliateUrl: "", fallback: "https://www.kqzyfj.com/click-101800647-15734352?url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.pt-pt.html%3Fss%3DErzs%25C3%25A9betv%25C3%25A1ros%252C%2BBudapeste%252C%2BHungria%26lang%3Dpt-pt%26selected_currency%3DEUR%26group_adults%3D2%26no_rooms%3D1%26group_children%3D0&sid=budapeste-erzsebetvaros" },
    "budapeste-belvaros": { affiliateUrl: "", fallback: "https://www.kqzyfj.com/click-101800647-15734352?url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.pt-pt.html%3Fss%3DBelv%25C3%25A1ros%252C%2BBudapeste%252C%2BHungria%26lang%3Dpt-pt%26selected_currency%3DEUR%26group_adults%3D2%26no_rooms%3D1%26group_children%3D0&sid=budapeste-belvaros" },
    "budapeste-varnegyed": { affiliateUrl: "", fallback: "https://www.kqzyfj.com/click-101800647-15734352?url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.pt-pt.html%3Fss%3DV%25C3%25A1rnegyed%252C%2BBudapeste%252C%2BHungria%26lang%3Dpt-pt%26selected_currency%3DEUR%26group_adults%3D2%26no_rooms%3D1%26group_children%3D0&sid=budapeste-varnegyed" },
  },
};

export function bookingLink(id: string): string {
  for (const city of Object.values(BOOKING_BAIRROS)) {
    const b = city[id];
    if (b) return b.affiliateUrl.trim() || b.fallback;
  }
  return "";
}

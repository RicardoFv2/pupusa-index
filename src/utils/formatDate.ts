import { Language } from "./translations";

const localeFor = (lang: Language) => (lang === "es" ? "es-SV" : "en-US");

/** Long, human date: "11 de julio de 2026" / "July 11, 2026". */
export function formatDate(iso: string, lang: Language): string {
  return new Intl.DateTimeFormat(localeFor(lang), {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

/** Compact axis/tick label: "11 jul" / "Jul 11". */
export function formatShortDate(iso: string, lang: Language): string {
  return new Intl.DateTimeFormat(localeFor(lang), {
    day: "numeric",
    month: "short",
  }).format(new Date(iso));
}

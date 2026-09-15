import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Printer } from "lucide-react";

export type PrintStop = {
  time: string;
  title: string;
  desc: string;
  tip?: string;
  hours?: string;
  hoursNote?: string;
  walkTo?: string;
};

export type PrintDay = {
  key: string;
  label: string;
  date: string;
  title: string;
  vibe: string;
  walkTotal?: string;
  howToGet?: string;
  highlightTip?: string;
  stops: PrintStop[];
};

type Props = {
  city: string;
  subtitle?: string;
  days: PrintDay[];
};

/**
 * Discreet "save as PDF" action for a city guide.
 * Renders a print-only sheet (portal into <body>) with the full itinerary in
 * clean black-on-white, so the browser's print dialog can save or print it.
 */
export function PrintItineraryButton({ city, subtitle, days }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <div className="no-print px-6 pb-10 text-center md:px-12">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-black/20 px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-gold transition-colors hover:border-gold hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
          aria-label={`Guardar o roteiro de ${city} em PDF`}
        >
          <Printer className="h-4 w-4" aria-hidden />
          Guardar roteiro em PDF
        </button>
        <p className="mt-3 text-xs text-muted-foreground">
          Para imprimir ou levar offline — escolhe “Guardar como PDF” na janela de
          impressão.
        </p>
      </div>

      {mounted &&
        createPortal(
          <div className="print-sheet" aria-hidden>
            <header className="print-sheet-head">
              <p className="print-sheet-brand">O Postal · opostal.pt</p>
              <h1>Roteiro de {city}</h1>
              {subtitle && <p className="print-sheet-sub">{subtitle}</p>}
            </header>

            {days.map((day) => (
              <section className="print-day" key={day.key}>
                <h2>
                  {day.label} — {day.title}
                </h2>
                <p className="print-day-meta">{day.date}</p>
                {day.vibe && <p className="print-day-vibe">{day.vibe}</p>}
                {day.howToGet && <p className="print-day-meta">{day.howToGet}</p>}
                {day.walkTotal && <p className="print-day-meta">{day.walkTotal}</p>}
                {day.highlightTip && (
                  <p className="print-day-meta">{day.highlightTip}</p>
                )}
                <ol className="print-stops">
                  {day.stops.map((stop, i) => (
                    <li key={`${day.key}-${i}`}>
                      <p className="print-stop-title">
                        <strong>{stop.time}</strong> · {stop.title}
                      </p>
                      <p>{stop.desc}</p>
                      {stop.hours && (
                        <p className="print-stop-note">
                          Horário: {stop.hours}
                          {stop.hoursNote ? ` — ${stop.hoursNote}` : ""}
                        </p>
                      )}
                      {stop.tip && <p className="print-stop-note">Dica: {stop.tip}</p>}
                      {stop.walkTo && (
                        <p className="print-stop-note">A pé até à próxima: {stop.walkTo}</p>
                      )}
                    </li>
                  ))}
                </ol>
              </section>
            ))}

            <footer className="print-sheet-foot">
              Guia gratuito de O Postal — opostal.pt. Horários e preços podem mudar;
              confirma antes de ir.
            </footer>
          </div>,
          document.body,
        )}
    </>
  );
}

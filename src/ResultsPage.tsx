import ResultsTable from './ResultsTable';
import { recruitmentResults } from './recruitmentResults';

const resultSections = [
  { title: 'Mechanical', rows: recruitmentResults.mechanical },
  { title: 'Electrical', rows: recruitmentResults.electrical },
  { title: 'Management', rows: recruitmentResults.management },
  { title: 'Media', rows: recruitmentResults.media },
];

export default function ResultsPage() {
  return (
    <main className="min-h-screen w-full bg-dark py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="text-center text-4xl font-bold text-gold">
          Recruitment Results 2026-27
        </h1>
        <div className="mx-auto mt-2.5 mb-3 h-0.5 w-11 bg-gold" aria-hidden="true" />
        <p className="mb-5 text-center text-base leading-relaxed text-white">
          Congratulations! Welcome to Bullz Racing.
        </p>
        <nav aria-label="Jump to recruitment results" className="mb-8">
          <div className="scrollbar-hide flex w-full flex-nowrap justify-start gap-2 overflow-x-auto md:justify-center">
            {resultSections.map(({ title }) => (
              <a
                key={title}
                href={`#${title.toLowerCase()}`}
                className="inline-flex min-h-8 flex-shrink-0 items-center justify-center rounded-md border-[0.5px] border-[#C0C0C0] px-3 py-1 text-[10px] font-medium leading-none text-silver md:text-[11px]"
              >
                {title}
              </a>
            ))}
          </div>
        </nav>
        {resultSections.map(({ title, rows }) => (
          <section
            key={title}
            id={title.toLowerCase()}
            className="mb-6 scroll-mt-24 last:mb-0"
          >
            <div className="mb-3 flex items-baseline justify-between gap-4">
              <h2 className="text-[15px] font-semibold text-gold md:text-[17px]">
                {title}
              </h2>
              {rows.length > 0 && (
                <p className="text-[11px] text-silver">
                  {rows.length} selected
                </p>
              )}
            </div>
            <ResultsTable rows={rows} />
          </section>
        ))}
      </div>
    </main>
  );
}

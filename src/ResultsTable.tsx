import type { RecruitmentResult } from './recruitmentResults';
import './ResultsTable.css';

export default function ResultsTable({ rows }: { rows: RecruitmentResult[] }) {
  const displayRows = rows.length > 0
    ? rows
    : [{ name: '—', department: '—' }];

  return (
    <div className="w-full overflow-hidden rounded-lg border-[0.5px] border-[#C0C0C0] md:rounded-[10px]">
      <table className="w-full table-fixed border-collapse text-left">
        <thead>
          <tr>
            <th
              scope="col"
              className="w-1/2 border-b-[0.5px] border-[#C0C0C0] px-[10px] py-[9px] text-[10px] font-bold uppercase tracking-[0.08em] text-silver md:px-[14px] md:py-[10px] md:text-[11px]"
            >
              Name
            </th>
            <th
              scope="col"
              className="w-1/2 border-b-[0.5px] border-l-[0.5px] border-[#C0C0C0] px-[10px] py-[9px] text-[10px] font-bold uppercase tracking-[0.08em] text-silver md:px-[14px] md:py-[10px] md:text-[11px]"
            >
              Department
            </th>
          </tr>
        </thead>
        <tbody>
          {displayRows.map((row, index) => {
            const borderBottom = index < displayRows.length - 1 ? 'border-b-[0.5px]' : '';

            return (
              <tr key={`${row.name}-${row.department}-${index}`} className="results-table-row">
                <td className={`w-1/2 break-words ${borderBottom} border-[#C0C0C0] px-[10px] py-[9px] text-[11px] font-normal text-silver md:px-[14px] md:py-[10px] md:text-xs`}>
                  {row.name}
                </td>
                <td className={`w-1/2 break-words ${borderBottom} border-l-[0.5px] border-[#C0C0C0] px-[10px] py-[9px] text-[11px] font-normal text-silver md:px-[14px] md:py-[10px] md:text-xs`}>
                  {row.department}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

import { kalyanNightTableData, kalyanTableData } from "@/utils/constants";
import React from "react";

const FixAnkTable = ({
  title,
  data,
}: {
  title: React.ReactNode;
  data: any[];
}) => (
  <div className="fix-ank-container">
    <div className="fix-ank-table-header">{title}</div>

    <table className="fix-ank-table">
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            <td className="day-cell">{row.day}</td>
            {row.blocks.map((block: any, j: number) => (
              <React.Fragment key={j}>
                <td className="ank-cell">{block.ank}</td>
                <td className="patti-cell">
                  <span className="patti-top">{block.top}</span>
                  <span className="patti-bottom">{block.bottom}</span>
                </td>
              </React.Fragment>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function kalyan() {
  return (
    <div className="fix-ank-wrapper">
      <FixAnkTable title="कल्याण" data={kalyanTableData} />
      <FixAnkTable
        title={<>KALYAN NIGHT / MAIN BAZAR</>}
        data={kalyanNightTableData}
      />
    </div>
  );
}

import { bombayBazarData } from "@/utils/constants";

export default function BombayBazar() {
  const numbers = [8, 9, 0, 1, 2, 3, 4, 5, 6, 7]; // Reordered for correct color alignment
  const currentResult = "467-7";

  return (
    <div className="bombay-bazar-section common-border">
      <div className="title-with-chart starline-header">
        MAIN BOMBAY 36 BAZAR
      </div>

      <div className="wheel-wrapper">
        <div className="wheel">
          <div className="wheel-inner">
            {numbers.map((num, i) => (
              <div
                key={i}
                className="wheel-num"
                style={{
                  transform: `rotate(${i * 36 + 18}deg)`,
                }}
              >
                {num}
              </div>
            ))}
          </div>
        </div>
        <div className="wheel-center">
          <div className="center-result">{currentResult}</div>
        </div>
      </div>

      <table className="starline-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Result</th>
            <th>Time</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {bombayBazarData.map((row, i) => (
            <tr key={i}>
              <td>{row.time1}</td>
              <td style={{ color: "#8c0000" }}>{row.result1}</td>
              <td>{row.time2}</td>
              <td style={{ color: "#8c0000" }}>{row.result2}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

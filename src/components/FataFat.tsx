import { FataFatData } from "@/utils/constants";

export default function FataFat() {
  return (
    <div className="fatafat-section">
      <div className="fatafat-header">
        <h2>
          MAIN FATA-FAT
          <br />
          15 MINUTES
        </h2>
        <div className="last-draw">
          Last Draw (9:00 PM)
          <br />
          180-9
        </div>
      </div>
      <table className="starline-table fatafat-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Result</th>
            <th>Time</th>
            <th>Result</th>
            <th>Time</th>
            <th>Result</th>
            <th>Time</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {FataFatData.map((r, i) => (
            <tr key={i}>
              <td>{r.t1}</td>
              <td style={{ color: "#8c0000" }}>{r.r1}</td>
              <td>{r.t2}</td>
              <td style={{ color: "#8c0000" }}>{r.r2}</td>
              <td>{r.t3}</td>
              <td style={{ color: "#8c0000" }}>{r.r3}</td>
              <td>{r.t4}</td>
              <td style={{ color: "#8c0000" }}>{r.r4}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

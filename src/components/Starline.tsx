import { mainStarlineData, mumbaiStarlineData } from "@/utils/constants";

export default function Starline() {
  return (
    <div className="starline-container">
      <div className="support-header common-border">
        Email for any inquiries Or Support: <span>support@Satta8055.net</span>
      </div>

      <div className="starline-section">
        <div className="starline-header">MAIN STARLINE</div>
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
            {mainStarlineData.map((row, i) => (
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

      <div className="starline-section">
        <div className="starline-header pink">
          Mumbai Rajshree Star Line Result
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
            {mumbaiStarlineData.map((row, i) => (
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
    </div>
  );
}

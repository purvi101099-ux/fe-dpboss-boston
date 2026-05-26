import { jodiData, lineData, netWeekList, pattiData } from "@/utils/constants";

export default function WeeklyCharts() {
  return (
    <div className="weekly-charts-container">
      {/* Weekly Patti Chart */}
      <div className="weekly-section">
        <div className="weekly-header-green">
          Satta8055Net Weekly Patti Or Penal Chart From 23-02-2026 To 01-03-2026
          For Kalyan, Milan, Kalyan Night, Rajdhani, Time, Main Bazar, Mumbai
          Royal Night, Kalyan Morning
        </div>
        <div className="weekly-data-box">
          <div className="weekly-data-text">{pattiData}</div>
        </div>
      </div>

      {/* Weekly Line Chart */}
      <div className="weekly-section">
        <div className="weekly-header-green">
          Satta8055Net Weekly Line Open Or Close From 23-02-2026 To 01-03-2026 For
          Kalyan, Milan, Kalyan Night, Rajdhani, Time, Main Bazar, Mumbai Royal
          Night, Kalyan Morning
        </div>
        <div className="weekly-data-box">
          <div className="weekly-data-text">{lineData}</div>
        </div>
      </div>

      {/* Weekly Jodi Chart */}
      <div className="weekly-section">
        <div className="weekly-header-green">
          Satta8055Net Weekly Jodi Chart From 23-02-2026 To 01-03-2026 For Kalyan
          Milan Kalyan Night, Rajdhani Time, Main Bazar, Mumbai Royal Night
          Market, Kalyan Morning
        </div>
        <div className="weekly-data-box">
          <div className="weekly-data-text">{netWeekList}</div>
        </div>
      </div>

      {/* FREE GAME ZONE */}
      <div className="weekly-section">
        <div className="weekly-header-pink">FREE GAME ZONE OPEN-CLOSE</div>
        <div className="fix-ank-box">
          <div className="fix-ank-date">✓DATE:↹ : 25/02/2026 ↹</div>
          <div className="fix-ank-text">
            FREE GUESSING DAILY
            <br />
            OPEN TO CLOSE FIX ANK
          </div>
        </div>
      </div>
    </div>
  );
}

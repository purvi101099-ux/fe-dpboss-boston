import JodiRecordTable from "@/components/JodiRecordTable";

const JodiChartRecord = () => {
  const keywords =
    "Dpboss SRIDEVI MORNING jodi chart, SRIDEVI MORNING jodi chart, old SRIDEVI MORNING jodi chart, dpboss SRIDEVI MORNING chart, SRIDEVI MORNING jodi record, SRIDEVI MORNING jodi record, SRIDEVI MORNING jodi chart 2015, SRIDEVI MORNING jodi chart 2012, SRIDEVI MORNING jodi chart 2012 to 2023, SRIDEVI MORNING final ank, SRIDEVI MORNING jodi, chart.co, SRIDEVI MORNING jodi chart matka, SRIDEVI MORNING jodi chart book, SRIDEVI MORNING matka chart, matka jodi chart SRIDEVI MORNING, matka SRIDEVI MORNING chart, satta SRIDEVI MORNING chart jodi, SRIDEVI MORNING state chart, SRIDEVI MORNING chart result, डीपी बॉस, सट्टा चार्ट, सट्टा मटका जोड़ी चार्ट, सट्टा मटका जोड़ी चार्ट, श्रीदेवी मॉर्निंग मटका जोड़ी चार्ट, सट्टा मटका श्रीदेवी मॉर्निंग चार्ट जोड़ी, श्रीदेवी मॉर्निंग सट्टा चार्ट, श्रीदेवी मॉर्निंग जोड़ी चार्ट";

  return (
    <div className="container">
      {/* Reusing existing Logo box from Header styles */}
      <div
        className="header-top common-border"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <h1 className="logo">
          Dp<span>BOSS.BOSTON</span>
        </h1>
      </div>

      <div
        className="section-header"
        style={{ textTransform: "uppercase", fontSize: "1rem", padding: "4px" }}
      >
        SRIDEVI MORNING JODI CHART
      </div>

      <div className="keywords-container" style={{ margin: "2px 0" }}>
        <h2
          className="info-title"
          style={{ fontSize: "0.75rem", color: "#000080", marginBottom: "2px" }}
        >
          SRIDEVI MORNING JODI RESULT CHART RECORDS
        </h2>
        <p
          className="keywords-list"
          style={{
            fontSize: "0.55rem",
            textAlign: "center",
            color: "#000",
            lineHeight: "1.2",
          }}
        >
          {keywords}
        </p>
      </div>

      <div
        className="result-item common-border"
        style={{ padding: "8px", border: "1px solid #000" }}
      >
        <h3
          className="live-game-name"
          style={{ fontSize: "1rem", marginBottom: "4px" }}
        >
          SRIDEVI MORNING
        </h3>
        <div
          className="live-game-value"
          style={{ fontSize: "1.3rem", marginBottom: "6px" }}
        >
          110-25-140
        </div>
        <button
          className="footer-small-btn"
          style={{
            fontStyle: "normal",
            padding: "3px 15px",
            fontSize: "0.7rem",
          }}
        >
          Refresh Result
        </button>
      </div>

      <JodiRecordTable />
    </div>
  );
};

export default JodiChartRecord;

import TopHeader from "@/components/common/TopHeader";
import JodiRecordTable from "@/components/JodiRecordTable";

const JodiChartRecord = () => {
  const keywords = `
    Dpboss SRIDEVI MORNING jodi chart, SRIDEVI MORNING jodi chart,
    old SRIDEVI MORNING jodi chart, dpboss SRIDEVI MORNING chart,
    SRIDEVI MORNING jodi record, SRIDEVI MORNING jodi chart 2015,
    SRIDEVI MORNING jodi chart 2012 to 2023, SRIDEVI MORNING final ank,
    SRIDEVI MORNING matka chart, satta SRIDEVI MORNING chart jodi,
    डीपी बॉस, सट्टा चार्ट, श्रीदेवी मॉर्निंग जोड़ी चार्ट
  `;

  return (
    <div className="container">
      <TopHeader />

      <div className="section-header">SRIDEVI MORNING JODI CHART</div>

      <div className="keywords-container">
        <h2 className="info-title">
          SRIDEVI MORNING JODI RESULT CHART RECORDS
        </h2>
        <p className="keywords-list">{keywords}</p>
      </div>

      <div className="result-item common-border">
        <h3 className="live-game-name">SRIDEVI MORNING</h3>
        <div className="live-game-value">110-25-140</div>

        <button className="footer-small-btn">Refresh Result</button>
      </div>

      <JodiRecordTable />
    </div>
  );
};

export default JodiChartRecord;

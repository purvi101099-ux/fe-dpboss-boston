import React from "react";

interface DayData {
  left: string[];
  jodi: string;
  right: string[];
  isRed?: boolean;
}

interface PanelRecordRow {
  date: string;
  mon: DayData;
  tue: DayData;
  wed: DayData;
  thu: DayData;
  fri: DayData;
  sat: DayData;
  sun?: DayData;
}

interface PanelRecordTableProps {
  data?: PanelRecordRow[];
  loading?: boolean;
  gameName?: string;
  onRefresh?: () => void;
}

const RowCell = ({ data }: { data: DayData | undefined }) => {
  if (!data || (data.jodi === "**" && data.left.every((d) => d === "*"))) {
    return (
      <td className="panel-cell">
        <div style={{ textAlign: "center", fontWeight: "900" }}>-</div>
      </td>
    );
  }
  return (
    <td className="panel-cell">
      <div className="panel-inner">
        <div className="panel-digits side">
          {data.left.map((d, i) => (
            <div key={i}>{d}</div>
          ))}
        </div>
        <div
          className="panel-jodi"
          style={{ color: data.isRed ? "red" : "black" }}
        >
          {data.jodi}
        </div>
        <div className="panel-digits side">
          {data.right.map((d, i) => (
            <div key={i}>{d}</div>
          ))}
        </div>
      </div>
    </td>
  );
};

export default function PanelRecordTable({
  data,
  loading,
  gameName,
  onRefresh,
}: PanelRecordTableProps) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToBottom = () =>
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

  if (loading) {
    return (
      <div
        className="panel-record-container"
        style={{ textAlign: "center", padding: "20px" }}
      >
        <div className="loading-spinner">Loading Panel Chart...</div>
      </div>
    );
  }

  return (
    <div className="panel-record-container">
      <div
        style={{
          textAlign: "center",
          marginBottom: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          alignItems: "center",
        }}
      >
        {onRefresh && (
          <button
            className="footer-small-btn"
            onClick={onRefresh}
            style={{ width: "fit-content", cursor: "pointer" }}
          >
            Refresh Result
          </button>
        )}
        <button onClick={scrollToBottom} className="go-bottom-btn">
          Go to Bottom
        </button>
      </div>

      <div className="jodi-table-main-wrapper">
        <div
          className="jodi-table-header"
          style={{
            textTransform: "uppercase",
            borderRadius: "8px 8px 0 0",
            border: "1px solid #000",
            borderBottom: "none",
          }}
        >
          {gameName || "GAME"} PANEL CHART
        </div>
        <div
          className="jodi-table-wrapper"
          style={{ borderRadius: "0 0 8px 8px" }}
        >
          <table className="panel-record-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
                <th>Sun</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((row, i) => (
                <tr key={i}>
                  <td className="date-cell">
                    {row.date.split(" to ").map((part, index) => (
                      <div key={index}>
                        {index === 1 && <div className="date-to">To</div>}
                        {part}
                      </div>
                    ))}
                  </td>
                  <RowCell data={row.mon} />
                  <RowCell data={row.tue} />
                  <RowCell data={row.wed} />
                  <RowCell data={row.thu} />
                  <RowCell data={row.fri} />
                  <RowCell data={row.sat} />
                  <RowCell data={row.sun} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div
        className="jodi-footer-info"
        style={{ marginTop: "15px", padding: "0 10px" }}
      >
        {/* <p className="jodi-info-text">
          Welcome to Satta8055 Services, your trusted destination for comprehensive
          and accurate {gameName || "this game"} Panel Chart Records. We take
          proud in offering a reliable platform that caters specifically to the
          needs of matka enthusiasts, providing in-depth insights into{" "}
          {gameName || "this"} games to enhance your gaming experience.
        </p>
        <h3 className="jodi-info-title" style={{ color: "red" }}>
          {gameName || "This Game"} Panel Chart Records Online
        </h3>
        <p className="jodi-info-text">
          Dive into the world of {gameName || "this"} matka with our carefully
          crafted {gameName || "this game"} Panel Chart Records. Tailored to
          meet the demands of both seasoned players and newcomers, our charts
          provide a detailed historical overview of gaming patterns and trends.
          Whether you're strategizing your next move or seeking to understand
          the dynamics of {gameName || "this"} matka, Satta8055 Services is your
          go-to source for accurate and up-to-date information.
        </p>

        <div className="jodi-faq-section">
          <h3 className="jodi-faq-title" style={{ fontSize: "0.8rem" }}>
            Frequently Asked Questions (FAQ) for {gameName || "this game"} Panel
            Chart Records:
          </h3>
          <div className="faq-item">
            <h4 className="faq-q">
              Q1: How often are the {gameName || "this game"} Panel Chart
              Records updated on Satta8055 Services?
            </h4>
            <p className="faq-a">
              We understand the importance of real-time information in the matka
              world. At Satta8055 Services, we are committed to regular updates of
              our {gameName || "this game"} Panel Chart Records. Our dedicated
              team ensures that you have access to the latest gaming trends and
              patterns, empowering you with timely information to make informed
              decisions.
            </p>
          </div>
          <div className="faq-item">
            <h4 className="faq-q">
              Q2: Is there a subscription fee for accessing{" "}
              {gameName || "this game"} Panel Chart Records on Satta8055 Services?
            </h4>
            <p className="faq-a">
              No, accessing {gameName || "this game"} Panel Chart Records on
              Satta8055 Services is completely free of charge. We believe in making
              valuable information accessible to all enthusiasts without any
              subscription fees. Simply visit our user-friendly website,
              navigate to the section, and explore the latest charts at your
              convenience. Satta8055 Services is dedicated to democratizing
              information and providing equal opportunities for all{" "}
              {gameName || "this"} matka enthusiasts.
            </p>
          </div>
        </div> */}

        <div style={{ textAlign: "center", margin: "15px 0" }}>
          <button onClick={scrollToTop} className="go-bottom-btn">
            Go to Top
          </button>
        </div>

        <div
          className="jodi-custom-footer common-border"
          style={{ padding: "10px", marginTop: "10px" }}
        >
          <h2 className="jodi-footer-logo" style={{ fontSize: "1.8rem" }}>
            Satta8055 Services
          </h2>
          <p className="jodi-footer-msg" style={{ fontSize: "0.9rem" }}>
            All Rights Reserved®
          </p>
          {/* <p className="jodi-footer-msg" style={{ fontSize: "0.8rem" }}>
            (1998-2024)
          </p> */}
          <p className="jodi-footer-contact" style={{ fontSize: "1rem" }}>
            Contact (Astrologer-<span>Satta8055</span>)
          </p>
        </div>
      </div>
    </div>
  );
}

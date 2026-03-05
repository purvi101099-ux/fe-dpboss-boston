import React from "react";

interface DayData {
  left: string[];
  jodi: string;
  right: string[];
  isRed?: boolean;
}

interface JodiRecordRow {
  date: string;
  mon: DayData;
  tue: DayData;
  wed: DayData;
  thu: DayData;
  fri: DayData;
  sat: DayData;
  sun?: DayData;
}

interface JodiRecordTableProps {
  data?: JodiRecordRow[];
  loading?: boolean;
  gameName?: string;
}

const headerDays = ["Mo", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function JodiRecordTable({
  data,
  loading,
  gameName,
}: JodiRecordTableProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const renderJodi = (dayData: DayData | undefined) => {
    if (!dayData) return "-";
    const jodi = dayData.jodi;
    const isRed = dayData.isRed;

    return (
      <span style={{ color: isRed ? "red" : "black", fontWeight: "900" }}>
        {jodi}
      </span>
    );
  };

  if (loading) {
    return (
      <div
        className="jodi-record-container"
        style={{ textAlign: "center", padding: "20px" }}
      >
        <div className="loading-spinner">Loading Chart Data...</div>
      </div>
    );
  }

  return (
    <div className="jodi-record-container ">
      <div style={{ textAlign: "center", marginBottom: "5px" }}>
        <button onClick={scrollToBottom} className="go-bottom-btn">
          Go to Bottom
        </button>
      </div>

      <div
        className="jodi-table-header"
        style={{
          borderRadius: "8px 8px 0 0",
          border: "1px solid #000",
          borderBottom: "none",
        }}
      >
        {(gameName || "SRIDEVI MORNING").toUpperCase()} MATKA JODI RECORD 2020 -
        2026
      </div>
      <div
        className="jodi-table-wrapper"
        style={{ borderRadius: "0 0 8px 8px" }}
      >
        <table className="jodi-record-table">
          <thead>
            <tr>
              {headerDays.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>{renderJodi(row.mon)}</td>
                <td>{renderJodi(row.tue)}</td>
                <td>{renderJodi(row.wed)}</td>
                <td>{renderJodi(row.thu)}</td>
                <td>{renderJodi(row.fri)}</td>
                <td>{renderJodi(row.sat)}</td>
                <td>{renderJodi(row.sun)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Info Sections */}
      <div className="jodi-footer-info" style={{ marginTop: "10px" }}>
        <p className="jodi-info-text">
          Are you passionate about the game of luck and intrigued by the world
          of matka gambling? If so, exploring {gameName || "this game"} Jodi
          Chart Records can add an exciting dimension to your matka journey.
          Dpboss Services offers a comprehensive platform to access and analyze{" "}
          {gameName || "this game"} Jodi Chart Records, providing enthusiasts
          with valuable insights and historical data.
        </p>

        <h3 className="jodi-info-title" style={{ margin: "10px 0 5px" }}>
          {gameName || "This Game"} Jodi Chart Records Online
        </h3>
        <p className="jodi-info-text">
          Embark on your matka journey with confidence, armed with the insights
          derived from {gameName || "this game"} Jodi Chart Records available
          through Dpboss Services. Explore the rich history of matka outcomes
          and elevate your gaming strategies to new heights.
        </p>

        <div className="jodi-faq-section" style={{ margin: "10px 0" }}>
          <h3 className="jodi-faq-title">Frequently Asked Questions (FAQs):</h3>
          <div className="faq-item" style={{ marginBottom: "8px" }}>
            <h4 className="faq-q">
              Q1. What are {gameName || "these"} Jodi Chart Records?
            </h4>
            <p className="faq-a">
              {gameName || "These"} Jodi Chart Records are graphical
              representations of the outcomes in the popular matka game,
              displaying the combinations of numbers that have appeared over
              time. These charts are invaluable tools for matka players, helping
              them identify patterns, trends, and potential winning strategies.
              Dpboss Services ensures easy access to {gameName || "these"} Jodi
              Chart Records, allowing users to make informed decisions and
              enhance their matka gaming experience.
            </p>
          </div>
          <div className="faq-item" style={{ marginBottom: "8px" }}>
            <h4 className="faq-q">
              Q2. How does Dpboss Services enhance your matka experience with{" "}
              {gameName || "these"} Jodi Chart Records?
            </h4>
            <p className="faq-a">
              Dpboss Services takes pride in offering a user-friendly interface
              that simplifies the navigation and retrieval of{" "}
              {gameName || "these"} Jodi Chart Records. The platform is designed
              to cater to both novice and seasoned players, providing a reliable
              source of historical data for analysis. By understanding past
              patterns and outcomes, matka enthusiasts can make more informed
              guesses, improving their chances of success. Dpboss Services
              strives to create a seamless experience, ensuring that users have
              all the tools they need to navigate the intricate world of matka
              gambling.
            </p>
          </div>
        </div>

        <div style={{ textAlign: "center", margin: "10px 0" }}>
          <button onClick={scrollToTop} className="go-bottom-btn">
            Go to Top
          </button>
        </div>

        <div
          className="jodi-custom-footer common-border"
          style={{ padding: "10px", marginTop: "10px" }}
        >
          <h2 className="jodi-footer-logo" style={{ fontSize: "1.8rem" }}>
            DPBOSS.BOSTON
          </h2>
          <p className="jodi-footer-msg" style={{ fontSize: "0.9rem" }}>
            All Rights Reserved®
          </p>
          <p className="jodi-footer-msg" style={{ fontSize: "0.8rem" }}>
            (1998-2024)
          </p>
          <p className="jodi-footer-contact" style={{ fontSize: "1rem" }}>
            Contact (Astrologer-<span>Dpboss</span>)
          </p>
        </div>
      </div>

      <div style={{ marginTop: "10px" }}>
        <a
          href="#"
          className="footer-small-btn"
          style={{ fontSize: "0.6rem", padding: "2px 8px" }}
        >
          Matka Play
        </a>
      </div>
    </div>
  );
}

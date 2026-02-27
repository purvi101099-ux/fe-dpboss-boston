import { days, jodiData, redIndices } from "@/utils/constants";

// Helper to determine if a number should be red (mock logic based on image)
const isRed = (colIndex: number, rowIndex: number) => {
  return redIndices.some(([c, r]) => c === colIndex && r === rowIndex);
};

export default function JodiRecordTable() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <div className="jodi-record-container ">
      <div style={{ textAlign: "center", marginBottom: "5px" }}>
        <button onClick={scrollToBottom} className="go-bottom-btn">
          Go to Bottom
        </button>
      </div>

      <div className="jodi-table-wrapper" style={{ margin: "0 300px" }}>
        <div className="jodi-table-header">
          SRIDEVI MORNING MATKA JODI RECORD 2020 - 2026
        </div>
        <table className="jodi-record-table">
          <thead>
            <tr>
              {days.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {jodiData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td
                    key={colIndex}
                    style={{
                      color: isRed(colIndex, rowIndex) ? "red" : "black",
                      padding: "4px 2px",
                      fontSize: "0.9rem",
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Info Sections */}
      <div className="jodi-footer-info" style={{ marginTop: "10px" }}>
        <p className="jodi-info-text">
          Are you passionate about the game of luck and intrigued by the world
          of matka gambling? If so, exploring Prabhat Jodi Chart Records can add
          an exciting dimension to your matka journey. Dpboss Services offers a
          comprehensive platform to access and analyze Prabhat Jodi Chart
          Records, providing enthusiasts with valuable insights and historical
          data.
        </p>

        <h3 className="jodi-info-title" style={{ margin: "10px 0 5px" }}>
          Prabhat Jodi Chart Records Online
        </h3>
        <p className="jodi-info-text">
          Embark on your matka journey with confidence, armed with the insights
          derived from Prabhat Jodi Chart Records available through Dpboss
          Services. Explore the rich history of matka outcomes and elevate your
          gaming strategies to new heights.
        </p>

        <div className="jodi-faq-section" style={{ margin: "10px 0" }}>
          <h3 className="jodi-faq-title">Frequently Asked Questions (FAQs):</h3>
          <div className="faq-item" style={{ marginBottom: "8px" }}>
            <h4 className="faq-q">Q1. What are Prabhat Jodi Chart Records?</h4>
            <p className="faq-a">
              Prabhat Jodi Chart Records are graphical representations of the
              outcomes in the popular matka game, displaying the combinations of
              numbers that have appeared over time. These charts are invaluable
              tools for matka players, helping them identify patterns, trends,
              and potential winning strategies. Dpboss Services ensures easy
              access to Prabhat Jodi Chart Records, allowing users to make
              informed decisions and enhance their matka gaming experience.
            </p>
          </div>
          <div className="faq-item" style={{ marginBottom: "8px" }}>
            <h4 className="faq-q">
              Q2. How does Dpboss Services enhance your matka experience with
              Prabhat Jodi Chart Records?
            </h4>
            <p className="faq-a">
              Dpboss Services takes pride in offering a user-friendly interface
              that simplifies the navigation and retrieval of Prabhat Jodi Chart
              Records. The platform is designed to cater to both novice and
              seasoned players, providing a reliable source of historical data
              for analysis. By understanding past patterns and outcomes, matka
              enthusiasts can make more informed guesses, improving their
              chances of success. Dpboss Services strives to create a seamless
              experience, ensuring that users have all the tools they need to
              navigate the intricate world of matka gambling.
            </p>
          </div>
        </div>

        <div style={{ textAlign: "center", margin: "10px 0" }}>
          <button onClick={scrollToTop} className="go-bottom-btn">
            Go to Top
          </button>
          <div
            style={{
              marginTop: "5px",
              fontWeight: "900",
              color: "#000",
              fontSize: "0.8rem",
            }}
          >
            98
          </div>
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

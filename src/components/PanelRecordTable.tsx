import { mockPanelData } from "@/utils/constants";

interface PanelData {
  left: string[];
  jodi: string;
  right: string[];
  isRed?: boolean;
}

const RowCell = ({ data }: { data: PanelData }) => (
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

export default function PanelRecordTable() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="panel-record-container">
      <div
        className="jodi-table-header"
        style={{
          textTransform: "uppercase",
          borderRadius: "8px 8px 0 0",
          border: "1px solid #000",
          borderBottom: "none",
        }}
      >
        DIAMOND PANEL CHART
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
            {mockPanelData.map((row, i) => (
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
                <RowCell data={(row as any).sun} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        className="jodi-footer-info"
        style={{ marginTop: "15px", padding: "0 10px" }}
      >
        <p className="jodi-info-text">
          Welcome to DPBoss Services, your trusted destination for comprehensive
          and accurate Dhanshree Panel Chart Records. We take pride in offering
          a reliable platform that caters specifically to the needs of matka
          enthusiasts, providing in-depth insights into Dhanshree games to
          enhance your gaming experience.
        </p>
        <h3 className="jodi-info-title" style={{ color: "red" }}>
          Dhanshree Panel Chart Records Online
        </h3>
        <p className="jodi-info-text">
          Dive into the world of Dhanshree matka with our carefully crafted
          Dhanshree Panel Chart Records. Tailored to meet the demands of both
          seasoned players and newcomers, our charts provide a detailed
          historical overview of gaming patterns and trends. Whether you're
          strategizing your next move or seeking to understand the dynamics of
          Dhanshree matka, DPBoss Services is your go-to source for accurate and
          up-to-date information.
        </p>

        <div className="jodi-faq-section">
          <h3 className="jodi-faq-title" style={{ fontSize: "0.8rem" }}>
            Frequently Asked Questions (FAQ) for Diamond Panel Chart Records:
          </h3>
          <div className="faq-item">
            <h4 className="faq-q">
              Q1: How often are the Dhanshree Panel Chart Records updated on
              DPBoss Services?
            </h4>
            <p className="faq-a">
              We understand the importance of real-time information in the matka
              world. At DPBoss Services, we are committed to regular updates of
              our Dhanshree Panel Chart Records. Our dedicated team ensures that
              you have access to the latest gaming trends and patterns,
              empowering you with timely information to make informed decisions.
            </p>
          </div>
          <div className="faq-item">
            <h4 className="faq-q">
              Q2: Is there a subscription fee for accessing Dhanshree Panel
              Chart Records on DPBoss Services?
            </h4>
            <p className="faq-a">
              No, accessing Dhanshree Panel Chart Records on DPBoss Services is
              completely free of charge. We believe in making valuable
              information accessible to all enthusiasts without any subscription
              fees. Simply visit our user-friendly website, navigate to the
              Dhanshree section, and explore the latest charts at your
              convenience. DPBoss Services is dedicated to democratizing
              information and providing equal opportunities for all Dhanshree
              matka enthusiasts.
            </p>
          </div>
        </div>

        <div style={{ textAlign: "center", margin: "15px 0" }}>
          <button onClick={scrollToTop} className="go-bottom-btn">
            Go to Top
          </button>
          <div style={{ marginTop: "5px", fontWeight: "900", color: "#000" }}>
            143
          </div>
        </div>

        <div
          className="jodi-custom-footer common-border"
          style={{ border: "3px solid #3f51b5" }}
        >
          <h2 className="jodi-footer-logo" style={{ color: "#007bff" }}>
            DPBOSS.BOSTON
          </h2>
          <p className="jodi-footer-msg" style={{ color: "red" }}>
            All Rights Reseved®
          </p>
          <p className="jodi-footer-msg" style={{ color: "red" }}>
            (1998-2024)
          </p>
          <p className="jodi-footer-contact" style={{ color: "red" }}>
            Contact (Astrologer-<span>Dpboss</span>)
          </p>
        </div>
      </div>
    </div>
  );
}

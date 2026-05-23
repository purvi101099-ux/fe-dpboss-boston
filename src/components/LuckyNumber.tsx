import { headlines } from "@/utils/constants";
import NoticeMessage from "./NoticeMessage";

export default function LuckyNumber() {
  return (
    <div className="lucky-container">
      <div className="common-border">
        <h3 className="lucky-header">Today Lucky Number</h3>
        <section className="lucky-content">
          <div className="golden-ank">
            <div className="ank-title">Golden Ank</div>
            <div className="ank-value">3-8-0-5</div>
          </div>
          <div className="final-ank">
            <div className="ank-title">Final Ank</div>
            <div className="headline-section">
              <div className="headline-wrapper">
                {headlines.map((item, index) => (
                  <div key={index} className="headline-value">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      <NoticeMessage />

      <section className="guessing-forum common-border">
        <p>🌎दुनिया को दिखाओ अपनी Guessing का जलवा</p>
        <p>🏆 बनो Guessing Champion और जीतों सबका दिल</p>
        <p>🚀 Download Satta8055 Forum App & Join the Winning Community</p>
        <button className="download-button">📥 Download App</button>
      </section>
    </div>
  );
}

import { hindiInfo, keywords1, keywords2 } from "@/utils/constants";

export default function FooterSections() {
  return (
    <div className="footer-sections-wrapper">
      {/* Scrollable Hindi Box */}
      <div className="info-scroll-box hindi-box common-border">
        {hindiInfo.map((item, idx) => (
          <div key={idx} className="info-item">
            <h2 className="info-title">{item.title}</h2>
            <p className="info-content">{item.content}</p>
          </div>
        ))}
      </div>

      {/* Keywords Section 1 */}
      <div className="keywords-container common-border">
        <div className="keywords-list">
          {keywords1.map((word, idx) => (
            <span key={idx}>
              {word} {idx < keywords1.length - 1 && "|"}{" "}
            </span>
          ))}
        </div>
      </div>

      {/* Keywords Section 2 */}
      <div className="keywords-container highlight-keywords common-border">
        <div className="keywords-list">
          {keywords2.map((word, idx) => (
            <span key={idx}>
              {word}
              {idx < keywords2.length - 1 && ","}{" "}
            </span>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="disclaimer-box common-border">
        <h3 className="disclaimer-title">-:DISCLAIMER:-</h3>
        <p className="disclaimer-text">
          Visiting and using this website is entirely at your own risk. All information provided on this platform is strictly for informational and entertainment purposes only, based on numerical analysis and general interpretations.

We are not associated, affiliated, or connected with any illegal Satta Matka or gambling activities in any form. We strictly comply with all applicable laws and regulations.

Users are advised to check their local laws and regulations before accessing or using this website. If the website is restricted or banned in your region, you should not access it.

By continuing to use this website, you agree that you are solely responsible for any consequences, including legal issues, losses, or damages that may arise.
        </p>
      </div>

      {/* Final Footer */}
      <div className="bottom-footer ">
        <h2 className="powerd-by common-border">Satta8055.com</h2>
        <div className="common-border">
          <p className="copyright">©2026 Satta8055.com</p>
          {/* <div className="footer-links">
            <a href="#">About us</a> | <a href="#">Contact us</a>
            <br />
            <a href="#">Privacy policy</a> | <a href="#">Term And Conditions</a>{" "}
            | <a href="#">Result Api</a>
          </div> */}
        </div>
      </div>

    </div>
  );
}

export default function Footer() {
  return (
    <div className="footer-sticky-bar">
      <div className="footer-buttons">
        <a href="#" className="footer-small-btn">
          Matka Play
        </a>
        {/* <a href="#" className="footer-small-btn">
          Fix open
        </a> */}
        <a href="" className="footer-small-btn"
          onClick={(e) => {
            e.preventDefault();
            window.location.reload();
          }}>
          REFRESH
        </a>
      </div>
    </div>
  );
}

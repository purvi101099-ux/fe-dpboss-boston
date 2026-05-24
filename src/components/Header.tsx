import { useNavigate } from "react-router-dom";
import TopHeader from "./common/TopHeader";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header>
      <TopHeader />
      <div className="welcome-line common-border">
        <img src="/logo.png" alt="Deity" style={{ display: window.innerWidth <= 768 ? "none" : "block" }} />
        <p className="" style={{ display: window.innerWidth <= 768 ? "none" : "block" }}>
        Welcome to Satta8055 Your Destination for Fast Satta Matka Results
        </p>
        <img src="/logo.png"  alt="Deity" />
      </div>
      <div className="marquee-box common-border">
       Satta Matka | Satta8055.com | Kalyan Matka Result | Satta Matka Result | Satta Matka Fast Result | Satta Matka Live Result | Kalyan Matka Fast Result | Satta Matka Online | Satta Matka Game | Satta Matka Chart | Satta Matka Number | Satta8055.com
       | Satta Matka Result Today
        <p>
          Welcome to Satta8055, your trusted destination for the fastest live Matka results. We provide accurate and real-time updates for all major Matka markets in India.
        </p>
      </div>
    </header>
  );
}

import { useNavigate } from "react-router-dom";

function TopHeader() {
  const navigate = useNavigate();

  return (
    <div className="header-top common-border">
      <h5
        className="logo"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        Dp<span>BOSS.BOSTON</span>
      </h5>
    </div>
  );
}

export default TopHeader;

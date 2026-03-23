import { useNavigate } from "react-router-dom";

function TopHeader() {
  const navigate = useNavigate();

  return (
    <div className="header-top common-border">
      <h1
        className="logo"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        Dp<span>BOSS.BOSTON</span>
      </h1>
    </div>
  );
}

export default TopHeader;

import PanelRecordTable from "@/components/PanelRecordTable";

export default function PanelChartRecord() {
  return (
    <div className="container">
      <div
        className="header-top common-border"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <h1 className="logo">
          Dp<span>BOSS.BOSTON</span>
        </h1>
      </div>

      <PanelRecordTable />

      <div
        style={{
          position: "fixed",
          bottom: "10px",
          left: "10px",
          zIndex: 1000,
        }}
      >
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

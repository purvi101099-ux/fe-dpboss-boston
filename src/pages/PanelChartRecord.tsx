import TopHeader from "@/components/common/TopHeader";
import PanelRecordTable from "@/components/PanelRecordTable";
import { useNavigate } from "react-router-dom";

export default function PanelChartRecord() {
  return (
    <div className="container">
      <TopHeader />

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

import { jodiCharts, panelCharts } from "@/utils/constants";

const ChartSection = ({ title, items }: { title: string; items: string[] }) => (
  <div className="matka-chart-section">
    <div className="matka-chart-header">{title}</div>
    <div className="matka-chart-list">
      {items.map((item, index) => (
        <a key={index} href="#" className="matka-chart-item">
          {item}
        </a>
      ))}
    </div>
  </div>
);

export default function MatkaCharts() {
  return (
    <div className="matka-charts-container">
      <ChartSection title="SATTA MATKA JODI CHART" items={jodiCharts} />
      <ChartSection title="MATKA PANEL CHART" items={panelCharts} />
    </div>
  );
}

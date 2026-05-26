import { getBazar } from "@/api/game";
import { jodiCharts, panelCharts } from "@/utils/constants";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

const ChartSection = ({ title, items, section }: { title: string; items: any[]; section: string }) => (
  <div className="matka-chart-section">
    <div className="matka-chart-header">{title}</div>
    <div className="matka-chart-list">
      {items.map((item, index) => (
        <a key={index} href={`${section === 'Chart' ? 'jodi-chart-record' : 'panel-chart-record'}/${item?.bazarId}`} className="matka-chart-item">
          {item?.bazarName} {section}
        </a>
      ))}
    </div>
  </div>
);

export default function MatkaCharts() {
   const queryClient = useQueryClient();
   // Fetch data
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["games"],
    queryFn: getBazar,
  });

  // Defensive check to ensure we pass an array to the table
  const bazarData = useMemo(() => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    // Handle nested data if API returns an object (e.g., { games: [...] } or { data: [...] })
    const results =
      (data as any).games ||
      (data as any).data ||
      (data as any).bazar ||
      (data as any).gamelist ||
      [];
    return Array.isArray(results) ? results : [];
  }, [data]);
  return (
    <div className="matka-charts-container">
      <ChartSection title="SATTA MATKA JODI CHART" items={bazarData} section="Chart" />
      <ChartSection title="MATKA PANEL CHART" items={bazarData} section="Panel Chart" />
    </div>
  );
}

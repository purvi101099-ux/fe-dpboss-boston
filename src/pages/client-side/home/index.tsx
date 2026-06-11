import React from "react";
import { useQuery } from "@tanstack/react-query";
import GameCard from "@/components/client/GameCard";
import QuickActions from "@/components/client/QuickActions/QuickActions";
import { getGameNumbers } from "@/api/gameNumber";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const ClientHome: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["game-numbers", "bid"],
    queryFn: () => getGameNumbers({ type: "bid", page: 1, limit: 10 }),
    refetchInterval: 120000, // Auto refresh every 2 minutes
  });

  // Extract and transform data array safely
  const games = React.useMemo(() => {
    if (!data) return [];
    const rawData = (data as any).data || data;

    if (!Array.isArray(rawData)) return [];

    // Transform API data to match GameCard expected format
    return rawData.map((item: any) => ({
      name: item.game,
      status: item.betting_status,
      numbers: item.value,
      color: item.betting_status.toLowerCase().includes("running") ? "green" : "red",
      times: {
        openBidEnds: item.bdtimeOpen,
        closeBidEnds: item.bdtimeClose,
        openResult: item.timeOpen,
        closeResult: item.timeClose,
      },
      ...item, // Keep original data as fallback
    }));
  }, [data]);

  return (
    <>
      <div
        style={{
          padding: "12px",
          minHeight: "calc(100vh - 130px)",
        }}
      >
        <QuickActions />

        {/* Game Cards */}
        {isLoading && <div style={{ display: "flex", justifyContent: "center", padding: "50px" }}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </div>}

        {!isLoading && games.length === 0 && (
          <div className="no-data-text">No games available</div>
        )}

        {games.map((game, index) => (
          <GameCard key={index} game={game} />
        ))}
      </div>
    </>
  );
};

export default ClientHome;

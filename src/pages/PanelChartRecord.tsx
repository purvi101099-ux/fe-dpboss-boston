import { useParams, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getGameNumbersByGameId } from "@/api/gameNumber";
import TopHeader from "@/components/common/TopHeader";
import PanelRecordTable from "@/components/PanelRecordTable";
import React from "react";

const PanelChartRecord = () => {
  const { id } = useParams();
  const location = useLocation();
  const passedGame = location.state?.gameData;

  const {
    data: response,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["game-numbers", "chart-panel", id],
    queryFn: () => getGameNumbersByGameId(Number(id), { page: 1, limit: 100 }),
    enabled: !!id,
  });

  const chartData = React.useMemo(() => {
    if (!response) return [];
    return (response as any).data || [];
  }, [response]);
  const gameData = React.useMemo(() => {
      if (!response) return [];
      return (response as any).game || {};
    }, [response]);
  // Extract game info from the first record if available
  const gameInfo = React.useMemo(() => {
    // Priority 1: Data from fetched chart records (most up to date)
    if (chartData.length > 0) {
      const first = chartData[0];
      return {
        name:
          first.bazar?.name ||
          first.bazar?.bazarName ||
          passedGame?.game ||
          passedGame?.bazarName,
        value:
          first.value ||
          `${first.first_number}-${first.jodi_number}-${first.second_number}`,
      };
    }

    // Priority 2: Data passed via navigation state (initial load)
    if (passedGame) {
      return {
        name:
          passedGame.game ||
          passedGame.bazar?.name ||
          passedGame.bazarName ||
          "Game",
        value:
          passedGame.value ||
          `${passedGame.first_number}-${passedGame.jodi_number}-${passedGame.second_number}`,
      };
    }

    return { name: "GAME", value: "Loading..." };
  }, [chartData, passedGame]);

const gameName = gameInfo.name || gameData?.game_name;

const keywords = `
Satta8055 ${gameName} panel chart,
${gameName} panel chart,
${gameName} patti chart,
${gameName} panel record,
${gameName} old panel chart,
${gameName} panel chart 2015,
${gameName} panel chart 2012 to 2023,
${gameName} final ank,
${gameName} matka chart,
satta ${gameName} panel chart,
${gameName} panel guessing,
${gameName} result,
${gameName} live result,
Satta8055 matka panel chart,
सट्टा चार्ट,
${gameName} पाना चार्ट
`.replace(/\s+/g, ' ').trim();

  return (
    <div className="container">
      <TopHeader />

      <div className="section-header">
        {gameInfo.name || gameData?.game_name.toUpperCase()} PANEL CHART
      </div>

      <div className="keywords-container">
        <h2 className="info-title">
          {gameInfo.name || gameData?.game_name.toUpperCase()} PANEL RESULT CHART RECORDS
        </h2>
        <p className="keywords-list">{keywords}</p>
      </div>

      {/* <div className="result-item common-border">
        <h3 className="live-game-name">{gameInfo.name || gameData?.game_name}</h3>
        <div className="live-game-value">{gameInfo.value}</div>
      </div> */}

      <PanelRecordTable
        data={chartData}
        loading={isLoading}
        gameName={gameInfo.name || gameData?.game_name}
        onRefresh={() => refetch()}
      />

      {/* <div
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
      </div> */}
    </div>
  );
};

export default PanelChartRecord;

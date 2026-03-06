import { useParams, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getGameNumbersByGameId } from "@/api/gameNumber";
import TopHeader from "@/components/common/TopHeader";
import JodiRecordTable from "@/components/JodiRecordTable";
import React from "react";

const JodiChartRecord = () => {
  const { id } = useParams();
  const location = useLocation();
  const passedGame = location.state?.gameData;

  const {
    data: response,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["game-numbers", "chart", id],
    queryFn: () => getGameNumbersByGameId(Number(id), { page: 1, limit: 100 }),
    enabled: !!id,
  });

  const chartData = React.useMemo(() => {
    if (!response) return [];
    return (response as any).data || [];
  }, [response]);

  // Extract game info from the first record if available
  const gameInfo = React.useMemo(() => {
    // Priority 1: Data passed via navigation state
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

    // Priority 2: Data from fetched chart records
    if (chartData.length > 0) {
      const first = chartData[0];
      return {
        name: first.bazar?.name || first.bazar?.bazarName || "Game",
        value:
          first.value ||
          `${first.first_number}-${first.jodi_number}-${first.second_number}`,
      };
    }

    return { name: "SRIDEVI MORNING", value: "Loading..." };
  }, [chartData, passedGame]);

  const keywords = `
    Dpboss ${gameInfo.name} jodi chart, ${gameInfo.name} jodi chart,
    old ${gameInfo.name} jodi chart, dpboss ${gameInfo.name} chart,
    ${gameInfo.name} jodi record, ${gameInfo.name} jodi chart 2015,
    ${gameInfo.name} jodi chart 2012 to 2023, ${gameInfo.name} final ank,
    ${gameInfo.name} matka chart, satta ${gameInfo.name} chart jodi,
    डीपी बॉस, सट्टा चार्ट, ${gameInfo.name} जोड़ी चार्ट
  `;

  return (
    <div className="container">
      <TopHeader />

      <div className="section-header">
        {gameInfo.name.toUpperCase()} JODI CHART
      </div>

      <div className="keywords-container">
        <h2 className="info-title">
          {gameInfo.name.toUpperCase()} JODI RESULT CHART RECORDS
        </h2>
        <p className="keywords-list">{keywords}</p>
      </div>

      <div className="result-item common-border">
        <h3 className="live-game-name">{gameInfo.name}</h3>
        <div className="live-game-value">{gameInfo.value}</div>

        <button className="footer-small-btn" onClick={() => refetch()}>
          Refresh Result
        </button>
      </div>

      <JodiRecordTable
        data={chartData}
        loading={isLoading}
        gameName={gameInfo.name}
      />
    </div>
  );
};

export default JodiChartRecord;

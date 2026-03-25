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

    const gameData = React.useMemo(() => {
    if (!response) return [];
    return (response as any).game || {};
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
        name: first.bazar?.name || first.bazar?.bazarName,
        value:
          first.value ||
          `${first.first_number}-${first.jodi_number}-${first.second_number}`,
      };
    }

    return { name: "SRIDEVI MORNING", value: "Loading..." };
  }, [chartData, passedGame]);

const gameName = gameInfo.name || gameData?.game_name;

const keywords = `
Satta8055 ${gameName} jodi chart,
${gameName} jodi chart,
${gameName} old jodi chart,
${gameName} chart,
${gameName} jodi record,
${gameName} jodi chart 2015,
${gameName} final ank,
${gameName} matka chart,
satta ${gameName} chart jodi,
${gameName} guessing,
${gameName} result,
${gameName} live result,
Satta8055 matka result,
सट्टा चार्ट,
${gameName} जोड़ी चार्ट
`.replace(/\s+/g, ' ').trim();

  return (
    <div className="container">
      <TopHeader />

      <div className="section-header">
        {gameInfo.name || gameData?.game_name.toUpperCase()} JODI CHART
      </div>

      <div className="keywords-container">
        <h2 className="info-title">
          {gameInfo.name || gameData?.game_name.toUpperCase()} JODI RESULT CHART RECORDS
        </h2>
        <p className="keywords-list">{keywords}</p>
      </div>

      {/* <div className="result-item common-border">
        <h3 className="live-game-name">{gameInfo.name || gameData?.game_name}</h3>
        <div className="live-game-value">{gameInfo.value}</div>

        <button className="footer-small-btn" onClick={() => refetch()}>
          Refresh Result
        </button>
      </div> */}

      <JodiRecordTable
        data={chartData}
        loading={isLoading}
        gameName={gameInfo.name || gameData?.game_name}
        onRefresh={refetch}
      />
    </div>
  );
};

export default JodiChartRecord;

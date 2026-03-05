import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getGameNumbers } from "@/api/gameNumber";

export default function Results() {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["game-numbers", "all"],
    queryFn: () => getGameNumbers({ type: "all", page: 1, limit: 100 }),
  });

  const resultsData = useMemo(() => {
    if (!data) return [];
    const rawData = (data as any).data || data;
    return Array.isArray(rawData) ? rawData : [];
  }, [data]);

  const onhandleJodiButtonClick = (game: any) => {
    navigate(`/jodi-chart-record/${game.game_id || game.id}`, {
      state: { gameData: game },
    });
  };

  const onhandlePanelButtonClick = (game: any) => {
    navigate(`/panel-chart-record/${game.game_id || game.id}`, {
      state: { gameData: game },
    });
  };

  return (
    <div className="results-container">
      <div className="section-header">
        WORLD ME SABSE FAST SATTA MATKA RESULT
      </div>
      <div className="result-list common-border">
        {isLoading && (
          <div
            style={{ padding: "20px", textAlign: "center", fontWeight: "bold" }}
          >
            Loading results...
          </div>
        )}

        {!isLoading && resultsData.length === 0 && (
          <div style={{ padding: "20px", textAlign: "center" }}>
            No results available
          </div>
        )}

        {resultsData.map((r: any, i: number) => {
          const gameName = r.game || r.bazarName || "Unknown Game";
          const resultValue =
            r.value ||
            (r.first_number
              ? `${r.first_number}-${r.jodi_number}-${r.second_number}`
              : "Loading...");
          const openTime = r.timeOpen || r.openTime || "";
          const closeTime = r.timeClose || r.closeTime || "";
          const isRed = r.is_active || r.isActive || r.jodi_luck === 1;

          return (
            <div
              key={r.id || i}
              className={`result-item ${isRed ? "active" : ""}`}
            >
              <button
                className="badge badge-left"
                onClick={() => onhandleJodiButtonClick(r)}
              >
                Jodi
              </button>
              <div className="game-name">{gameName}</div>
              <div className="game-value">{resultValue}</div>
              <div className="game-time">
                {openTime} {closeTime}
              </div>
              <button
                className="badge badge-right"
                onClick={() => onhandlePanelButtonClick(r)}
              >
                Panel
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

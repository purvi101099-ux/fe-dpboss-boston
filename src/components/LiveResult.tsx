import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getGameNumbers } from "@/api/gameNumber";

export default function LiveResult() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["game-numbers", "live"],
    queryFn: () => getGameNumbers({ type: "live", page: 1, limit: 10 }),
    refetchInterval: 60000, // Auto refresh every minute
  });

  // Extract data array safely
  const results = React.useMemo(() => {
    if (!data) return [];
    const rawData = (data as any).data || data;
    return Array.isArray(rawData) ? rawData : [];
  }, [data]);

  return (
    <div className="live-results-container common-border">
      <h3 className="lucky-header">Fastest Results... Live & Accurate</h3>

      <p className="live-tagline">Fastest Live Result Yahi Milega</p>

      {isLoading && <div className="loading-text">Loading live results...</div>}

      {!isLoading && results.length === 0 && (
        <div className="no-data-text">No live results available</div>
      )}

      {results.map((r: any, i: number) => {
        const gameName = r.game || r.bazarName || "Unknown Game";
        const resultValue =
          r.value || `${r.first_number}-${r.jodi_number}-${r.second_number}`;
        const openTime = r.timeOpen || r.openTime || "";
        const closeTime = r.timeClose || r.closeTime || "";

        return (
          <div key={r.id || i}>
            <div className="live-result-item">
              <div className="live-game-info">
                <div className="live-game-name">{gameName}</div>
                {(openTime || closeTime) && (
                  <div className="live-game-time">
                    {openTime} - {closeTime}
                  </div>
                )}
              </div>
              {resultValue.toLowerCase().includes("loading") ? (
                <div className="live-game-status">{resultValue}</div>
              ) : (
                <div className="live-game-value">{resultValue}</div>
              )}
              <button
                className="small-refresh-btn"
                onClick={() => refetch()}
                disabled={isLoading}
              >
                Refresh
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

import { liveResults } from "@/utils/constants";

export default function LiveResult() {
  return (
    <div className="live-results-container common-border">
      <div className="lucky-header">📢 LIVE RESULT 📢</div>

      <p className="live-tagline">Sabse Tezz Live Result Yahi Milega</p>

      {liveResults.map((r, i) => (
        <div key={i}>
          <div className="live-result-item">
            <div className="live-game-name">{r.game}</div>
            {r.status ? (
              <div className="live-game-status">{r.status}</div>
            ) : (
              <div className="live-game-value">{r.value}</div>
            )}
            <button className="small-refresh-btn">Refresh</button>
          </div>
        </div>
      ))}
    </div>
  );
}

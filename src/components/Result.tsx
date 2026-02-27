import { results } from "@/utils/constants";
import { useNavigate } from "react-router-dom";

export default function Results() {
  const navigate = useNavigate();
  const onhandleJodiButtonClick = () => {
    navigate("/jodi-chart-record");
  };
  const onhandlePanelButtonClick = () => {
    navigate("/panel-chart-record");
  };
  return (
    <div className="results-container">
      <div className="section-header">
        WORLD ME SABSE FAST SATTA MATKA RESULT
      </div>
      <div className="result-list common-border">
        {results.map((r, i) => (
          <div key={i} className={`result-item ${r.is_active ? "active" : ""}`}>
            <button className="badge badge-left">Jodi</button>
            <div className="game-name">{r.game}</div>
            <div className="game-value">{r.value}</div>
            <div className="game-time">
              {r.timeOpen} {r.timeClose}
            </div>
            <button className="badge badge-right">Panel</button>
          </div>
        ))}
      </div>
      <div className="result-list common-border">
        {results.map((r, i) => (
          <div key={i} className={`result-item ${r.is_active ? "active" : ""}`}>
            <button
              className="badge badge-left"
              onClick={() => onhandleJodiButtonClick()}
            >
              Jodi
            </button>
            <div className="game-name">{r.game}</div>
            <div className="game-value">{r.value}</div>
            <div className="game-time">
              {r.timeOpen} {r.timeClose}
            </div>
            <button
              className="badge badge-right"
              onClick={() => onhandlePanelButtonClick()}
            >
              Panel
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

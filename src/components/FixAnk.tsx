import { fixAnkData } from "@/utils/constants";

export default function FixAnk() {
  return (
    <>
      <div className="fix-ank-grid">
        {fixAnkData.map((data, i) => (
          <div key={i} className="fix-ank-card">
            <div className="fix-ank-card-header">
              <span>↪ {data.game}</span>
            </div>
            <div className="fix-ank-card-body">
              <div className="fix-digits">{data.digits}</div>
              <span className="fix-panels">{data.panels}</span>
              <span className="fix-jodis">{data.jodis}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

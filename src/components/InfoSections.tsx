import { infoData } from "@/utils/constants";

const InfoBox = ({ data }: { data: (typeof infoData)[0] }) => (
  <div className="info-scroll-box common-border">
    {data.sections.map((section, idx) => (
      <div key={idx} className="info-item">
        <h2 className="info-title">{section.title}</h2>
        <p className="info-content">{section.content}</p>
      </div>
    ))}
  </div>
);

export default function InfoSections() {
  return (
    <div className="info-wrapper">
      {infoData.map((box, idx) => (
        <InfoBox key={idx} data={box} />
      ))}
    </div>
  );
}

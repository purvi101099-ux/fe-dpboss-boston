import { jodiList2, jodiLists, specialGames } from "@/utils/constants";

export default function SpecialZone() {
  return (
    <>
      <div className="special-zone">
        <div className="zone-header">Dpboss Special Game Zone</div>
        <div className="zone-list">
          {specialGames.map((game, i) => (
            <a key={i} href="#" className="zone-item">
              {game}
            </a>
          ))}
        </div>
      </div>

      <div className="special-zone">
        <div className="zone-header">Matka Jodi List</div>
        <div className="zone-list">
          {jodiLists.map((item, i) => (
            <a key={i} href="#" className="zone-item">
              {item}
            </a>
          ))}
        </div>
      </div>
      <div className="special-zone">
        <div className="zone-header">AAJ KYA PASS HUA</div>
        <div className="zone-list">
          {jodiList2.map((item, i) => (
            <a key={i} href="#" className="zone-item">
              {item}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

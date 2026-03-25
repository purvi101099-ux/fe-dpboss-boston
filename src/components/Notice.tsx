import { navLinksBanner } from "@/utils/constants";

export default function Notice() {
    const siteBanner = localStorage.getItem("siteBanner") || "";
  return (
    <>
      <div className="notice-box common-border">
        {/* <div className="notice-header-new">★ NOTICE ★</div> */}
        <div className="notice-body" dangerouslySetInnerHTML={{ __html: siteBanner }}>
          
        </div>
      </div>

      {/* <nav className="horizontal-nav common-border">
        {navLinksBanner.map((link, index) => (
          <span key={index}>
            <a href="#">{link}</a>
            {index !== navLinksBanner.length - 1 && " | "}
          </span>
        ))}
      </nav> */}
    </>
  );
}

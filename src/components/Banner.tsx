import { navLinksBanner } from "@/utils/constants";

export default function Banner() {
  return (
    <>
      <div className="whatsapp-box common-border">
        <p>
          कल्याण मॉर्निंग, श्रीदेवी मॉर्निंग, टाइम बाज़ार मॉर्निंग, रतन खत्री,
          मैन बाज़ार डे, मैन फटाफट, बॉम्बे राजश्री डे, नाईट टाइम बाज़ार, बॉम्बे
          राजश्री स्टारलाइन
        </p>
        <p>
          के ऑनलाइन व्यापार, बुकिंग लोग खाईवाल कटिंग के लिए मैसेज करो डायरेक्ट
          ऑफिस
        </p>
        <button className="whatsapp-btn">📲 JoinOnWhatsapp</button>
      </div>

      <div className="notice-box common-border">
        <div className="notice-header">★ NOTICE ★</div>
        <div className="notice-body">
          <p>अपना बाजार dpboss.boston वेबसाइट में डलवाने</p>
          <p>के लिए आज ही हमें ईमेल करे</p>
          <p>
            <span className="email-text">Email : </span>
            <a href="mailto:support@dpboss.net">support@dpboss.net</a>
          </p>
          <p>शर्तें लागू</p>
        </div>
      </div>

      <nav className="horizontal-nav common-border">
        {navLinksBanner.map((link, index) => (
          <span key={index}>
            <a href="#">{link}</a>
            {index !== navLinksBanner.length - 1 && " | "}
          </span>
        ))}
      </nav>
    </>
  );
}

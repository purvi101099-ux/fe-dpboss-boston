import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import "./App.css";
import Home from "@/pages/Home";
import JodiChartRecord from "@/pages/JodiChartRecord";
import PanelChartRecord from "@/pages/PanelChartRecord";
import ScrollToTop from "./components/common/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jodi-chart-record" element={<JodiChartRecord />} />
        <Route path="/panel-chart-record" element={<PanelChartRecord />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

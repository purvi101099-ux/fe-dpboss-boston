import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import JodiChartRecord from "@/pages/JodiChartRecord";
import PanelChartRecord from "@/pages/PanelChartRecord";
import ScrollToTop from "@/components/common/ScrollToTop";
import SignUp from "@/pages/SignUp";
import SignIn from "@/pages/SignIn";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/jodi-chart-record" element={<JodiChartRecord />} />
        <Route path="/panel-chart-record" element={<PanelChartRecord />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

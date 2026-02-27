import Banner from "@/components/Banner";
import Header from "@/components/Header";
import LuckyNumber from "@/components/LuckyNumber";
import Results from "@/components/Result";
import LiveResult from "@/components/LiveResult";
import Starline from "@/components/Starline";
import BombayBazar from "@/components/BombayBazar";
import FataFat from "@/components/FataFat";
import ApiSection from "@/components/ApiSection";
import SpecialZone from "@/components/SpecialZone";
import WeeklyCharts from "@/components/WeeklyCharts";
import FixAnk from "@/components/FixAnk";
import Kalayan from "@/components/kalyan";
import MatkaCharts from "@/components/MatkaCharts";
import InfoSections from "@/components/InfoSections";
import FooterSections from "@/components/FooterSections";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="container">
      <Header />
      <LuckyNumber />
      <LiveResult />
      <Banner />
      <Results />
      <Starline />
      <BombayBazar />
      <FataFat />
      <ApiSection />
      <SpecialZone />
      <WeeklyCharts />
      <FixAnk />
      <Kalayan />
      <MatkaCharts />
      <InfoSections />
      <FooterSections />
      <Footer />
    </div>
  );
};

export default Home;

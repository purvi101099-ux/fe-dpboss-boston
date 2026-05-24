import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
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
import Notice from "@/components/Notice";
import { getSiteSettings } from "@/api/siteSettings";

interface SiteSettings {
  advertise1: string;
  advertise2: string;
  notice: string;
}

const Home = () => {
  // Fetch site settings
  const { data: settingsResponse } = useQuery({
    queryKey: ["site-settings"],
    queryFn: getSiteSettings,
  });

  // Process and memoize settings data
  const siteSettings: SiteSettings = useMemo(() => {
    if (!settingsResponse) {
      return {
        advertise1: "",
        advertise2: "",
        notice: "",
      };
    }
    const rawData = (settingsResponse as any).data || settingsResponse;
    const settingsData = Array.isArray(rawData) ? rawData[0] : rawData;
    return {
      advertise1: settingsData?.advertise1 || "",
      advertise2: settingsData?.advertise2 || "",
      notice: settingsData?.notice || "",
    };
  }, [settingsResponse]);

  return (
    <div className="container">
      <Header />
      <Notice advertise1={siteSettings.advertise1} />
      {/* <LuckyNumber /> */}
      <LiveResult />
      <Banner advertise2={siteSettings.advertise2} notice={siteSettings.notice} />
      <Results />
      {/* <Starline />
      <BombayBazar /> */}
      {/* <FataFat /> */}
      {/* <ApiSection /> */}
      {/* <SpecialZone />
      <WeeklyCharts />
      <FixAnk />
      <Kalayan /> */}
      <MatkaCharts />
      <InfoSections />
      <FooterSections footer={siteSettings.advertise2} />
      {/* <Footer /> */}
    </div>
  );
};

export default Home;

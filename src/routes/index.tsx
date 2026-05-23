import React from "react";
import Home from "@/pages/Home";
import JodiChartRecord from "@/pages/JodiChartRecord";
import PanelChartRecord from "@/pages/PanelChartRecord";
import SignUp from "@/pages/SignUp";
import SignIn from "@/pages/SignIn";

// Client Pages
import ProtectedLayout from "@/pages/client-side/ProtectedLayout";
import ClientHome from "@/pages/client-side/home";
import History from "@/pages/client-side/history";
import Profile from "@/pages/client-side/profile";
import Password from "@/pages/client-side/password";
import MyBids from "@/pages/client-side/my-bids";
import Support from "@/pages/client-side/support";
import BankDetails from "@/pages/client-side/bank-details";
import AddFund from "@/pages/client-side/add-fund";
import WithdrawFund from "@/pages/client-side/withdraw-fund";
import HistoryDetails from "@/pages/client-side/history-details";
import Notification from "@/pages/client-side/notification";
import GameRates from "@/pages/client-side/game-rates";

// Admin Pages
import Dashboard from "@/pages/admin/Dashboard";
import Bazar from "@/pages/admin/Bazar";
import BazarResult from "@/pages/admin/BazarResult";
import AdminLayout from "@/components/admin/AdminLayout";
import NotFound from "@/pages/common/NotFound";

import { PATHS } from "./paths";

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  children?: RouteConfig[];
  index?: boolean;
}

export const publicRoutes: RouteConfig[] = [
  { path: PATHS.HOME, element: <Home /> },
  { path: PATHS.SIGN_UP, element: <SignUp /> },
  { path: PATHS.SIGN_IN, element: <SignIn /> },
  { path: PATHS.JODI_CHART, element: <JodiChartRecord /> },
  { path: PATHS.PANEL_CHART, element: <PanelChartRecord /> },
];

export const clientRoutes: RouteConfig = {
  path: "",
  element: <ProtectedLayout />,
  children: [
    { path: PATHS.CLIENT_HOME, element: <ClientHome /> },
    { path: PATHS.HISTORY, element: <History /> },
    { path: PATHS.PROFILE, element: <Profile /> },
    { path: PATHS.CHANGE_PASSWORD, element: <Password /> },
    { path: PATHS.MY_BIDS, element: <MyBids /> },
    { path: PATHS.SUPPORT, element: <Support /> },
    { path: PATHS.BANK_DETAILS, element: <BankDetails /> },
    { path: PATHS.NOTIFICATION, element: <Notification /> },
    { path: PATHS.GAME_RATES, element: <GameRates /> },
    { path: PATHS.ADD_FUND, element: <AddFund /> },
    { path: PATHS.WITHDRAW_FUND, element: <WithdrawFund /> },
    { path: PATHS.FUND_HISTORY, element: <HistoryDetails /> },
    { path: PATHS.BIDDING_HISTORY, element: <HistoryDetails /> },
    { path: PATHS.STARLINE_HISTORY, element: <HistoryDetails /> },
    { path: PATHS.TXN_HISTORY, element: <HistoryDetails /> },
    { path: "*", element: <NotFound /> },
  ],
};

export const adminRoutes: RouteConfig = {
  path: PATHS.ADMIN,
  element: <AdminLayout />,
  children: [
    { index: true, element: <Dashboard />, path: "" }, // index path
    { path: PATHS.ADMIN_DASHBOARD, element: <Dashboard /> },
    { path: PATHS.ADMIN_BAZAR, element: <Bazar /> },
    { path: PATHS.ADMIN_BAZAR_RESULT, element: <BazarResult /> },
    { path: "*", element: <NotFound /> },
  ],
};

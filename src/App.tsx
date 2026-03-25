import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import JodiChartRecord from "@/pages/JodiChartRecord";
import PanelChartRecord from "@/pages/PanelChartRecord";
import ScrollToTop from "@/components/common/ScrollToTop";
import SignUp from "@/pages/SignUp";
import SignIn from "@/pages/SignIn";
import AdminLayout from "@/components/admin/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
import Bazar from "@/pages/admin/Bazar";
import BazarResult from "@/pages/admin/BazarResult";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

import PrivateRoute from "@/components/common/PrivateRoute";
import NotFoundRedirect from "@/components/common/NotFoundRedirect";
import SiteSettingsPage from "./pages/admin/Site";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/jodi-chart-record/:id" element={<JodiChartRecord />} />
          <Route
            path="/panel-chart-record/:id"
            element={<PanelChartRecord />}
          />

          {/* Protected Admin Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="bazar" element={<Bazar />} />
              <Route path="bazar-result" element={<BazarResult />} />
              <Route path="site-settings" element={<SiteSettingsPage />} />
            </Route>
          </Route>

          {/* Catch-all route for 404/Wrong URLs */}
          <Route path="*" element={<NotFoundRedirect />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

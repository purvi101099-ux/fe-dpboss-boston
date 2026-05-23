import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/common/ScrollToTop";
import PrivateRoute from "@/components/common/PrivateRoute";
import NotFoundRedirect from "@/components/common/NotFoundRedirect";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { publicRoutes, clientRoutes, adminRoutes } from "@/routes";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          {publicRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            {/* Client Routes */}
            <Route element={clientRoutes.element}>
              {clientRoutes.children?.map((child) => (
                <Route
                  key={child.path}
                  path={child.path}
                  element={child.element}
                />
              ))}
            </Route>

            {/* Admin Routes */}
            <Route path={adminRoutes.path} element={adminRoutes.element}>
              {adminRoutes.children?.map((child) => (
                <Route
                  key={child.path}
                  index={child.index}
                  path={child.path}
                  element={child.element}
                />
              ))}
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

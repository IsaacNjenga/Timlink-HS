import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import axios from "axios";
import Auth from "./pages/Auth";
import Patient from "./pages/Patient";
import FollowUp from "./pages/FollowUp";
import Cases from "./pages/Cases";
import Revenue from "./pages/Revenue";
import MobileImaging from "./pages/MobileImaging";
import Quotations from "./pages/Quotations";
import Portfolio from "./pages/Portfolio";
import Settings from "./pages/Settings";
import { useAuth } from "./contexts/authContext";
import { ConfigProvider, Spin } from "antd";
import ProtectedRoutes from "./utils/ProtectedRoute";
import { getAntdTheme, globalStyles } from "./utils/uiConfig";

axios.defaults.baseURL = process.env.REACT_APP_DEV_API_URL;
//axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

function App() {
  const location = useLocation();
  const { isAuthenticated, loading } = useAuth();
  const [themeMode, setThemeMode] = useState(() => {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSchemeChange = (event) => {
      setThemeMode(event.matches ? "dark" : "light");
    };

    colorScheme.addEventListener("change", handleSchemeChange);

    return () => {
      colorScheme.removeEventListener("change", handleSchemeChange);
    };
  }, []);

  if (loading) {
    return <Spin fullscreen tip="Authenticating..." size="large" />;
  }
  return (
    <ConfigProvider theme={getAntdTheme(themeMode)}>
      <style>{globalStyles}</style>
      <div data-theme={themeMode}>
      {!isAuthenticated ? (
        <Auth />
      ) : (
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Navbar />
              </ProtectedRoutes>
            }
          >
            <Route index element={<Home />} />
            <Route
              path="/patient&leads"
              element={
                <ProtectedRoutes>
                  <Patient />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/cases&surgery"
              element={
                <ProtectedRoutes>
                  <Cases />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/revenue&fees"
              element={
                <ProtectedRoutes>
                  <Revenue />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/mobile-imaging"
              element={
                <ProtectedRoutes>
                  <MobileImaging />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/quotations&invoices"
              element={
                <ProtectedRoutes>
                  <Quotations />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/doctor-portfolio"
              element={
                <ProtectedRoutes>
                  <Portfolio />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/follow-up"
              element={
                <ProtectedRoutes>
                  <FollowUp />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoutes>
                  <Settings />
                </ProtectedRoutes>
              }
            />
          </Route>
        </Routes>
      )}
      </div>
    </ConfigProvider>
  );
}

export default App;

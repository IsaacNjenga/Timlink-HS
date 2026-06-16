import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import axios from "axios";
import Auth from "./pages/Auth";
import { useAuth } from "./contexts/authContext";
import { Spin } from "antd";
import ProtectedRoutes from "./utils/ProtectedRoute";

axios.defaults.baseURL = process.env.REACT_APP_DEV_API_URL;
//axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

function App() {
  const location = useLocation();
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Spin fullscreen tip="Authenticating..." size="large" />;
  }
  return (
    <>
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
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;

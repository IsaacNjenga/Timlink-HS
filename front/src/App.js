import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";
import axios from "axios";
import Auth from "./pages/Auth/Auth";
import Patient from "./pages/Patient/Patient";
import FollowUp from "./pages/FollowUp/FollowUp";
import Cases from "./pages/Cases/Cases";
import Revenue from "./pages/Revenue/Revenue";
import MobileImaging from "./pages/MobileImaging/MobileImaging";
import Quotations from "./pages/Quotations/Quotations";
import Hospitals from "./pages/Hospitals/Hospitals";
import Settings from "./pages/Settings/Settings";
import { useAuth } from "./contexts/authContext";
import { ConfigProvider, Spin } from "antd";
import ProtectedRoutes from "./utils/ProtectedRoute";
import { getAntdTheme, globalStyles } from "./utils/uiConfig";
import { useUser } from "./contexts/userContext";
import AddPatient from "./pages/Patient/AddPatient";
import EditPatient from "./pages/Patient/EditPatient";
import AddCase from "./pages/Cases/AddCase";
import EditCase from "./pages/Cases/EditCase";
import Doctors from "./pages/Doctors/Doctors";
import AddDoctor from "./pages/Doctors/AddDoctor";
import EditDoctor from "./pages/Doctors/EditDoctor";
import AddHospital from "./pages/Hospitals/AddHospital";
import EditHospital from "./pages/Hospitals/EditHospital";

axios.defaults.baseURL = process.env.REACT_APP_DEV_API_URL;
//axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

function App() {
  const location = useLocation();
  const { isAuthenticated, loading } = useAuth();
  const { mode } = useUser();

  if (loading) {
    return <Spin fullscreen tip="Authenticating..." size="large" />;
  }
  return (
    <ConfigProvider theme={getAntdTheme(mode)}>
      <style>{globalStyles}</style>
      <div data-theme={mode}>
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
                path="/patient&leads/add-patient"
                element={
                  <ProtectedRoutes>
                    <AddPatient />
                  </ProtectedRoutes>
                }
              />{" "}
              <Route
                path="/patient&leads/edit-patient/:id"
                element={
                  <ProtectedRoutes>
                    <EditPatient />
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
                path="/cases&surgery/add-case"
                element={
                  <ProtectedRoutes>
                    <AddCase />
                  </ProtectedRoutes>
                }
              />
               <Route
                path="/cases&surgery/edit-case/:id"
                element={
                  <ProtectedRoutes>
                    <EditCase />
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
                    <Doctors />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/doctor-portfolio/add-doctor"
                element={
                  <ProtectedRoutes>
                    <AddDoctor />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/doctor-portfolio/edit-doctor/:id"
                element={
                  <ProtectedRoutes>
                    <EditDoctor />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/hospitals"
                element={
                  <ProtectedRoutes>
                    <Hospitals />
                  </ProtectedRoutes>
                }
              />
              <Route path='/hospitals/add-hospital' element={
                <ProtectedRoutes>
                  <AddHospital /> 
                </ProtectedRoutes>}
                /><Route path='/hospitals/edit-hospital' element={
                <ProtectedRoutes>
                  <EditHospital /> 
                </ProtectedRoutes>}
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

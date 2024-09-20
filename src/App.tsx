import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./components/category/pages/LoginPage";
import ForgotPasswordPage from "./components/category/pages/ForgotPassword";
import RegisterPage from "./components/category/pages/RegisterPage";
import ResetPassword from "./components/category/pages/ResetPassword";
import DashboardPage from "./components/category/pages/DashboardPage";
import ApplicationPage from "./components/category/pages/ApplicationPage";
import DatabasePage from "./components/category/pages/DatabasePage";
import DomainPage from "./components/category/pages/DomainPage";
import OrganizationPage from "./components/category/pages/OrganizationPage";
import ServerPage from "./components/category/pages/ServerPage";
import EmailPage from "./components/category/pages/EmailPage";
import AddApplicationPage from "./components/addData/page/AddApplicationPage";
import AddDatabasePage from "./components/addData/page/AddDatabasePage";
import AddDomainPage from "./components/addData/page/AddDomainPage";
import AddEmailPage from "./components/addData/page/AddEmailPage";
import AddOrganizationPage from "./components/addData/page/AddOrganizationPage";
import AddServerPage from "./components/addData/page/AddServerPage";

const protectedRoutes = [
  { path: "/aplikasi/*", element: <ApplicationPage /> },
  { path: "/dashboard/*", element: <DashboardPage /> },
  { path: "/database/*", element: <DatabasePage /> },
  { path: "/domain/*", element: <DomainPage /> },
  { path: "/servers/*", element: <ServerPage /> },
  { path: "/email/*", element: <EmailPage /> },
  { path: "/organization/*", element: <OrganizationPage /> },
  { path: "/AddApplication/*", element: <AddApplicationPage /> },
  { path: "/AddDatabase/*", element: <AddDatabasePage /> },
  { path: "/AddDomain/*", element: <AddDomainPage /> },
  { path: "/AddEmail/*", element: <AddEmailPage /> },
  { path: "/AddOrganization/*", element: <AddOrganizationPage /> },
  { path: "/AddServer/*", element: <AddServerPage /> },
  { path: "/", element: <LoginPage /> },
];


const App: React.FC = () => {
  return (
    <Router>
    <Routes>

      <Route path="/forgotpass" element={<ForgotPasswordPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/resetpassword/:token" element={<ResetPassword />} />

      {protectedRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={<PrivateRoute>{element}</PrivateRoute>}
        />
      ))}
    </Routes>
    <ToastContainer />
  </Router>
);
};

export default App;
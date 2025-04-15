import { BrowserRouter, Route,Navigate, useLocation, Outlet } from "react-router-dom";
import Header from "../../components/header/header";
import InfoCard from "../../components/info-card/info-card";
import NavegationHome from "../../components/nav_home/nave_home";
import Admin from "../admin/admin";
import './dashboard.css'


const Dashboard = () => {
  const location = useLocation();
  const isRoot = location.pathname === "/dashboard";
  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <Header/>
        {isRoot && (
          <>
            <NavegationHome />
            <InfoCard />
            <Admin />
          </>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
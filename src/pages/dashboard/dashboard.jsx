import Container from "../../components/container/container";
import Header from "../../components/header/header";
import InfoCard from "../../components/info-card/info-card";
import NavegationHome from "../../components/nav_home/nave_home";
import Admin from "../admin/admin";
import './dashboard.css'


const Dashboard = () => {
    return (
      <div className="dashboard">
        <div className="dashboard-container">
          <Header/>
          <NavegationHome/>
          <InfoCard/>
          {/*<Container/>*/}
          <Admin/>

        </div>
      </div>
    );
  };
  
  export default Dashboard;
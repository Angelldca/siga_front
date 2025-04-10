import Container from "../../components/container/container";
import NavegationHome from "../../components/nav_home/nave_home";
import Admin from "../admin/admin";


const Dashboard = () => {
    return (
      <div>
        <NavegationHome/>
        {/*<Container/>*/}
        <Admin/>
      </div>
    );
  };
  
  export default Dashboard;
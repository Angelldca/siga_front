import Login from "../../components/login/login";
import logo from "../../assets/logo-without-letter.png"
import './loginPage.css'
const LoginPage = ()=>{

    return(
        <div className="logingContainer">
        
         <Login/>

         <section>
            <img src={logo} className="img_logo_section"/>
            <span> | </span>
            <p>Copyright 2025</p>
         </section>
        </div>
    )
}


export default LoginPage;
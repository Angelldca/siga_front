import './login.css'
import logo from '../../assets/logo-without-letter.png' 
import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await login({ email, password });
    if (token) {
      navigate("/dashboard");
    } else {
      console.log("Error: ", token)//TODO: mejorar alerta
    }
  };

    return (
        <div className="login-card">
        <img src={logo} alt="SIGA" className='img-logo'/>
        <h1>Bienvenido al sistema</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className='.btn-primary'>Iniciar sesión</button>
        </form>
        <p>¿Olvidaste la contraseña?</p>
      </div>
    )
}


export default Login;
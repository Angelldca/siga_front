import './login.css'
import logo from '../../assets/logo-without-letter.png' 
import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
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
        <p>Olvidaste la contraseña?</p>
      </div>
    )
}


export default Login;
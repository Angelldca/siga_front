import './login.css'
import logo from '../../assets/logo-without-letter.png'
import {useEffect, useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import Loading from '../loading/loading';
import Alert from '../alert/alert';


const Login = () => {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState(null);
  const [password, setPassword] = useState('');
  const { login, loading, user } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && location.pathname === "/login") {
      navigate("/dashboard");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login({ email, password });
    if (result?.success) {
      navigate("/dashboard");
    } else {
      const errorMessage = result.error || 'Error al iniciar sesión';
      setAlert({ type: 'error', message: errorMessage });
    }
  };

  return (
    <>
      {loading && <Loading />}
      
      <div className="login-card">
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)
          
          }
       
        />
      )}
        <img src={logo} alt="SIGA" className='img-logo' />
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
          <button type="submit" className='btn-primary btn-submit'>Iniciar sesión</button>
        </form>
        <p className='login-card-p'>¿Olvidaste la contraseña?</p>
      </div>
    </>
  )
}


export default Login;
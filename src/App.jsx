
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/login/login';
import Dashboard from './pages/dashboard/dashboard';
import NotFound from './pages/notFound/notFound';
import { PermissionRoute } from './utils/PermissionRoute';
import GestionEventos from './pages/evento/GestionEventos';
import { useAuth } from './context/AuthContext';
import Loading from './components/loading/loading';
import GestionZona from './pages/zona/GestionZona';
import GestionPuerta from './pages/puertas/gestion_puertas';
import GestionCiudadanos from './pages/ciudadanos/gestion_ciudadanos';
import CiudadanosAdmin from './pages/ciudadanosAdmin/CiudadanosAdmin';
import CiudadanosAction from './components/ciudadanos_action/CiudadanosAction';
import GestionPlato from './pages/platos/GestionPlatos';

function App() {
  const {loadingSession } = useAuth();

  if (loadingSession) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Routes>
       <Route  path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ciudadanos/admin" element={
          <PermissionRoute module="ADMINISTRACION" permission="GESTION-CIUDADANOS">
            <CiudadanosAdmin/>
          </PermissionRoute>
        } >
           <Route path="" element={
            <CiudadanosAction/>
           } />
        </Route>
        <Route path="/dashboard" element={
          <PermissionRoute module="INICIO" permission="INICIAR_SESION">
            <Dashboard />
          </PermissionRoute>
        } >
          <Route path="eventos" element={<GestionEventos />} />
          <Route path="zonas" element={<GestionZona />} />
          <Route path="puertas" element={<GestionPuerta />} />
          <Route path="ciudadanos" element={<GestionCiudadanos />} />
          <Route path="platos" element={<GestionPlato />} />
          <Route path="menu" element={<GestionCiudadanos />} />
         
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

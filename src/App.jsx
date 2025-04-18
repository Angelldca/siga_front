
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/login/login';
import Dashboard from './pages/dashboard/dashboard';
import NotFound from './pages/notFound/notFound';
import { PermissionRoute } from './utils/PermissionRoute';
import GestionEventos from './pages/evento/GestionEventos';
import { useAuth } from './context/AuthContext';
import Loading from './components/loading/loading';

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
        <Route path="/dashboard" element={
          <PermissionRoute module="INICIO" permission="INICIAR_SESION">
            <Dashboard />
          </PermissionRoute>
        } >
          <Route path="eventos" element={<GestionEventos />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

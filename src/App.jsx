
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/login/login';
import Dashboard from './pages/dashboard/dashboard';
import NotFound from './pages/notFound/notFound';
import { PermissionRoute } from './utils/PermissionRoute';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <PermissionRoute module="INICIO" permission="INICIAR_SESION">
            <Dashboard />
          </PermissionRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

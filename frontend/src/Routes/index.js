import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../Pages/login';
import NotFound from '../Pages/notFound';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={ <Navigate to="/login" replace /> } />
        <Route path="/login" exact element={ <Login /> } />
        <Route path="*" element={ <NotFound /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;

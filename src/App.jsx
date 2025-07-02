import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
//import Registration from './pages/Registration';
import MainPage from './pages/WelcomePage/WelcomePage';
import VersionRouter from './app/VersionRouter';
import { Providers } from './providers/providers';

const App = () => {
  return (
    <Router>
      <Providers>
        <Routes>
          {/* ДЕФОЛТНЫЕ МАРШРУТЫ БЕЗ РАЗДЕЛЕНИЯ НА АДАПТАЦИИ */}
          <Route path="/main" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* АДАПТАЦИИ */}
          <Route path="/*" element={<VersionRouter />} />
        </Routes>
      </Providers>
    </Router>
  );
};

export default App;

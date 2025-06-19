import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
//import Login from './pages/Login';
//import Registration from './pages/Registration';
import MainPage from './pages/MainPage';

// import { Providers } from './providers';

const App = () => {
  return (
    <Router>
      {/* <Providers> */}
        <Routes>
          <Route path="/main" element={<MainPage />} />
          {/* <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} /> */}
          {/* <Route path="/*" element={<VersionRouter />} /> */}
          <Route path="*" element={<Navigate to="/main" />} />
        </Routes>
      {/* </Providers> */}
    </Router>
  );
};

export default App;

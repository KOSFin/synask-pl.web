import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
//import Login from './pages/Login';
//import Registration from './pages/Registration';
import MainPage from './pages/MainPage';

// import { Providers } from './providers';
import DesktopApp from './app/DesktopApp';
import PocketApp from './app/PocketApp';

const VersionRouter = () => {
  const [version, setVersion] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = `${location.pathname}${location.search}`;
  console.log(currentPath);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    var UrlPath = '/';

    // Determine version based on screen size
    const newVersion = width > 1199 && height > 569 ? '/d' : '/p';
    if (!currentPath.startsWith('/p/') && !currentPath.startsWith('/d/')) {
      UrlPath = `${newVersion}${currentPath}`;
    } else {
      UrlPath = `${currentPath}`;
    }

    setVersion(newVersion);

    // Redirect to the correct version
    if (!location.pathname.startsWith(`${newVersion}/`) || !location.pathname === `${newVersion}`) {
      navigate(UrlPath);
    } else {
      console.log(location.pathname);
    }

  }, [location.pathname, navigate]);

  if (version === null) return null; // or a loading spinner if needed

  return (
    <Routes>
      <Route path="/d/*" element={<DesktopApp />} />
      <Route path="/desktop/*" element={<DesktopApp />} />
      <Route path="/p/*" element={<PocketApp />} />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      {/* <Providers> */}
        <Routes>
          <Route path="/main" element={<MainPage />} />
          {/* <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} /> */}
          <Route path="/*" element={<VersionRouter />} />
          <Route path="*" element={<Navigate to="/main" />} />
        </Routes>
      {/* </Providers> */}
    </Router>
  );
};

export default App;

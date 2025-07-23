import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDevice } from '../providers/useDevice';

import MainRoutes from './routes/MainRouter';

const VersionRouter = () => {
    const [version, setVersion] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = `${location.pathname}${location.search}`;
    const { device } = useDevice();
    console.log('[VersionRouter] variables declared')
  
    useEffect(() => {
      var UrlPath = '/';
      console.log('[VersionRouter] replace path start')
  
      // Determine version based on screen size
      const newVersion = `/${device}`;
      if (!currentPath.startsWith('/p/') && !currentPath.startsWith('/d/') && currentPath !== '/p' && currentPath !== '/d') {
        UrlPath = `${newVersion}${currentPath}`;
      } else if (currentPath == '/p' || currentPath == '/d') {
        UrlPath = `${currentPath}/`;
      } else {
        UrlPath = `${currentPath}`;
      }
  
      setVersion(newVersion);
  
      // Redirect to the correct version
      if (!location.pathname.startsWith(`${newVersion}/`) || location.pathname !== `${newVersion}`) {
        navigate(UrlPath);
      }
  
    }, [location.pathname, navigate]);
  
    if (version === null) return null;
  
    return (
        <MainRoutes></MainRoutes>
    );
  };

export default VersionRouter;
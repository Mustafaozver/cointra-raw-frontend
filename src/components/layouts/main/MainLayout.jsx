import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom'

import './MainLayout.scss';
import Menu from '../../menu/Menu';
import Footer from '../../footer/Footer';

import storageManager from '../../../storage/storageManager';

const MainLayout = (props) => {
  const { children } = props;
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    const unlisten = () => window.scrollTo(0, 0);
    return () => {
      unlisten();
    };
  }, [pathname]);

  if (!storageManager.isLogged() && pathname !== '/login') {
    storageManager.loggout();
    return (<Navigate to={{ pathname: '/login' }} />);
  }

  return (
    <div className="main-layout">
      <div className="main-layout-menu-container">
        <Menu />
      </div>
      <div className="main-layout-main-container">
        {children}
      </div>
      <div className="main-layout-footer-container">
        <Footer />
      </div>
    </div>
  )
};

export default MainLayout;

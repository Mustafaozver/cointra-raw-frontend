import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

import './Menu.scss';

import {
  MyPZContainer,
  MyPZLink,
  MyPZDrawer,
  MyPZButton,
} from '@mypz/react-kit';

import storageManager from '../../storage/storageManager';
import Logo from '../logo/Logo';

const links = [
  {
    title: 'Agencies',
    link: '/agencies',
  },
  {
    title: 'Agents',
    link: '/agents',
  },
  {
    title: 'Properties',
    link: '/properties',
  },
  {
    title: 'Imports',
    link: '/imports',
  },
  {
    title: 'Blog',
    link: '/blogs',
  },
];

const Menu = (props) => {
  const history = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const onOpenMenu = () => {
    setIsOpen(true);
  };

  const onCloseMenu = () => {
    setIsOpen(false);
  };

  const getLinks = () => links.map((link) => (
    <NavLink to={link.link} activeclassname="active" onClick={onCloseMenu} key={link.title}>
      <li className="link-item">
        <span className="link-title">{link.title}</span>
      </li>
    </NavLink>
  ));

  const getMenu = () => (
    <>
      {getLinks()}
    </>
  );

  const getAppBar = () => {
    const icon = isOpen ? <CloseIcon onClick={onCloseMenu} /> : <MenuIcon onClick={onOpenMenu} className="menu-icon" />;
    const logoStyle = isOpen ? 'white' : 'svg';
    return (
      <div className="app-bar">
        <MyPZContainer>
          <div className="app-bar-container">
            <div className="app-bar-menu-icon">
              {icon}
            </div>
            <div className="app-bar-logo">
              <MyPZLink to="/">
                <Logo logoStyle={logoStyle} />
              </MyPZLink>
            </div>
          </div>
        </MyPZContainer>
      </div>
    );
  };

  const getDrawer = () => (
    <MyPZDrawer anchor="top" open={isOpen} onClose={onCloseMenu} className="mobile-menu-drawer">
      <div className="menu-drawer">
        {getAppBar()}
        <div className="menu-links-container">
          {getMenu()}
        </div>
      </div>
    </MyPZDrawer>
  );

  const handleLogOut = () => {
    storageManager.loggout();
    history('/login');
  };

  return (
    <div className="menu">
      <div className="mobile-menu">
        {getAppBar()}
        {getDrawer()}
      </div>

      <div className={`web-menu`}>
        <MyPZContainer>
          <div className="web-menu-container">
            <div className="web-menu-logo">
              <MyPZLink to="/">
                <Logo logoStyle="svg" />
              </MyPZLink>
            </div>
            <div className="menu-links-container">
              {getMenu()}
            </div>
            <div className="menu-links-container">
              <MyPZButton onClick={handleLogOut}>Log out</MyPZButton>
            </div>
          </div>
        </MyPZContainer>
      </div>
    </div>
  );
};

export default Menu;

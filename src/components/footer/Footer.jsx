import React from 'react';

import {
  MyPZLink,
  MyPZContainer,
} from '@mypz/react-kit';

import Logo from '../logo/Logo';

import './Footer.scss';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-separator" />
      <MyPZContainer>
        <div className="footer-main-container">
          <MyPZLink to="/">
            <Logo logoStyle="white" />
          </MyPZLink>
          <div className="footer-rights">© zeekeez DIFC - All Rights Reserved © 2021</div>
        </div>
      </MyPZContainer>
    </div>
  );
};

export default Footer;

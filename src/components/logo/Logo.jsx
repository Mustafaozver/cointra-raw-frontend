import React from 'react';

import './Logo.scss';

const Logo = (props) => {
  const { logoStyle } = props;
  const finalStyle = logoStyle === 'white' ? 'white' : 'black';
  const imageSrc = `/images/zeekeez-logo-${finalStyle}.svg`;

  return (
    <div className="logo">
      <img src={imageSrc} alt="My Propertyz logo" preserveAspectRatio="none" />
    </div>
  );
};

export default Logo;

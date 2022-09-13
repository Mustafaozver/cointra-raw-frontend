import React from 'react';

const defaultProps = {
  size: '22px',
};

const PinIcon = (props) => {
  const { size } = { ...defaultProps, ...props };

  return (
    <img src="/icons/pin.png" alt="pin icon" height={size} />
  );
};

export default PinIcon;

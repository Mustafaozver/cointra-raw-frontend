import React from 'react';

const defaultProps = {
  width: 25,
  height: 25,
};

const EnvelopIcon = (props) => {
  const { width, height } = { ...defaultProps, ...props };

  return (
    <img
      src="/icons/envelop.png"
      alt="message icon"
      width={width}
      height={height}
      on
    />
  );
};

export default EnvelopIcon;

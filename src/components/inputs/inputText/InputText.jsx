import React from 'react';

import './InputText.scss';

import { MyPZTextField } from '@mypz/react-kit';

const InputText = (props) => {
  const {
    label,
    placeholder,
    onChange,
    error,
    value,
    type,
  } = props;

  return (
    <div className={`input-text ${error ? 'show-error' : ''}`}>
      <span className="input-text__label">{label}</span>
      <MyPZTextField placeholder={placeholder} onChange={onChange} value={value} type={type ?? 'text'} />
      <span className="input-text__alert">{error ?? ''}</span>
    </div>
  );
};

export default InputText;

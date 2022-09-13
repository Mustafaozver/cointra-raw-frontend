import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyPZButton, MyPZAlert, MyPZhelpers } from '@mypz/react-kit';

import './LoginPage.scss';

import InputText from '../../components/inputs/inputText/InputText';

import { emailLogin } from '../../api/auth/authApi';

import storageManager from '../../storage/storageManager';

const LoginPage = () => {
  const resetFormValue = {
    email: '',
    password: '',
  };
  const [formValues, setFormValues] = useState(resetFormValue);
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useNavigate();

  const handleOnSubmit = async () => {
    setIsFetching(true);
    try {
      const res = await emailLogin(formValues.email, formValues.password);
      if (res.user.type !== 'super-admin') {
        throw new Error('You are not an admin');
      }
      storageManager.login(res);
      history('/');
    } catch (error) {
      setErrorMessage(error.message);
    }
    setIsFetching(false);
  };

  const handleChangeInput = (key) => (e) => {
    setErrorMessage('');
    setFormValues({ ...formValues, [key]: e.target.value });
  };

  const isValidForm = () => MyPZhelpers.emailRegex.test(formValues.email) > 0 && formValues.password.length > 0;

  const renderAlert = () => {
    if (!errorMessage) {
      return null;
    }

    return (
      <MyPZAlert type="error">
        {errorMessage}
      </MyPZAlert>
    );
  };

  return (
    <div className="page-login">
      <div className="page-login__form">
        <form onSubmit={handleOnSubmit}>
          <h2>Admin - zeekeez</h2>
          {renderAlert()}
          <div className="page-login__form__input">
            <InputText
              label="Email"
              value={formValues.email}
              onChange={handleChangeInput('email')}
            />
          </div>
          <div className="page-login__form__input">
            <InputText
              label="Password"
              type="password"
              value={formValues.password}
              onChange={handleChangeInput('password')}
            />
          </div>
          <div className="page-login__form__input">
            <MyPZButton disabled={!isValidForm() || isFetching} onClick={handleOnSubmit} type="submit">Login</MyPZButton>
          </div>
        </form>
      </div>
    </div>
  )
};

export default LoginPage;

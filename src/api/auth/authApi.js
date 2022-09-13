import { post } from '../baseApi';

export const createUser = async (email, password) => {
  const res = await post('/auth/v1/public/users/create-user', {
    email,
    password,
  });
  return res;
};

export const emailLogin = async (email, password) => {
  const res = await post('/auth/v1/public/users/email-login', {
    email,
    password,
  });
  return res;
};

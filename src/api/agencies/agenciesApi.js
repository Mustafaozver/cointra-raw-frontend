import { post, get, put, deleteRequest } from '../baseApi';

export const createAgency = async (params) => {
  const res = await post('/agencies/v1/superAdmin/agencies', params);
  return res;
};

export const updateAgency = async (slug, params) => {
  const res = await put(`/agencies/v1/superAdmin/agencies/${slug}`, params);
  return res;
};

export const showAgency = async (slug) => {
  const res = await get(`/agencies/v1/superAdmin/agencies/agency/${slug}`);
  return res;
};

export const disableAgency = async (slug) => {
  const res = await deleteRequest(`/agencies/v1/superAdmin/agencies/${slug}/disable`);
  return res;
};

export const listAgencies = async (params) => {
  const res = await get(`/agencies/v1/public/agencies`, params);
  return res;
};

export const adminListAgencies = async (params) => {
  const res = await get(`/agencies/v1/superAdmin/agencies`, params);
  return res;
};

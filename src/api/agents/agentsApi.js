import {download, get, post, put} from '../baseApi';

export const listAgents = async (params) => {
  const res = await get(`/agents/v1/superAdmin/agents`, params);
  return res;
};

export const downloadAgentsListCSV = async () => {
  return download(`/agents/v1/superAdmin/agents/csv`);
};

export const showAgent = async (slug) => {
  const res = await get(`/agents/v1/superAdmin/agents/${slug}`, {});
  return res;
};

export const createAgent = async (params) => {
  const res = await post('/agents/v1/superAdmin/agents', params);
  return res;
};

export const updateAgent = async (slug, params) => {
  const res = await put(`/agents/v1/superAdmin/agents/${slug}`, params);
  return res;
};

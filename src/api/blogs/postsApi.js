import { post, get, put } from '../baseApi';

export const createPost = async (params) => {
  const res = await post('/blogs/v1/superAdmin/posts', params);
  return res;
};

export const updatePost = async (slug, params) => {
  const res = await put(`/blogs/v1/superAdmin/posts/${slug}`, params);
  return res;
};

export const showPost = async (slug) => {
  const res = await get(`/blogs/v1/superAdmin/posts/${slug}`);
  return res;
};

export const listPosts = async (params) => {
  const res = await get(`/blogs/v1/superAdmin/posts`, params);
  return res;
};

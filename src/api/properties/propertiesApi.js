import { get, post, put } from '../baseApi';

export const importPropertiesFromUrl = async (url, agencyId) => {
    const res = await post('/properties/v1/superAdmin/properties/import', { url: url, agencyId: agencyId });
    return res;
};

export const listProperties = async (params) => {
    const res = await get(`/properties/v1/superAdmin/properties`, params);
    return res;
};


export const showProperty = async (slug) => {
    const res = await get(`/properties/v1/superAdmin/properties/${slug}`, {});
    return res;
};

export const updateProperty = async (slug, params) => {
    const res = await put(`/properties/v1/superAdmin/properties/${slug}`, params);
    return res;
};

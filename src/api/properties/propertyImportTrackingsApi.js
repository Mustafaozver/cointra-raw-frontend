import { get } from '../baseApi';

export const getAllImportTrackings = async (page = 1) => {
    const res = await get('/properties/v1/superAdmin/importTrackings', { page });
    return res;
};

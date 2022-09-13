import { get } from '../baseApi';

export const getFeedbackCount = async (params) => {
    const res = await get('/feedback/v1/superAdmin/feedback/count', params);
    return res;
};

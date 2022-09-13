import { get } from '../baseApi';

export const getPropertyUserActionsCount = async (params) => {
    const res = await get('/properties/v1/superAdmin/propertyUserActionsRoutes/count', params);
    return res;
};

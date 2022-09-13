import { postFiles } from '../baseApi';

export const uploadImage = async (image, width = null, height = null) => {
    const body = {
        image,
        ...(width ? { w: width } : {}),
        ...(height ? { h: height } : {}),
    }
    const res = await postFiles('/content/v1/super-admin/images/upload', body);
    return res;
};

import myAxios from "../components/axios/axios";

export const getAllImagesOfService = async (serviceName) => {
    try {
        const res = await myAxios.get(`/api/images/service/${serviceName}`);
        return res.data.images;
    } catch (error) {
        console.log(error);
    }
}

export const getImageOfService = async (serviceName) => {
    try {
        const res = await myAxios.get(`/api/image/service/${serviceName}`);
        return res.data.image;
    } catch (error) {
        console.log(error);
    }
}
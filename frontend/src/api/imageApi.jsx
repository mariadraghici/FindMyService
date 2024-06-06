import myAxios from "../components/axios/axios";

export const getAllImagesOfService = async (serviceName) => {
    try {
        const res = await myAxios.get(`/api/images/service/${serviceName}`);
        return res.data.images;
    } catch (error) {
        console.log(error);
    }
}
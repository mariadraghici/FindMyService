import myAxios from "../components/axios/axios";

export const getAllServices = async () => {
    try {
        const response = await myAxios.get("/api/service/all");
        return response.data.services;
    } catch (error) {
        console.error(error);
        return [];
    }
};
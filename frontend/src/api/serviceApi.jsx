import myAxios from "../axios/axios";

export const getAllServices = async (page, limit) => {
    try {
        const response = await myAxios.get("/api/service/all",
            {
                params: {page, limit}
            }
        );
        return {data: response.data.services, totalPages: response.data.totalPages};
    } catch (error) {
        console.error(error);
        return [];
    }
};
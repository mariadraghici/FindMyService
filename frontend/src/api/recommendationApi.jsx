import myAxios from "../components/axios/axios";

export const getRecommendations = async (page, limit) => {
    try {
        const res = await myAxios.get("/api/recommendations/display", {
            params: { page, limit },
        });
        return { data: res.data.recommendations, totalPages: res.data.totalPages };
    } catch (error) {
        console.error(error);
    }
}

export const deleteRecommendation = async (id) => {
    try {
        const res = await myAxios.delete(`/api/recommendation/delete/${id}`);
        
        return res.data.message;
    } catch (error) {
        console.error(error);
    }
}

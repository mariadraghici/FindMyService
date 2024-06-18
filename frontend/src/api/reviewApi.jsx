import myAxios from "../axios/axios";

export const getReviewsForService = async ( page, limit, name) => {
    try {
        const res = await myAxios.get(`/api/getreviewsservice/${name}`, {
            params: {
                page,
                limit
            }
        });

        if (res.status === 200) {
            return {
                data: res.data.reviews,
                totalPages: res.data.totalPages
            }
        }
    } catch (error) {
        console.log(error);
    }
}
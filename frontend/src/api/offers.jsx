import myAxios from "../components/axios/axios";

export const resetNewOffers = async (userId) => {
    try {
        const res = await myAxios.put('/api/service/resetOffers', {userId: userId});

        if (res.status === 200) {
            return res.data.message;
        } else {
            return res.data.message;
        }
    } catch (error) {
        console.log(error);
    }
}
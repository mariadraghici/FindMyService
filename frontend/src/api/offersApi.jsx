import myAxios from "../axios/axios";

export const getAllOffers = async () => {
    try {
        const res = await myAxios.get("/api/offers/display");
        return res.data.offers;
    } catch (error) {
        console.error(error);
    }
}

export const deleteOffer = async (offerId) => {
    try {
        const res = await myAxios.delete(`/api/offers/delete/${offerId}`);
        return res;
    } catch (error) {
        console.error(error);
    }
}
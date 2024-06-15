import myAxios from "../components/axios/axios";

export const getAllAuctions = async (page, limit) => {
    try {
        const res = await myAxios.get("/api/auction/all", {
            params: { page, limit },
        });
        return { data: res.data.auctions, totalPages: res.data.totalPages };
    } catch (error) {
        console.error(error);
    }
}

export const getAuctionsForUser = async (page, limit) => {
    try {
        const res = await myAxios.get("/api/auction/user", {
            params: { page, limit },
        });

        return { data: res.data.auctions, totalPages: res.data.totalPages };
    } catch (error) {
        console.error(error);
    }
}
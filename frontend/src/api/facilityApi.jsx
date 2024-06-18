import myAxios from "../axios/axios";

export const getAllFacilities = async () => {
    try {
        const res = await myAxios.get('/api/facility/all');
        return res.data.facilities;
    } catch (error) {
        // console.log(error);
    }
}
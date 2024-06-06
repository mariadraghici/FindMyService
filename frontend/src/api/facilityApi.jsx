import myAxios from "../components/axios/axios";

export const getAllFacilities = async () => {
    try {
        const res = await myAxios.get('/api/facility/all');
        return res.data.facilities;
    } catch (error) {
        console.log(error);
    }
}
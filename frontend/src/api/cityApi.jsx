import myAxios from "../axios/axios";

export const getAllCities = async (setcities) => {
    try {
        const response = await myAxios.get("/api/city/all");
        return response.data.cities;
    } catch (error) {
        console.error(error);
    }
}
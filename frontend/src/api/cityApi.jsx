import myAxios from "../components/axios/axios";

export const getAllCities = async (setcities) => {
    try {
        const response = await myAxios.get("/api/city/all");
        // console.log(response.data.cities);
        return response.data.cities;
    } catch (error) {
        console.error(error);
    }
}
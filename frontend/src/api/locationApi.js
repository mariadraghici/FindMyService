import myAxios from "../components/axios/axios";

export const getAllLocations = async (setLocations) => {
    try {
        const response = await myAxios.get("/api/location/all");
        console.log(response.data.locations);
        return response.data.locations;
    } catch (error) {
        console.error(error);
    }
}
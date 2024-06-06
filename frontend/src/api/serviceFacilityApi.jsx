import myAxios from "../components/axios/axios";

export const getAllServiceFacilities = async () => {
    try {
        const response = await myAxios.get("/api/serviceFacility/:id");
        console.log(response.data.serviceFacilities);
        return response.data.serviceFacilities;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const createServiceFacility = async (serviceId) => {
    try {
        const response = await myAxios.post("/api/serviceFacility/create", serviceId);
        console.log(response.data.serviceFacility);
        return response.data.serviceFacility;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const deleteServiceFacility = async (serviceFacilityId) => {
    try {
        const response = await myAxios.delete(`/api/serviceFacility/delete/${serviceFacilityId}`);
        console.log(response.data.message);
        return response.data.message;
    } catch (error) {
        console.error(error);
        return null;
    }
}
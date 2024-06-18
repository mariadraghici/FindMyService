import myAxios from "../axios/axios";

export const getAllServiceFacilities = async () => {
    try {
        const response = await myAxios.get("/api/serviceFacility/:id");
        return response.data.serviceFacilities;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const createServiceFacility = async (serviceId) => {
    try {
        const response = await myAxios.post("/api/serviceFacility/create", serviceId);
        return response.data.serviceFacility;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const deleteServiceFacility = async (serviceFacilityId) => {
    try {
        const response = await myAxios.delete(`/api/serviceFacility/delete/${serviceFacilityId}`);
        return response.data.message;
    } catch (error) {
        console.error(error);
        return null;
    }
}
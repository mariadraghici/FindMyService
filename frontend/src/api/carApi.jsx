import myAxios from "../components/axios/axios";
import { toast } from "react-hot-toast";

export const addCarApi = async (formData, setFormData, brands, models) => {

    if (formData.name === "") {
        return toast.error("Please add car name");
    }

    if (formData.brand === "") {
        return toast.error("Please select a brand");
    }

    if (formData.model === "") {
        return toast.error("Please select a model");
    }

    if (formData.engine === "") {
        return toast.error("Please select an engine");
    }

    try {
        const sendFormData = {
        ...formData,
        brand: brands[formData.brand]._id,
        model: models[formData.model]._id,
        brandName: brands[formData.brand].name,
        modelName: models[formData.model].name,
        };
    
        const res = await myAxios.post("/api/car/add", sendFormData);
        
        if (res.data.success) {
            toast.success("Car added successfully!");
            setFormData({
                name: "",
                brand: "",
                model: "",
                engine: "",
                year: "",
                km: "",
                transmission: "",
                fuel: "",
                traction: "",
                description: "",
            });
        }
    } catch (error) {
        toast.error(error.response.data.error);
    }
};

export const deleteCarApi = async (car) => {
    try {
        const res = await myAxios.put(`/api/mycars/delete`, {id: car._id});

        if (!res.data.success) {
            toast.error("Error deleting car!");
            return;
        }

        toast.success("Car deleted successfully!");
       
    } catch (error) {
        toast.error("Error deleting car!");
    }
};

export const getMyCarsApi = async (page, limit) => {
    try {
        const res = await myAxios.get("/api/mycars", {
            params: { page, limit },
        });

        return { data: res.data.cars, totalPages: res.data.totalPages };
    } catch (error) {
        toast.error("Error getting cars!");
    }
};
import myAxios from '../axios/axios';
import { toast } from 'react-hot-toast';

export const getAllBrands = async () => {
    try {
        const res = await myAxios.get('/api/brand/all/');
        return res.data.brands;
    } catch (error) {
        toast.error(error.response.data.error);
    }
}
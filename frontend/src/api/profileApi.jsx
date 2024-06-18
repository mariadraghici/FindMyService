import myAxios from '../axios/axios';
import { toast } from 'react-hot-toast';

export const getProfile = async () => {
    try {
        const res = await myAxios.get('/api/profile');
        if (res.status === 200) {
            return res.data.user;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}
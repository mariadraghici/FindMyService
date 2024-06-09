import myAxios from '../components/axios/axios';
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

export const isAuth = async () => {
    try {
        const res = await myAxios.get('/api/isAuthenicated');
        if (res.status === 200) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}
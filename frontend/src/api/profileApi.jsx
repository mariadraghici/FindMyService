import myAxios from '../components/axios/axios';
import { toast } from 'react-hot-toast';

export const getProfile = async () => {
    try {
        const res = await myAxios.get('/api/profile');
        console.log(res); // this is the user object
        return res.data.user;
    } catch (error) {
        toast.error("Please sign in to access the page!");
    }
}
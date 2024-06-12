import React, {useState, useEffect} from 'react'
import UserSidebar from '../../../components/user/UserSidebar';
import { Container, Grid } from '@mui/material';
import './mycars.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import myAxios from '../../../components/axios/axios';
import { toast } from 'react-hot-toast';
import CarCard from '../../../components/user/myCars/CarCard';
import {useNavigate} from 'react-router-dom';
import ProfileContext from '../../../components/context/ProfileContext';
import { getProfile } from '../../../api/profileApi';
import ProfileLayout from '../../../components/user/profile/ProfileLayout';
import Button from '@mui/material/Button';

const MyCars = () => {

    const [page, setPage] = React.useState(1);
    const [cars, setCars] = useState([]);
    const [car, setCar] = useState({});
    const [carsNumber, setCarsNumber] = useState(0);
    const {user, setUser} = React.useContext(ProfileContext);
    const navigate = useNavigate();
    console.log('am in mycars');

  
    useEffect(() => {
      const fetchProfile = async () => {
        const user = await getProfile();
        if (user) {
          setUser(user);
        }
      }
  
      fetchProfile();
      if (!user) {
        navigate('/', {replace: true});
        return;
      }
    }, []);

    const deleteCar = async () => {
        try {
            const res = await myAxios.put(`/api/mycars/delete`, {id: car._id});

            if (!res.data.success) {
                toast.error("Error deleting car!");
                return;
            }
            toast.success("Car deleted successfully!");
            getMyCars();
            setPage(carsNumber);
        } catch (error) {
            console.log(error);
            toast.error("Error deleting car!");
        }
    };

    const getMyCars = async () => {
        try {
            const res = await myAxios.get("/api/mycars");
            setCars(res.data.cars);
            console.log(res.data.cars);
            setCarsNumber(res.data.cars.length);
            setCar(res.data.cars[0]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getMyCars();
    }, []);

    const handleChange = (event, value) => {
        setPage(value);
        setCar(cars[value-1]);
    };

  return (
    <ProfileLayout>
         <CarCard car={car} deleteCar={deleteCar}/>
         {carsNumber !== 0 && <Stack direction="row" justifyContent="space-between" alignItems="baseline" marginTop="2%">
                <Button size="small" variant='contained' onClick={deleteCar}>ȘTERGE</Button>
                <Pagination count={carsNumber} page={page} onChange={handleChange} />
            </Stack>}
    </ProfileLayout>
  )
}

export default MyCars;

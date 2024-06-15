import React, {useState, useEffect} from 'react'
import Typography from '@mui/material/Typography';
import './userCars.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import myAxios from '../../../components/axios/axios';
import { toast } from 'react-hot-toast';
import CarCard from '../../../components/user/userCars/CarCard';
import ProfileLayout from '../../../components/user/profile/ProfileLayout';
import Button from '@mui/material/Button';
import styled from '@mui/material/styles/styled';
import LazyLoadingPaginationComponent from '../../../components/utils/LazyLoadingPaginationComponent';
import { getMyCarsApi } from '../../../api/carApi';

const StyledPaginationItem = styled('div')(({ theme }) => ({
  '& .MuiPaginationItem-root': {
    color: 'black',  // Change this to your desired color
  },
  '& .MuiPaginationItem-page.Mui-selected': {
    backgroundColor: '#e60049',  // Change this to your desired background color for selected items
    color: 'white',  // Change this to your desired color for selected items
  },
}));

const UserCars = () => {
    const [refresh, setRefresh] = useState(false);

  return (
    <ProfileLayout withCard={true}>
            <LazyLoadingPaginationComponent
                dataType='cars'
                title='Masini'
                apiFunction={getMyCarsApi}
                limit={1}
                refresh={refresh}
                setRefresh={setRefresh}
            />
    </ProfileLayout>
  )
}

export default UserCars;

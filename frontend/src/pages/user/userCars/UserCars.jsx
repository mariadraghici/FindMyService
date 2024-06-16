import React, {useState} from 'react'
import './userCars.css';
import ProfileLayout from '../../../components/user/profile/ProfileLayout';
import LazyLoadingPaginationComponent from '../../../components/utils/LazyLoadingPaginationComponent';
import { getMyCarsApi } from '../../../api/carApi';

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

import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import PostCard from '../posts/PostCard';
import ServiceCard from '../service/ServiceCard';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import CarCard from '../user/userCars/CarCard';
import styled from '@mui/material/styles/styled';

const StyledPaginationItem = styled('div')(({ theme }) => ({
    '& .MuiPaginationItem-root': {
      color: 'black',
    },
    '& .MuiPaginationItem-page.Mui-selected': {
      backgroundColor: '#e60049',
      color: 'white',
    },
  }));


const LazyLoadingPaginationComponent = ({ dataType, title, apiFunction, limit, refresh, setRefresh }) => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [shouldFetch, setShouldFetch] = useState(false);

    const handlePageChange = (event, value) => {
        setPage(value);
        setShouldFetch(true);
    }

    useEffect(() => {
        setPage(1);
        setShouldFetch(true);
        console.log('refreshed');
    }, [refresh]);

    useEffect(() => {
        if (shouldFetch) {
            fetchData();
            setShouldFetch(false);
        }
    }, [page, shouldFetch]);

    const fetchData = async () => {
        try {
            const res = await apiFunction(page, limit);

            console.log(res.data);
            setData(res.data);
            setTotalPages(res.totalPages);
        } catch (error) {
            console.error('Error fetching posts', error);
        }
    }

    const renderCard = (item) => {
        if (dataType === 'auctions') {
            return <PostCard auction={item} refresh={refresh} setRefresh={setRefresh}/>;
        } else if (dataType === 'services') {
            return <ServiceCard service={item} />;
        } else if (dataType === 'cars') {
            return <CarCard car={item} refresh={refresh} setRefresh={setRefresh}/>;
        }
        return null;
    };

    return (
        <div style={{width: '100%'}}>
            {data.length === 0 && <Typography variant="h6" color={dataType === 'cars' ? 'black' : 'white'}>Nu s-au gasit {title.toLowerCase()}!</Typography>}
            {data.map(item => (
                <div key={item._id} style={{ width: '100%' }}>
                    {renderCard(item)}
                </div>
            ))}
            {data.length !== 0 &&
            <Stack direction='row' justifyContent='center'>
                {dataType === 'cars' && <StyledPaginationItem>
                    <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" size="large" style={{marginTop: '2%'}}/>
                </StyledPaginationItem>}

                {dataType !== 'cars' && <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" size="large" style={{marginTop: '2%'}}/>}
            </Stack>}
        </div>
    );
}

export default LazyLoadingPaginationComponent;
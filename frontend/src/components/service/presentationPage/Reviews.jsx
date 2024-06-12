import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import { Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import ReviewCard from './ReviewCard';
import useMediaQuery from '@mui/material/useMediaQuery';

const Reviews = ({ serviceReviews }) => {
    const [page, setPage] = useState(1);
    const [pageNo, setPageNo] = useState(0);
    const isSmallScreen = useMediaQuery('(max-width:1000px)');

    const handleChange = (event, value) => {
        setPage(value);
    }

    useEffect(() => {
        setPageNo(Math.ceil(serviceReviews.length / 2));
    }, [serviceReviews]);

    return (
        <Stack direction='column' spacing={3}>
            <Typography variant="h5" component="div" color='primary'>
                    Recenzii
            </Typography>
            {serviceReviews.length !== 0 &&
            <Stack direction={isSmallScreen ? 'column' : 'row'} justifyContent='space-between' spacing={5} alignItems={'stretch'}>
                {page - 1 >= 0 && <ReviewCard review={serviceReviews[page - 1]}/>}
                {page <= pageNo && <ReviewCard review={serviceReviews[page]} />}
            </Stack>
            }
            {serviceReviews.length !== 0 &&
            <Grid item xs={12}>
            <Grid container justifyContent="center" sx={{  marginTop: '10%' }}>
                <Pagination count={pageNo} page={page} onChange={handleChange}
                sx={{
                    '& .MuiPaginationItem-root': {
                    color: 'white', // Change the color of the numbers to white
                    },
                    '& .Mui-selected': {
                    backgroundColor: 'primary.main', // Ensure selected item has appropriate contrast
                    color: 'white', // Selected item color
                    },
                    '& .MuiPaginationItem-root.Mui-selected': {
                    backgroundColor: 'primary.main', // Selected item background color
                    },
                }}
                variant='outlined'
                />
            </Grid>
             </Grid>}

            {serviceReviews.length === 0 && 
            <Typography gutterBottom variant="h6" component="div" color='cream.primary'>
                Acest serviciu nu are recenzii încă.
            </Typography>}
        </Stack>
    );
};

export default Reviews;

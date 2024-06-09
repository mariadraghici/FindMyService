import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import ReviewCard from '../../../components/ReviewCard';

const Reviews = ({ serviceReviews }) => {
    const [page, setPage] = useState(1);
    const [pageNo, setPageNo] = useState(serviceReviews.length / 2 + 1);

    const handleChange = (event, value) => {
        setPage(value);
    }
    return (
        <Grid sx={{marginTop: '5%', marginBottom: '10%'}}>
            <Typography variant="h5" component="div" color='primary'>
                Recenzii
            </Typography>
            
            {serviceReviews.map(review => {
                return (
                    <div key={review._id}>
                        <ReviewCard review={review} />
                    </div>
                )
            })}
            
            {serviceReviews.length !== 0 && <Stack direction='column' justifyContent='center' alignItems='center' sx={{marginTop: '2%'}}>
                <Stack direction='row' spacing={2}>
                    <ReviewCard review={serviceReviews[page]} />
                    <ReviewCard review={serviceReviews[page + 1]} />
                </Stack>
            <Pagination count={pageNo} page={page} onChange={handleChange} />
            </Stack>}

            {serviceReviews.length === 0 && 
            <Typography gutterBottom variant="h6" component="div" color='cream.primary'>
                Acest serviciu nu are recenzii încă.
            </Typography>}
        </Grid>
    );
};

export default Reviews;

import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import {getReviewsForService} from '../../../api/reviewApi';
import LazyLoadingPaginationComponent from '../../utils/LazyLoadingPaginationComponent';

const Reviews = ({ service, setRefreshReviews, refreshReviews }) => {
    const isSmallScreen = useMediaQuery('(max-width:1000px)');
    if (!service) {
        return null;
    }

    return (
        <Stack direction='column' spacing={3} width={isSmallScreen ? '100%' : '30%'}>
            <Typography variant="h5" component="div" color='primary'>
                    Recenzii
            </Typography>
            <LazyLoadingPaginationComponent
                title="Recenzii"
                apiFunction={getReviewsForService}
                dataType="reviews"
                records="recenzii"
                limit={1}
                service={service}
                refresh={refreshReviews}
                setRefresh={setRefreshReviews}
            />
        </Stack>
    );
};

export default Reviews;

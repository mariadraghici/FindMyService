import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";

const ReviewCard = ({review}) => {

    return (
        <>
            <Stack spacing={2} sx={{paddingTop: '5%'}}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">{review.userFrom.name}
                    </Typography>
                    <Typography variant="h8">{new Date(review.createdAt).toLocaleDateString()}</Typography>
                </Stack>
                <Rating name="read-only"  value={review.rating} readOnly/>
                    <Typography variant="h8" sx={{color: '#A020F0', fontWeight: 'bold'}}>{review.title}</Typography>
                    <Typography variant="body1">"{review.reviewText}"</Typography>
                    <Typography variant="h8">{review.carName}</Typography>
                    <Typography variant="body1">
                        {review.modelName} {review.brandName} {review.engine}
                    </Typography>
            </Stack>
        </>
    )
}

export default ReviewCard;
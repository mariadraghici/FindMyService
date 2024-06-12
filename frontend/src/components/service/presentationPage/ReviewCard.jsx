import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import './reviewCard.css'
import Card from '@mui/material/Card';

const ReviewCard = ({review}) => {

    if (!review) {
        return null;
    }

    console.log(review);

    return (
       <Card className="review-card">
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">{review.userFrom.name}
                </Typography>
                <Typography variant="h8">{new Date(review.createdAt).toLocaleDateString()}</Typography>
            </Stack>
            <Stack direction="column" spacing={1}>
                <Rating name="read-only"  value={review.rating} readOnly/>
                <Typography variant="h8" color='primary' fontWeight='bold'>{review.title}</Typography>
                <Typography variant="body1">"{review.reviewText}"</Typography>
                <Typography variant="h8" color='primary' fontWeight='bold'>{review.car?.name}</Typography>
                <Typography variant="h8">{review.brandName}</Typography>
                <Typography variant="h8">{review.modelName}</Typography>
                <Typography variant="h8">{review.engine}</Typography>
            </Stack>
        </Card>
    )
}

export default ReviewCard;
import { Button, CardActions, CardContent, Typography } from "@mui/material";
import CardLayout from "../../utils/CardLayout";
import './recommendationCard.css'
import { deleteRecommendation } from "../../../api/recommendationApi";
import { toast } from "react-hot-toast";

const textStyle = {
    wordWrap: 'break-word',
    wordBreak: 'break-all',
};

const RecommendationCard = ({ recommendation, setRefresh }) => {

    if (!recommendation) {
        return null;
    }

    const handleDeleteRecommendation = async () => {
        try {
            const message = await deleteRecommendation(recommendation._id);
            toast.success(message);
            setRefresh((prev) => !prev);
        } catch (error) {
            console.error(error);
            toast.error("Could not delete recommendation");
        }
    }
    
    return (
        <CardLayout additionalClasses='recommendation-card'>
            <CardContent>
                <Typography variant="h6" gutterBottom style={textStyle}>
                    {recommendation.userFrom.email}
                </Typography>
                <Typography variant="body2" gutterBottom style={textStyle}>
                    {recommendation.serviceEmail}
                </Typography>
                <Typography variant="body2" gutterBottom style={textStyle}>
                    {recommendation.phone}
                </Typography>
                <Typography variant="body2" gutterBottom style={textStyle}>
                    {recommendation.content}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" variant="contained" onClick={handleDeleteRecommendation}>
                    Sterge
                </Button>
            </CardActions>
        </CardLayout>
    );
}

export default RecommendationCard;
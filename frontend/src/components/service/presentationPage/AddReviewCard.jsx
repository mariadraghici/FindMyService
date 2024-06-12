import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './addReviewCard.css';
import Rating from '@mui/material/Rating';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

const AddReviewCard = ({handleReviewTitle, handleTextChange, user,
    addReview, selectedCar, userCars, handleSelectReviewCar, rating, reviewTitle, reviewText, setRating}) => {

        return (
        <Card className='add-review-card'>
            <Stack direction='row' justifyContent='center'>
                <Typography variant="h6" component="div" color='primary'>
                    Adauga o recenzie
                </Typography>
            </Stack>
            <Divider/>
            <CardContent>
                <Stack spacing={2}>
                    <Typography gutterBottom variant="h7" component="div">
                        Selecteaza masina cu care ai fost la service
                    </Typography>
                    <Autocomplete
                        size='small'
                        value={selectedCar ? selectedCar.name : ''}
                        id="combo-box-transmission"
                        options={userCars.map(car => car.name)}
                        renderInput={(params) => <TextField {...params} label="Selectați masina"/>}
                        isOptionEqualToValue={(option, value) => option === value || value === ''}
                        onChange={handleSelectReviewCar}
                    />
                        <Typography gutterBottom variant="h7" component="div">
                            Titlu
                        </Typography>
                        <TextField size='large' onChange={handleReviewTitle} type="text" name="name"
                            value={reviewTitle} fullWidth label='Scrie un titlu'/>
                        <Typography gutterBottom variant="h7" component="div">
                            Recenzie
                        </Typography>
                        <TextField size='large' onChange={handleTextChange} type="text" name="name"
                            value={reviewText} fullWidth label='Scrie un comentariu'/>
                        <Typography variant="h7" component="div">
                            Rating
                        </Typography>
                        <Rating
                            name="simple-controlled"
                            value={rating}
                            onChange={(event, newValue) => {
                                setRating(newValue);
                            }}
                        />
                        <Button variant='contained' onClick={addReview} disabled={user?.role === 2}>Trimite</Button>

                    </Stack>
                </CardContent>
            </Card>
    );
}

export default AddReviewCard;
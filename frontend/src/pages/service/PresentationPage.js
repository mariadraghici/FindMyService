import React, { useContext, useEffect, useState } from "react";
import Container from '@mui/material/Container';
import myAxios from "../../components/axios/axios";
import { useParams} from 'react-router-dom';
import { Divider, Grid } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import {Autocomplete} from "@mui/material";
import { toast } from "react-toastify";
import ProfileContext from "../../components/context/ProfileContext";
import ReviewCard from "../../components/ReviewCard";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import {Icon} from "leaflet";
import 'leaflet/dist/leaflet.css';

const PresentationPage = () => {
    const locationIcon = new Icon({
        iconUrl: require("../../img/pin.png"),
        iconSize: [30, 30],
    })
    const [service, setService] = useState('');
    const params = useParams();
    const URLserviceName = params.name;
    const [writeReview, setWriteReview] = useState(false);
    const [reviewText, setReviewText] = useState('');
    // const [priceRating, setPriceRating] = useState(0);
    // const [facilitiesRating, setFacilitiesRating] = useState(0);
    // const [promptitudeRating, setPromptitudeRating] = useState(0);
    const [reviewTitle, setReviewTitle] = useState('');
    const {user} = useContext(ProfileContext);
    const [selectedCar, setSelectedCar] = useState('');
    const [userCars, setUserCars] = useState([]);
    const [serviceReviews, setServiceReviews] = useState([]);
    const [sendReview, setSendReview] = useState(0);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        const getServiceByName = async () => {
            try {
                const res = await myAxios.get(`/api/service/page/${URLserviceName}`);
                setService(res.data.service);
                // console.log(res.data.service);
            } catch (error) {
                console.log(error);
            }
        }
        getServiceByName();
    }, [URLserviceName]);

    useEffect(() => {
        if (user.role !== 2) {
            const getUserCars = async() => {
                try {
                    const res = await myAxios.get('/api/getUserCars');
                    setUserCars(res.data.cars);
                } catch (error) {
                    console.log(error);
                }
            }

            getUserCars();
        }

        const getServiceReviews = async() => {
            try {
                const res = await myAxios.get(`/api/service/reviews/${URLserviceName}`);
                setServiceReviews(res.data.reviews);
                console.log(res.data.reviews);
            } catch (error) {
                console.log(error);
            }
        }

        getServiceReviews();
    }, [sendReview, URLserviceName, user.role]);


    const addReview = async () => {

        if (!selectedCar) {
            toast.error('Selecteaza masina cu care ai fost la service!');
            return;
        }

        try {
            const reviewData = {
                userTo: service._id,
                userFrom: user._id,
                rating: rating,
                car: selectedCar._id,
                // priceRating: priceRating,
                // facilitiesRating: facilitiesRating,
                // promptitudeRating: promptitudeRating,
                reviewText: reviewText,
                model: selectedCar.model,
                modelName: selectedCar.modelName,
                brand: selectedCar.brand,
                brandName: selectedCar.brandName,
                engine: selectedCar.engine,
                title: reviewTitle
            }
            
            console.log(reviewData);
            const res = await myAxios.post('api/feedback/create', reviewData);
            console.log(res.data);

            if (res.data.success) {
                toast.success('Recenzia a fost adaugata cu succes!');
                setReviewText('');
                // setPriceRating(0);
                // setFacilitiesRating(0);
                // setPromptitudeRating(0);
                setSelectedCar('');
                setReviewTitle('');
                setRating(0);
                setSendReview(sendReview + 1);
            }
        } catch (error) {
            toast.error(error.response.data.error)
        }
    }

    
    const handleChange = (e) => {
        setReviewText(e.target.value);
    }

    const handleReviewTitle = (e) => {
        setReviewTitle(e.target.value);
    }

    // const handlePriceRating = (e) => {
    //     setPriceRating(e.target.value);
    // }

    // const handleFacilitiesRating = (e) => {
    //     setFacilitiesRating(e.target.value);
    // }

    // const handlePromptitudeRating = (e) => {
    //     setPromptitudeRating(e.target.value);
    // }

    const handleRating = (e) => {
        setRating(e.target.value);
    }

    const { name, description, address, phone, email} = service;

    return (
        <Container>
            <Grid container spacing={2} sx={{marginTop: '3%'}}>
                <Grid item xs={7}>
                    <Card sx={{padding: '3%', borderRadius: '7px'}}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {name}
                            </Typography>
                            <Typography gutterBottom variant="h8" component="div">
                                {address}
                            </Typography>
                            <Typography gutterBottom variant="h8" component="div">
                                {phone}
                            </Typography>
                            <Typography gutterBottom variant="h8" component="div">
                                {email}
                            </Typography>
                            <Typography gutterBottom variant="h8" component="div">
                                {description}
                            </Typography>   
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={5}>
                    <Card sx={{padding: '3%', borderRadius: '7px'}}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Harta cu adresa
                            </Typography>
                            <MapContainer center={[44.46670407167756, 26.08648771392779]} zoom={13} scrollWheelZoom={false}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[44.46670407167756, 26.08648771392779]} icon={locationIcon}>
                                    <Popup>
                                    A pretty CSS3 popup. <br /> Easily customizable.
                                    </Popup>
                                </Marker>
                            </MapContainer>
                            <Divider sx={{opacity: 1}} />
                            <Typography gutterBottom variant="h5" component="div">
                                Program
                            </Typography>
                            <Divider sx={{opacity: 1}} />
                            <Typography gutterBottom variant="h5" component="div">
                                Cere oferta
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {user.role !== 2 && <Button onClick={() => setWriteReview(true)} >Scrie recenzie</Button>}
            {writeReview && <Card sx={{padding: '3%', borderRadius: '7px'}}>
                <CardContent>
                    <Stack spacing={2}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography gutterBottom variant="h6" component="div">
                            Selecteaza masina cu care ai fost la service
                        </Typography>
                        <Button onClick={() =>
                            {setWriteReview(false);
                            setReviewText('');
                            // setPriceRating(0);
                            // setFacilitiesRating(0);
                            // setPromptitudeRating(0);
                            setReviewTitle('');
                            setRating(0);
                            setSelectedCar('')
                        }}>Anuleaza</Button>
                        </Stack>
                        <Autocomplete
                            size='small'
                            value={selectedCar ? selectedCar.name : ''}
                            id="combo-box-transmission"
                            options={userCars.map(car => car.name)}
                            renderInput={(params) => <TextField {...params} label="Selectați masina"/>}
                            isOptionEqualToValue={(option, value) => option === value || value === ''}
                            onChange={(event, newValue) => {
                                setSelectedCar(userCars.filter(car => car.name === newValue)[0]);
                            }}
                            />
                        <Typography gutterBottom variant="h6" component="div">
                            Titlu
                        </Typography>
                        <TextField size='large' onChange={handleReviewTitle} type="text" name="name"
                            value={reviewTitle} fullWidth label='Scrie un titlu'/>
                        <Typography gutterBottom variant="h6" component="div">
                            Recenzie
                        </Typography>
                        <TextField size='large' onChange={handleChange} type="text" name="name"
                            value={reviewText} fullWidth label='Scrie un comentariu'/>
                        <Typography variant="h6" component="div">
                            Rating
                        </Typography>
                        <Rating
                            name="simple-controlled"
                            value={rating}
                            onChange={handleRating}
                        />
                        {/* <Typography variant="h8" component="div">
                            Servicii Oferite
                        </Typography>
                        <Rating
                            name="simple-controlled"
                            value={facilitiesRating}
                            onChange={handleFacilitiesRating}
                        />

                        <Typography variant="h8" component="div">
                            Pret
                        </Typography>
                        <Rating
                            name="simple-controlled"
                            value={priceRating}
                            onChange={handlePriceRating}
                        />

                        <Typography variant="h8" component="div">
                            Promptitudine
                        </Typography>
                        <Rating
                            name="simple-controlled"
                            value={promptitudeRating}
                            onChange={handlePromptitudeRating}
                        /> */}
                        <Button onClick={addReview}>Trimite</Button>

                    </Stack>
                </CardContent>
            </Card>}
            <Card sx={{padding: '3%', borderRadius: '7px'}}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Recenzii
                    </Typography>
                    <Divider sx={{opacity: 1}} />
                    {serviceReviews.map(review => {
                        return (
                            <div key={review._id}>
                            <ReviewCard review={review} />
                            </div>
                        )
                    })}
                </CardContent>
            </Card>
        </Container>
    )
}

export default PresentationPage;
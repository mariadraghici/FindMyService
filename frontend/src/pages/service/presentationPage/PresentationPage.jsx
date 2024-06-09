import React, { useContext, useEffect, useState } from "react";
import Container from '@mui/material/Container';
import myAxios from "../../../components/axios/axios";
import { useParams} from 'react-router-dom';
import { Box, CardHeader, Divider, Grid } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Pagination from '@mui/material/Pagination';
import {Autocomplete, Popper, Paper} from "@mui/material";
import toast from 'react-hot-toast';
import ProfileContext from "../../../components/context/ProfileContext";
import ReviewCard from "../../../components/ReviewCard";
import 'leaflet/dist/leaflet.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { getAllImagesOfService } from "../../../api/imageApi";
import { getProfile } from "../../../api/profileApi";
import { getAllFacilities } from "../../../api/facilityApi";
import { useNavigate } from "react-router-dom";
import LeafletMap from "../../../components/LeafletMap";
import MyTextField from "../../../components/utils/MyTextField";
import StyledPopper from "../../../components/utils/StyledPopper";
import SocketContext from "../../../components/context/SocketContext";
import './presentation-page.css';
import AboutService from "./AboutService";
import FacilityTypography from "./FacilityTypography";
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';
import ImageCarousel from "./ImageCarousel";
import Reviews from "./Reviews";

const convertNewlinesToBreaks = (text) => {
    if (!text) {
        return (
            <React.Fragment>
                <br />
            </React.Fragment>
        )
    }
    return text.split('\n').map((item, index) => {
        return (
            <React.Fragment key={index}>
                {item}
                <br />
            </React.Fragment>
        );
    });
};
const PresentationPage = () => {
    const [service, setService] = useState('');
    const params = useParams();
    const URLserviceName = params.name;
    const [writeReview, setWriteReview] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [reviewTitle, setReviewTitle] = useState('');
    const {user, setUser} = useContext(ProfileContext);
    const [selectedCar, setSelectedCar] = useState('');
    const [userCars, setUserCars] = useState([]);
    const [serviceReviews, setServiceReviews] = useState([]);
    const [sendReview, setSendReview] = useState(0);
    const [rating, setRating] = useState(0);
    const [file, setFile] = useState(null);
    const [images, setImages] = useState([]);
    const [editButton, setEditButton] = useState(false);
    const [page, setPage] = React.useState(1);
    const [imageUrl, setImageUrl] = useState(images[0]);
    const [textFieldDescription, setTextFieldDescription] = useState('');
    const [textModified, setTextModified] = useState(0);
    const [editFacility, setEditFacility] = useState(false);
    const [allFacilities, setAllFacilities] = useState([]);
    const [selectedFacilityToAdd, setSelectedFacilityToAdd] = useState('');
    const [priceLow, setPriceLow] = useState(0);
    const [priceHigh, setPriceHigh] = useState(0);
    const [onOwnPage, setOnOwnPage] = useState(false);
    const navigate = useNavigate();
    const [schedule, setSchedule] = useState('');
    const [scheduleEditButton, setScheduleEditButton] = useState(false);
    const [offerText, setOfferText] = useState('');
    const [emailOffer, setEmailOffer] = useState('');
    const [phoneOffer, setPhoneOffer] = useState('');
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [location, setLocation] = useState('');
    const socket = useContext(SocketContext);
    const [serviceSocket, setServiceSocket] = useState(0);

    const handleChangePage = (event, value) => {
        setPage(value);
        setImageUrl(images[value - 1]);
    };

    // useEffect(() => {
    //     console.log(images);
    // }, [images]);

    useEffect(() => {
        const fetchProfile = async () => {
            const user = await getProfile();
            if (user) {
              setUser(user);
            } else {
                navigate('/signin', {replace: true});
                return;
            }
          }
      
        fetchProfile();

        const getServiceByName = async () => {
            try {
                const res = await myAxios.get(`/api/service/page/${URLserviceName}`);
                
                setService(res.data.service);
                setTextFieldDescription(res.data.service.description);
                setSchedule(res.data.service.schedule);
                setLat(res.data.service.address.lat);
                setLng(res.data.service.address.lng);
                setLocation(res.data.service.address.address);
                setServiceSocket(res.data.service.socketNumber);
                const imagesService = await getAllImagesOfService(res.data.service.name);
                setImages(imagesService);
            } catch (error) {
                console.log(error);
            }
        }
        getServiceByName();
    }, [URLserviceName, textModified]);

    useEffect(() => {
        if (user.role === 2 && service.name === user.name) {
            setOnOwnPage(true);
        }
    }, [user.role, service.name, user.name]);


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

        if (onOwnPage) {
            const getFacilities = async() => {
                try {
                    const res = await getAllFacilities();
                    setAllFacilities(res);
                } catch (error) {
                    console.log(error);
                }
            }

            getFacilities();
        }
        const getServiceReviews = async() => {
            try {
                const res = await myAxios.get(`/api/service/reviews/${URLserviceName}`);
                setServiceReviews(res.data.reviews);
            } catch (error) {
                console.log(error);
            }
        }
        
        getServiceReviews();
    }, [sendReview, URLserviceName, user.role, onOwnPage]);


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
                reviewText: reviewText,
                model: selectedCar.model,
                modelName: selectedCar.modelName,
                brand: selectedCar.brand,
                brandName: selectedCar.brandName,
                engine: selectedCar.engine,
                title: reviewTitle
            }
            
            const res = await myAxios.post('api/feedback/create', reviewData);

            if (res.data.success) {
                toast.success('Recenzia a fost adaugata cu succes!');

                setReviewText('');
                setSelectedCar('');
                setReviewTitle('');
                setRating(0);
                setSendReview(sendReview + 1);
            }
        } catch (error) {
            console.log(error);
        }
    }

    
    const handleChange = (e) => {
        setReviewText(e.target.value);
    }

    const handleReviewTitle = (e) => {
        setReviewTitle(e.target.value);
    }

    const handleRating = (e) => {
        setRating(e.target.value);
    }

    const handleDoneEditing = async () => {
        setEditButton(false);
        try {
            const res = await myAxios.put(`/api/service/edit/${service._id}`, {description: textFieldDescription});
            if (res.data.success) {
                toast.success('Modificările au fost salvate!');
            }
        } catch (error) {
            console.log(error);
        }

        // refresh the page
        setTextModified(textModified + 1);
    }

    const handleScheduleEditing = async () => {
        try {
            const res = await myAxios.put(`/api/service/schedule/${service._id}`, {schedule: schedule});
            if (res.data.success) {
                toast.success('Modificările au fost salvate!');
                setTextModified(textModified + 1);
                setScheduleEditButton(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleAddFacility = async () => {
        if (!selectedFacilityToAdd) {
            toast.error('Selectează un serviciu!');
            return;
        }

        try {
            const res = await myAxios.post('/api/serviceFacility/create',
            {
                serviceId: user._id,
                name: selectedFacilityToAdd,
                priceLow: priceLow,
                priceHigh: priceHigh,
                facilityId: allFacilities.filter(facility => facility.name === selectedFacilityToAdd)[0]._id
            }
        );
            if (res.data.success) {
                toast.success('Serviciul a fost adaugat cu succes!');
                setSelectedFacilityToAdd('');
                setPriceLow(0);
                setPriceHigh(0);
                setTextModified(textModified + 1);
            }
        } catch (error) {
            console.log(error);
            toast.error('Serviciul nu a putut fi adaugat!');
        }
    }

    const handleDeleteFacility = async (id) => {
        try {
            const res = await myAxios.delete(`/api/serviceFacility/delete/${id}`);
            if (res.data.success) {
                toast.success('Serviciul a fost sters cu succes!');
                setTextModified(textModified + 1);
            }
        } catch (error) {
            console.log(error);
            toast.error('Serviciul nu a putut fi sters!');
        }
    }


    const handleOfferRequest = async () => {
        if (!emailOffer) {
            toast.error('Introdu email-ul!');
            return;
        }

        if (!offerText) {
            toast.error('Introdu un mesaj!');
            return;
        }

        try {
            const res = await myAxios.post('/api/offer/create', {
                email: emailOffer,
                phone: phoneOffer,
                text: offerText,
                userTo: service._id,
                userFrom: user._id
            });

            if (res.data.success) {
                console.log(res.data);
                socket.emit('join-room', serviceSocket)
                console.log('I joined the room', serviceSocket);
                socket.emit('offer-request', {message: res.data.offer._id, room: serviceSocket})
                console.log('I sent the message');
                toast.success('Cererea a fost trimisa cu succes!');
                setEmailOffer('');
                setPhoneOffer('');
                setOfferText('');
            }
        } catch (error) {
            console.log(error);
            toast.error('Cererea nu a putut fi trimisa!');
        }
    }   

    const { name, description, phone, email, facilities} = service;

    return (
        <Container maxWidth={false} sx={{padding: "0 !Important"}}>
            <Box className='grey-box'>
                <Container sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <ImageCarousel images={images} user={user} file={file} setFile={setFile} onOwnPage={onOwnPage}
                    setTextModified={setTextModified} textModified={textModified}/>
                    <AboutService service={service} location={location}
                    schedule={schedule}
                    scheduleEditButton={scheduleEditButton} onOwnPage={onOwnPage}
                    setScheduleEditButton={setScheduleEditButton} setSchedule={setSchedule}
                    file={file} user={user} setFile={setFile}
                    handleScheduleEditing={handleScheduleEditing}/>
                </Container>
            </Box>
                <Container sx={{display:'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '2%' }}>
                    <Stack spacing={2} direction="row" justifyContent="space-between">
                    <Typography variant="h5" component="div" sx={{color: 'white'}}>
                        Despre noi
                    </Typography>
                    {editButton === false && onOwnPage && <Button onClick={() => setEditButton(true)}>Editează</Button>}
                    </Stack>
                    {editButton === false &&
                    <Typography gutterBottom variant="h8" component="div" sx={{color: 'white', fontWeight: 'light'}}>
                    {description ? convertNewlinesToBreaks(description) : 'Nicio descriere disponibila!'}
                    </Typography>}
                    {editButton === true && onOwnPage &&
                        <TextField size='medium' variant="filled" onChange={(e) => setTextFieldDescription(e.target.value)} type="text" name="name"
                        value={textFieldDescription} InputProps={{
                            style: { color: 'white' }
                          }} fullWidth label='Descriere' multiline/>}
                    {editButton === true && onOwnPage && <Button onClick={handleDoneEditing} >Gata</Button>}
                    <Divider sx={{opacity: 1, backgroundColor: '#e60049', marginTop: '2%'}} />
                    <Stack spacing={2} direction="row" justifyContent="space-between" sx={{marginTop: '2%'}}>
                    <Typography variant="h5" component="div" sx={{color: 'white', marginTop: '2%'}}>
                        Servicii
                    </Typography>
                    {editFacility === false && onOwnPage && <Button onClick={() => setEditFacility(true)}>Editează</Button>}
                    </Stack>

                    {editFacility === true &&
                    <Card className="add-facility-card">
                        <CardContent sx={{ display:'flex', flexDirection: 'column'}}>
                            <Typography variant="h5" component="div" sx={{marginTop: '2%', alignSelf: 'center'}}>
                                Adaugă serviciu nou *
                            </Typography>
                            <Divider sx={{opacity: 1}} />
                            <Autocomplete 
                                size='small'
                                options={allFacilities.map(facility => facility.name)}
                                renderInput={(params) => <TextField {...params} label="Selectează serviciul" InputLabelProps={{
                                    style: { color: '#8E8E8E' },
                                }}/>}
                                value={selectedFacilityToAdd}
                                onChange={(event, newValue) => {
                                    setSelectedFacilityToAdd(newValue);
                                }}
                                getOptionLabel={(option) => option || ''}
                                isOptionEqualToValue={(option, value) => option === value || value === ""}
                                
                            />
                            <FacilityTypography text="Preț pornire (RON)"/>
                            <TextField size='small' type="number" name="priceLow" fullWidth
                            value={priceLow}
                            onChange={(event) => {
                              setPriceLow(event.target.value);
                            }}/>
                            <FacilityTypography text="Preț maxim (RON)"/>
                            <TextField size='small' type="number" name="priceHigh" fullWidth
                            value={priceHigh}
                            onChange={(event) => {
                              setPriceHigh(event.target.value);
                            }}/>
                            <Button onClick={handleAddFacility} sx={{marginTop: '2%', alignSelf: 'center !important'}}>Adaugă</Button>
                        </CardContent>
                    </Card>}

                    {facilities && facilities.length !== 0 &&
                    <Card className="facility-card">
                     {facilities.map(facility => {
                        return (                           
                                <Box key={facility._id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                                    <Typography gutterBottom variant="h8" component="div" sx={{color: 'white', fontWeight: 'light', width: '40%'}}>
                                        {facility.name}
                                    </Typography>
                                    <Typography gutterBottom variant="h8" component="div" sx={{color: 'white', fontWeight: 'light', width: '40%'}}>
                                        {facility.priceLow === 0 ? '' : facility.priceLow} - {facility.priceHigh === 0 ? '' : facility.priceHigh} RON
                                    </Typography>
                                    {onOwnPage && editFacility && <Button sx={{fontWeight: 'regular', color: '#fff'}} onClick={() =>
                                        {handleDeleteFacility(facility._id);}
                                    }>Șterge</Button>}
                                </Box>
                        )
                    })}
                    
                    {editFacility === true && onOwnPage === true && <Button variant='contained' color='primary' sx={{marginTop: '5%'}}
                    onClick={() => setEditFacility(false)}>Gata</Button>}
                    </Card>}
                    <Card sx={{marginTop: '5%', backgroundColor: '#EEEEEE'}}>
                    <CardContent className="card-content-map">

                    <Box className='map-box'>
                        <Stack direction="row">
                            <RoomRoundedIcon sx={{color: 'primary.main', marginTop: '5%'}}/>
                            <Typography gutterBottom variant="h8" component="div" sx={{marginTop: '5%'}}>
                                {location}
                            </Typography>
                        </Stack>

                    <LeafletMap lat={lat} lng={lng} location={location}/>
                    </Box>
                    
                    <Box className='offer-box'>
                        
                        <Typography gutterBottom variant="h5" component="div" sx={{marginTop: "3%", alignSelf: 'center'}} color='primary'>
                                Cere oferta
                        </Typography>
                        <Typography gutterBottom variant="h8" component="div" sx={{marginTop: "7%"}}>
                                Email-ul pe care doriti sa primiti oferta
                        </Typography>
                        <MyTextField label='Email' name='email' value={emailOffer} type='email' functionType='setter' changeFunction={setEmailOffer} variant={'standard'}/>
                        <Typography gutterBottom variant="h8" component="div" sx={{marginTop: "7%"}}>
                                Trimite un mesaj service-ului
                        </Typography>
                        <MyTextField label='Scrie un mesaj' name='offerRequest' value={offerText} functionType='setter' type='text' changeFunction={setOfferText} variant={'standard'}/>
                            <Typography gutterBottom variant="h8" component="div" sx={{marginTop: "7%"}}>
                                Numar de telefon
                            </Typography>
                        <MyTextField label='Numar de telefon' name='phone' value={phoneOffer} functionType='setter' type='text' changeFunction={setPhoneOffer} variant={'standard'}/>
                            <Stack spacing={2} direction="row" justifyContent="center" sx={{marginTop: "10%"}}>
                                <Button variant='contained' onClick={handleOfferRequest} disabled={onOwnPage} color='primary'>Trimite</Button>
                            </Stack>
                    </Box>
                    </CardContent>
                    </Card>

                    <Reviews serviceReviews={serviceReviews}/>
                </Container>
            

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
                        <Button onClick={addReview}>Trimite</Button>

                    </Stack>
                </CardContent>
            </Card>}
        </Container>
    )
}

export default PresentationPage;
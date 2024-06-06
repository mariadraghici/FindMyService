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
import Pagination from '@mui/material/Pagination';
import {Autocomplete, Popper, Paper} from "@mui/material";
import toast from 'react-hot-toast';
import ProfileContext from "../../components/context/ProfileContext";
import ReviewCard from "../../components/ReviewCard";
import 'leaflet/dist/leaflet.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { getAllImagesOfService } from "../../api/imageApi";
import { getProfile } from "../../api/profileApi";
import { getAllFacilities } from "../../api/facilityApi";
import { useNavigate } from "react-router-dom";
import LeafletMap from "../../components/LeafletMap";
import MyTextField from "../../components/utils/MyTextField";
import StyledPopper from "../../components/utils/StyledPopper";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  

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
    // const [images, setImages] = useState([]);
    const [editButton, setEditButton] = useState(false);
    const [images, setImages] = useState(['uploads/img1.jpg', '/uploads/img2.jpg', '/uploads/img3.jpg', '/uploads/img4.jpg', '/uploads/img5.jpg']);
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

    const handleChangePage = (event, value) => {
        setPage(value);
        setImageUrl(images[value - 1]);
        console.log(value);
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
            }
          }
      
        fetchProfile();

        const getServiceByName = async () => {
            try {
                const res = await myAxios.get(`/api/service/page/${URLserviceName}`);
                
                setService(res.data.service);
                console.log(res.data.service);
                setTextFieldDescription(res.data.service.description);
                setSchedule(res.data.service.schedule);
                setLat(res.data.service.address.lat);
                setLng(res.data.service.address.lng);
                setLocation(res.data.service.address.address);
                //     const images = await getAllImagesOfService(res.data.service.name);
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
                    console.log(res);
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
            
            console.log(reviewData);
            const res = await myAxios.post('api/feedback/create', reviewData);
            console.log(res.data);

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

    const handleFileUpload = async (e) => {
        if (images.length === 5) {
            toast.error('Nu poti incarca mai mult de 5 imagini!');
            return;
        }
        if (e.target.files.length === 0) {
            return;
        }

        setFile(e.target.files);
        console.log(e.target.files);
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

    useEffect(() => {
        if (file) {
            const uploadFile = async () => {
                try {
                    const formData = new FormData();

                    for (let i = 0; i < file.length; i++) {
                        formData.append('file', file[i]);
                    }
                    
                    // Add the username to the formData object
                    formData.append('name', user.name);
                    const res = await myAxios.post('/api/upload', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });

                    if (res.data.status === 'success') {
                        toast.success("Fisierul a fost incarcat cu succes!");
                        setFile(null);
                    } else {
                        toast.error("Fisierul nu a putut fi incarcat!");
                    }
                }   catch (error) {
                    console.log(error);
                    toast.error(error.response.data.message);
                }
            }
            uploadFile();
        }

    }, [file, user.name]);

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
        <Container>
            <Grid container spacing={2} sx={{marginTop: '3%'}}>
                <Grid item xs={7}>
                    <Card sx={{padding: '3%', borderRadius: '7px', backgroundColor: 'blacks.light'}}>
                        <CardContent>
                            <Stack spacing={2} direction="row" justifyContent="space-between">
                            <Typography gutterBottom variant="h5" component="div">
                                {name}
                            </Typography>
                            {editButton === false && onOwnPage && <Button onClick={() => setEditButton(true)}>Editează</Button>}
                            </Stack>
                            <Typography gutterBottom variant="h8" component="div">
                                {location}
                            </Typography>
                            <Typography gutterBottom variant="h8" component="div">
                                {phone}
                            </Typography>
                            <Typography gutterBottom variant="h8" component="div">
                                {email}
                            </Typography>
                            <Stack spacing={2} direction="row" justifyContent="center">
                            {/* {images.length > 0 && images.map(image => {
                                return (
                                    <img key={image._id} src={image.url} alt="service" style={{width: '100%', height: 'auto'}}/>
                                )
                            })} */}
                             <img src={imageUrl} alt=""/>
                             <Pagination count={images.length} page={page} onChange={handleChangePage} sx={{padding: '5%'}}/>
                            </Stack>
                             <Typography variant="h6">Despre {name}</Typography>
                             {editButton === false && <Typography gutterBottom variant="h8" component="div">
                                {description ? convertNewlinesToBreaks(description) : 'Nicio descriere disponibila!'}
                            </Typography>}
                            {editButton === true && onOwnPage &&
                            <TextField size='medium' variant="filled" onChange={(e) => setTextFieldDescription(e.target.value)} type="text" name="name"
                            value={textFieldDescription} fullWidth label='Descriere' multiline/>}
                            {editButton === true && onOwnPage && <Stack spacing={2} direction="row" justifyContent="space-between" sx={{padding: '5%'}}>
                                <Stack spacing={2} direction="row" justifyContent="flex-start">
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        startIcon={<CloudUploadIcon />}
                                        >
                                        Încarcă poză
                                        <VisuallyHiddenInput type="file" onChange={handleFileUpload}  multiple="multiple"/>
                                    </Button>
                                    <Button>Șterge</Button>
                                </Stack>
                                <Button onClick={handleDoneEditing} >Gata</Button>
                            </Stack>}
                            <Divider sx={{opacity: 1, padding: '2%'}} />
                            <Stack spacing={2} direction="row" justifyContent="space-between" sx={{marginTop: '2%'}}>
                                <Typography gutterBottom variant="h5" component="div">
                                    Servicii
                                </Typography>
                                {editFacility === false && onOwnPage && <Button onClick={() => setEditFacility(true)}>Editează</Button>}
                            </Stack>
                            {editFacility === true && <Stack spacing={2} direction="column" >
                            <Typography gutterBottom variant="h8" component="div">
                                Adaugă serviciu nou *
                            </Typography>
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
                                PopperComponent={StyledPopper}
                                
                            />
                            <Typography gutterBottom variant="h8" component="div">
                                Preț pornire (RON)
                            </Typography>
                            <TextField size='small' type="number" name="priceLow" fullWidth
                            value={priceLow}
                            onChange={(event) => {
                              setPriceLow(event.target.value);
                            }}/>
                             <Typography gutterBottom variant="h8" component="div">
                                Preț maxim (RON)
                            </Typography>
                            <TextField size='small' type="number" name="priceHigh" fullWidth
                            value={priceHigh}
                            onChange={(event) => {
                              setPriceHigh(event.target.value);
                            }}/>
                            <Button onClick={handleAddFacility}>Adaugă</Button>
                            </Stack>}
                            {facilities && facilities.map(facility => {
                                return (
                                    <div key={facility._id}>
                                        <Stack spacing={2} direction="row" justifyContent="space-between" sx={{marginTop: '2%'}}>
                                        <Typography gutterBottom variant="h8" component="div">
                                            {facility.name}
                                        </Typography>
                                        <Typography gutterBottom variant="h8" component="div">
                                            {facility.priceLow === 0 ? '' : facility.priceLow} - {facility.priceHigh === 0 ? '' : facility.priceHigh} RON
                                        </Typography>
                                        {onOwnPage && editFacility && <Button onClick={() => 
                                            {handleDeleteFacility(facility._id);}
                                        }>Șterge</Button>}               
                                        </Stack>
                                    </div>
                                )
                            })}
                            <Stack spacing={2} direction="row" justifyContent="center" sx={{marginTop: '5%'}}>
                            {editFacility === true && onOwnPage === true && <Button variant='contained' color='primary' onClick={() => setEditFacility(false)}>Gata</Button>}
                            </Stack>
                        </CardContent>
                        
                    </Card>
                </Grid>
                <Grid item xs={5}>
                    <Card sx={{padding: '3%', borderRadius: '7px', backgroundColor: 'blacks.light'}}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Harta cu adresa
                            </Typography>
                            <LeafletMap lat={lat} lng={lng} location={location}/>
                            <Divider sx={{opacity: 1}} />
                            <Stack spacing={2} direction="row" justifyContent="space-between" sx={{marginTop: "5%"}}>
                            <Typography gutterBottom variant="h5" component="div">
                                Program
                            </Typography>
                            {scheduleEditButton === false && onOwnPage && <Button onClick={() => setScheduleEditButton(true)}>EDITEAZĂ</Button>}
                            </Stack>
                             {scheduleEditButton === false &&
                             <Typography gutterBottom variant="h8" component="div">
                             {convertNewlinesToBreaks(schedule)}
                            </Typography>}
                            {scheduleEditButton === true && onOwnPage &&
                            <TextField
                            size='medium' variant="filled" onChange={(e) => setSchedule(e.target.value)}
                            type="text" name="program"
                            value={schedule}
                            fullWidth
                            label='Program'
                            InputLabelProps={{
                                style: { color: '#8E8E8E' },
                            }}
                            multiline/>}
                            <Stack spacing={2} direction="row" justifyContent="flex-end" sx={{marginTop: '5%'}}>
                            {scheduleEditButton === true && <Button onClick={handleScheduleEditing} variant='contained' color='primary'>Gata</Button>}
                            </Stack>
                            <Divider sx={{opacity: 1, marginTop: '5%'}} />
                            <Typography gutterBottom variant="h5" component="div" sx={{marginTop: "3%"}}>
                                Cere oferta
                            </Typography>
                            <Typography gutterBottom variant="h8" component="div" sx={{marginTop: "3%"}}>
                                Email-ul pe care doriti sa primiti oferta
                            </Typography>
                            <MyTextField label='Email' name='email' value={emailOffer} type='email' changeFunction={setEmailOffer} variant={'standard'}/>
                            <Typography gutterBottom variant="h8" component="div" sx={{marginTop: "3%"}}>
                                Trimite un mesaj service-ului
                            </Typography>
                            {/* <TextField size='small' required type="text" name="name" fullWidth label='Scrie un mesaj' value={offerText}
                            color='secondary'
                            onChange={(e) => setOfferText(e.target.value)}
                            InputLabelProps={{
                                style: { color: '#8E8E8E' },
                              }}/> */}
                            <MyTextField label='Scrie un mesaj' name='offerRequest' value={offerText} type='text' changeFunction={setOfferText} variant={'standard'}/>
                            <Typography gutterBottom variant="h8" component="div" sx={{marginTop: "3%"}}>
                                Numar de telefon
                            </Typography>
                            <MyTextField label='Numar de telefon' name='phone' value={phoneOffer} type='text' changeFunction={setPhoneOffer} variant={'standard'}/>
                            <Stack spacing={2} direction="row" justifyContent="center" sx={{marginTop: "10%"}}>
                                <Button variant='contained' onClick={handleOfferRequest} disabled={onOwnPage} color='primary'>Trimite</Button>
                            </Stack>
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
            <Card sx={{padding: '3%', borderRadius: '7px', margin: '5%', backgroundColor: 'blacks.light'}}>
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
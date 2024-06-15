import Button from '@mui/material/Button';
import React from 'react'
import { Box, Grid } from '@mui/material';
import myAxios from "../../axios/axios";
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Stack from '@mui/material/Stack';
import styled from '@mui/material/styles/styled';
import Carousel from 'react-material-ui-carousel';
import './imageCarousel.css'
import useMediaQuery from '@mui/material/useMediaQuery';

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

const ImageCarousel = ({images, file, user, setFile, onOwnPage, setPresentationPageRefresh, presentationPageRefresh}) => {
    const [editPhotos, setEditPhotos] = React.useState(false);
    const [currentImage, setCurrentImage] = React.useState(null);
    const isSmallScreen = useMediaQuery('(max-width:780px)');

    useEffect(() => {
        if (images.length > 0) {
            setCurrentImage(images[0]);
        }
    }, [images]);

    const handleFileUpload = async (e) => {
        if (images.length === 5) {
            toast.error('Nu poti incarca mai mult de 5 imagini!');
            return;
        }
        if (e.target.files.length === 0) {
            return;
        }

        setFile(e.target.files);
    }

    const handleFileDelete = async (imageId) => {
        try {
            const serviceName = user.name;
            const res = await myAxios.delete(`/api/delete/${serviceName}/${imageId}`);
            
            if (res.status === 200) {
                toast.success("Fisierul a fost sters cu succes!");
                setPresentationPageRefresh(presentationPageRefresh + 1);
            } else {
                toast.error("Fisierul nu a putut fi sters!");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
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
                        setPresentationPageRefresh(presentationPageRefresh + 1);
                        setFile(null);
                    } else {
                        toast.error("Fisierul nu a putut fi incarcat!");
                    }
                }   catch (error) {
                    toast.error(error.response.data.message);
                }
            }
            uploadFile();
        }

    }, [file, user?.name]);

    return (
        <>
        {!editPhotos && onOwnPage &&
        <Grid container direction='row' justifyContent='flex-end' >
            <Button onClick={() => setEditPhotos(true)} >Editeaza</Button>
        </Grid>}
        {editPhotos === true && onOwnPage &&
        <Grid container direction='row' justifyContent='flex-end' sx={{marginBottom: '2%'}}>
            <Stack spacing={2} direction="row" justifyContent="space-between">
                    <Button component="label" variant="contained" tabIndex={-1} className='buttons' startIcon={<CloudUploadIcon />}>
                        {isSmallScreen ? '' : 'Încarcă poză'}
                        <VisuallyHiddenInput type="file" onChange={handleFileUpload}  multiple="multiple"/>
                    </Button>
                    
                    <Button className='delete-button buttons' variant="contained" color="secondary" onClick={() => handleFileDelete(currentImage._id)}>
                        {isSmallScreen ? 'Sterge' : 'Șterge poza curenta'}
                    </Button>
                    <Button onClick={() => setEditPhotos(false)} variant='contained' className='buttons' >Gata</Button>
            </Stack>
        </Grid>}

        {images.length > 0 &&
                <Carousel
                indicators={false}
                stopAutoPlayOnHover={true}
                swipe={true}
                autoPlay={false}
                animation='slide'
                navButtonsAlwaysVisible={true}
                onChange={(index) => {
                    setCurrentImage(images[index])
                }}
                 className='carousel'>
                    {
                        images.map((image, i) => (
                            <Item
                                key={i}
                                item={image}
                                editPhotos={editPhotos}
                                handleFileDelete={handleFileDelete}
                            />
                        ))
                    }
                </Carousel>
            }
        </>
    );
}

function Item({ item, editPhotos, handleFileDelete }) {
    return (
        <Box className='image-box'>
        <img className='image-styled' src={item.url} alt="service" />
        </Box>
    )
}
export default ImageCarousel
import {APIProvider,useMapsLibrary, Map, AdvancedMarker} from '@vis.gl/react-google-maps';
import {TextField} from "@mui/material";
import {useJsApiLoader, GoogleMap} from "@react-google-maps/api";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Button } from "@mui/material";
import Autocomplete from "react-google-autocomplete";
import { Popper } from '@mui/base/Popper';

const libraries = ['places'];

const CityChooseOnMap = ({lng, lat, setLat, setLng, setChooseLocation, values, setValues, handleChange}) => {
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries
    });

    const [selected, setSelected] = useState(null);

    if (!isLoaded) {
        return <Typography variant="h8" color='white'>Harta se incarca...</Typography>
    }

    return (
        <>
        <Typography variant="h6" color='black'>Alege locatia pe harta</Typography>
        <Autocomplete
        style={{width: '100%', padding: '2%', backgroundColor: 'white', borderRadius: '5px', color: 'black', border: '1px solid #222222',
            fontFamily: "Roboto", fontSize: '16px'
        }}
        apiKey={import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY}
        options={{
            types: ["address"],
            componentRestrictions: { country: "ro" },
          }}
        onPlaceSelected={(place) => {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            const address = place.formatted_address;
            setLat(lat);
            setLng(lng);
            setValues({...values, address});
        }}
        />

        <APIProvider apiKey={import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY} onLoad={() => console.log('Maps API has loaded.')}>
            <Map
                defaultZoom={13}
                center={{lat: lat, lng: lng}}
                style={{width: '100%', height: '35vh'}}
                mapId={"Map"}
                >
                    <AdvancedMarker position={{lat: lat, lng: lng}} />
                </Map>
            </APIProvider>
         </>
    )

}

export default CityChooseOnMap;
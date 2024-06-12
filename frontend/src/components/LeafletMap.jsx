import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import pin from '/img/pin.png'

const LeafletMap = ({lat, lng, location}) => {
    const locationIcon = new Icon({
        iconUrl: pin,
        iconSize: [30, 30],
    });

    return (
        <>
        {lat !== 0 && lng !== 0 &&
            <MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    className='map-tiles'
                />
                <Marker position={[lat, lng]} icon={locationIcon}>
                    <Popup>
                        {location}
                    </Popup>
                </Marker>
        </MapContainer>}
        </>
    );
};

export default LeafletMap;
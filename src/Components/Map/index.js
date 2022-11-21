import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useState } from 'react';

const MapContainer = ({ coord }) => {
	const updateWidth = () => {
		if (window.innerWidth < 800) {
			return 90;
		} else {
			return 40;
		}
	};
	const containerStyle = {
		width: `${updateWidth()}%`,
		height: '200px',
	};

	const [center] = useState({
		lat: coord.lat,
		lng: coord.lon,
	});

	return (
		<LoadScript googleMapsApiKey="AIzaSyBShwQPxU1woXWRZR9hiWHUnbacBu1DMKg">
			<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
				<Marker position={center} />
			</GoogleMap>
		</LoadScript>
	);
};

export default MapContainer;

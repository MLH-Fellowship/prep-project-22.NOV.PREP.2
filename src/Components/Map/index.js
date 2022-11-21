import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useState } from 'react';

const MapContainer = ({ coord, setCWeatherUrl, setForecastUrl }) => {
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

	const [center, setCenter] = useState({
		lat: coord.lat,
		lng: coord.lon,
	});

	const handleOnclick = (e) => {
		setCenter({ lat: e.latLng.lat(), lng: e.latLng.lng() });
		setCWeatherUrl(
			`https://api.openweathermap.org/data/2.5/weather?lat=${center.lat}&lon=${center.lng}&appid=${process.env.REACT_APP_APIKEY}`,
		);
		setForecastUrl(
			`https://api.openweathermap.org/data/2.5/forecast?lat=${center.lat}&lon=${center.lng}&appid=${process.env.REACT_APP_APIKEY}`,
		);
	};

	return (
		<LoadScript googleMapsApiKey="AIzaSyBShwQPxU1woXWRZR9hiWHUnbacBu1DMKg">
			<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} onClick={(e) => handleOnclick(e)}>
				<Marker position={center} />
			</GoogleMap>
		</LoadScript>
	);
};

export default MapContainer;

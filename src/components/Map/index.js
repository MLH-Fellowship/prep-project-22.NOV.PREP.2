import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useState } from 'react';

const MapContainer = ({ coord, setCWeatherUrl, setForecastUrl }) => {
	console.log(coord);
	const updateWidth = () => {
		if (window.innerWidth < 800) {
			return 90;
		} else {
			return 50;
		}
	};
	const containerStyle = {
		width: `${updateWidth()}%`,
		height: '300px',
		// zIndex: '-1',
		boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
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
		<LoadScript googleMapsApiKey={process.env.REACT_APP_MAPKEY}>
			<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} onClick={(e) => handleOnclick(e)}>
				<Marker position={center} />
			</GoogleMap>
		</LoadScript>
	);
};

export default MapContainer;

import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { memo, useEffect, useState } from 'react';
import Loader from '../Loader';

const MapContainer = ({ cWeatherData, fetchWeatherData, fetchForeCastData, degree }) => {
	const updateWidth = () => {
		if (window.innerWidth < 800) {
			return 100;
		} else if (window.innerWidth <= 1280) {
			return 35;
		} else {
			return 50;
		}
	};
	const containerStyle = {
		width: `${updateWidth()}%`,
		height: '300px',
		boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
	};

	const [center, setCenter] = useState({
		lat: cWeatherData.coord.lat,
		lng: cWeatherData.coord.lon,
	});

	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.REACT_APP_MAPKEY,
	});

	const handleOnclick = (e) => {
		fetchWeatherData(
			`https://api.openweathermap.org/data/2.5/weather?lat=${e.latLng.lat()}&lon=${e.latLng.lng()}&units=${degree}&appid=${
				process.env.REACT_APP_APIKEY
			}`,
		);
		fetchForeCastData(
			`https://api.openweathermap.org/data/2.5/forecast?lat=${e.latLng.lng()}&lon=${e.latLng.lng()}&units=${degree}&appid=${
				process.env.REACT_APP_APIKEY
			}`,
		);
	};

	useEffect(() => {
		setCenter({ lat: cWeatherData.coord.lat, lng: cWeatherData.coord.lon });
	}, [cWeatherData]);

	return isLoaded ? (
		<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} onClick={(e) => handleOnclick(e)}>
			<Marker position={center} />
		</GoogleMap>
	) : (
		<Loader />
	);
};

export default memo(MapContainer);

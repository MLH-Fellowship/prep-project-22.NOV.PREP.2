import React, { useState, useEffect } from 'react';
import '../../assets/css/BookmarkCard.css';
import { useFetch } from '../../hooks/useFetch';

const BookmarkCard = ({ place, useFahrenheit }) => {
	const BASE_URL = 'https://api.openweathermap.org/data/2.5/';
	const [wind, setWind] = useState('');
	const [humidity, setHumidity] = useState('');
	const [icon, setIcon] = useState('');
	let unit = useFahrenheit ? 'imperial' : 'metric';
	const [description, setDescription] = useState('');
	const [temperature, setTemperature] = useState('');
	const [weatherCondition, setWeather] = useState('Clear');
	const [{ data: cWeatherData }, fetchWeatherData] = useFetch();
	const [{ data: foreCastData }, fetchForeCastData] = useFetch();
	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	useEffect(() => {
		function getDetails() {
			fetchWeatherData(`${BASE_URL}weather?q=${place}&units=${unit}&appid=${process.env.REACT_APP_APIKEY}`);
		}

		getDetails();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [place, useFahrenheit, weatherCondition]);

	useEffect(() => {
		if (cWeatherData) {
			const { coord } = cWeatherData; //long lat
			const { lat, lon } = coord;
			fetchForeCastData(`${BASE_URL}onecall?lat=${lat}&lon=${lon}&units=${unit}&appid=${process.env.REACT_APP_APIKEY}`);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cWeatherData]);

	useEffect(() => {
		if (foreCastData) {
			const { current } = foreCastData;
			setWeather(current.weather[0].main);
			setWind(current.wind_speed);
			setHumidity(current.humidity);
			setIcon(current.weather[0].icon);
			setDescription(current.weather[0].description);
			let temp = current.temp;

			setTemperature(temp);

			const requiredDays = [];
			const date = new Date().getDay();
			for (let i = date; i < date + 5; i++) requiredDays.push((i + 1) % 7);
		}
	}, [foreCastData]);

	return (
		<div className="bookmarkCard">
			<div className="bookmarkCard-fav">
				<h3>{capitalizeFirstLetter(place)}</h3>

				<div className="bookmarkCard-temp">
					<div className="image">
						<img src={`http://openweathermap.org/img/w/${icon}.png`} className="imageicon" alt="icon" />
					</div>
					<h3>{Math.floor(temperature).toPrecision(4) + (useFahrenheit ? ' °F' : ' °C')}</h3>
				</div>
				<h4>{capitalizeFirstLetter(description)}</h4>
				<div className="wind-humidity-container">
					<div>
						<h5>Wind</h5>
						<h5>{Math.floor(wind).toPrecision(3) + ' m/s'}</h5>
					</div>
					<div>
						<h5>Humidity </h5>
						<h5>{humidity}%</h5>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookmarkCard;

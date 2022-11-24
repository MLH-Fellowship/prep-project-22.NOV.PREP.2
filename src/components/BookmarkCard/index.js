import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/css/BookmarkCard.css';

const BookmarkCard = ({ place, useFahrenheit }) => {
	const BASE_URL = 'https://api.openweathermap.org/data/2.5/';
	const [wind, setWind] = useState('');
	const [humidity, setHumidity] = useState('');
	const [icon, setIcon] = useState('');
	const [description, setDescription] = useState('');
	const [temperature, setTemperature] = useState('');
	const [weatherCondition, setWeather] = useState('Clear');

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	useEffect(() => {
		let unit = useFahrenheit ? 'imperial' : 'metric';

		async function getDetails() {
			const { data } = await axios.get(
				`${BASE_URL}weather?q=${place}&units=${unit}&appid=${process.env.REACT_APP_APIKEY}`,
			);

			const { coord } = data; //long lat
			const { lat, lon } = coord;

			let oneApiData = await axios.get(
				`${BASE_URL}onecall?lat=${lat}&lon=${lon}&units=${unit}&appid=${process.env.REACT_APP_APIKEY}`,
			);

			oneApiData = oneApiData.data;
			const { current } = oneApiData;

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

		getDetails();
	}, [place, useFahrenheit, weatherCondition]);

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

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
	const [weekly, setWeekly] = useState([]);
	const [minTemp, setminTemp] = useState([]);
	const [maxTemp, setmaxTemp] = useState([]);
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

			console.log(data);

			const { coord } = data; //long lat
			const { lat, lon } = coord;

			let oneApiData = await axios.get(
				`${BASE_URL}onecall?lat=${lat}&lon=${lon}&units=${unit}&appid=${process.env.REACT_APP_APIKEY}`,
			);

			console.log(oneApiData.data);

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

			const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

			setWeekly(
				requiredDays.map((idx) => {
					return days[idx];
				}),
			);

			const daily = oneApiData.daily;
			const filteredDailyData = daily.filter((ele, idx) => {
				return idx < 5;
			});

			setminTemp(
				filteredDailyData.map((dailyObject, idx) => {
					return dailyObject.temp.min;
				}),
			);

			setmaxTemp(
				filteredDailyData.map((dailyObject, idx) => {
					return dailyObject.temp.max;
				}),
			);
		}

		getDetails();
	}, [place, useFahrenheit, weatherCondition]);

	return (
		<div className="bookmarkCard">
			<div className="bookmarkCard-fav">
				<h1>{capitalizeFirstLetter(place)}</h1>
				<h3 className="head-fav">
					{capitalizeFirstLetter(description)}
					<br />
					<span>
						Wind {Math.floor(wind).toPrecision(3) + ' m/s'} <span className="dot">•</span> Humidity {humidity}%
					</span>
				</h3>
				<div className="bookmarkCard-temp">
					<h1 className="h1-heading">{Math.floor(temperature).toPrecision(4) + (useFahrenheit ? ' °F' : ' °C')}</h1>
					<div className="image">
						<img src={`http://openweathermap.org/img/w/${icon}.png`} className="imageicon" alt="icon" />
					</div>
				</div>
				<table className="bookmarkCard-table">
					<tr>
						{weekly.map((day) => {
							return <td>{day}</td>;
						})}
					</tr>
					<tr>
						{minTemp.map((temp) => {
							return <td>{Math.floor(temp).toPrecision(2) + (useFahrenheit ? ' °F' : ' °C')}</td>;
						})}
					</tr>
					<tr>
						{maxTemp.map((temp) => {
							return <td>{Math.floor(temp).toPrecision(2) + (useFahrenheit ? ' °F' : ' °C')}</td>;
						})}
					</tr>
				</table>
			</div>
		</div>
	);
};

export default BookmarkCard;

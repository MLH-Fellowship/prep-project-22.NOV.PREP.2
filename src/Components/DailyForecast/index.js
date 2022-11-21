import React, { useState } from 'react';
import '../../assets/css/DailyForecast.css';
import dateFormat from 'dateformat';
import { FcNext } from 'react-icons/fc';
import { FcPrevious } from 'react-icons/fc';
const DailyForecast = ({ data, setActiveWeatherCard, activeWeatherCard }) => {
	const initialNOfitems = () => {
		if (window.innerWidth < 450) {
			return 1;
		} else if (window.innerWidth > 450 && window.innerWidth < 800) {
			return 2;
		} else {
			return 4;
		}
	};
	const [startIndex, setStartIndex] = useState(0);
	const [endIndex, setEndIndex] = useState(initialNOfitems());
	const nextWeatherCard = () => {
		if (endIndex < data.length - 1) {
			setStartIndex((prev) => prev + 1);
			setEndIndex((prev) => prev + 1);
		}
	};

	const prevWeatherCard = () => {
		if (startIndex > 0) {
			setStartIndex((prev) => prev - 1);
			setEndIndex((prev) => prev - 1);
		}
	};
	const formatDate = (date) => {
		const currentDate = new Date(date);
		return dateFormat(currentDate, 'ddd, mmmm dS');
	};

	return (
		<div className="weatherCards">
			<FcPrevious onClick={() => prevWeatherCard()} className="icon" />

			{data &&
				data
					.filter((element, index) => index >= startIndex && index <= endIndex)
					.map((element, index) => (
						<div
							key={index}
							className={`weatherCard ${index === activeWeatherCard ? 'active' : 'deactive'} `}
							onClick={() => setActiveWeatherCard(index)}
						>
							<h4>{formatDate(element.date)}</h4>
							<div>
								<img
									src={`http://openweathermap.org/img/wn/${element.data[0]?.weather[0].icon}@2x.png`}
									alt="weather icon"
								/>
								<h4>{element.data[0]?.main.temp} &deg;C</h4>
							</div>
							<p>{element.data[0]?.weather[0].main}</p>
							<div>
								<div>
									<h5>Humidity</h5>
									<p>{element.data[0]?.main.humidity}%</p>
								</div>
								<div>
									<h5>Wind Speed</h5>
									<p>{element.data[0]?.wind.speed} km/j</p>
								</div>
							</div>
						</div>
					))}
			<FcNext className="icon" onClick={() => nextWeatherCard()} />
		</div>
	);
};

export default DailyForecast;

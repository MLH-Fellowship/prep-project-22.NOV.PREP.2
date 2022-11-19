import { useEffect, useState } from 'react';
import './App.css';
import logo from './mlh-prep.png';
import { useFetch } from './Hooks/useFetch';
import DailyForecast from './Components/DailyForecast';
import HourlyForecast from './Components/HourlyForecast';
import MainWeatherCard from './Components/MainWeatherCard';
import Box from './Components/Box';
<<<<<<< HEAD
import Bookmark from './Components/Bookmark';
=======
import PlaylistRecommendation from './Components/PlaylistRecommendation';
>>>>>>> 2a24606a41087661bdb6a580408291c398ac4237

function App() {
	const [city, setCity] = useState('New York City');
	const [cWeatherUrl, setCWeatherUrl] = useState(
		'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=' + process.env.REACT_APP_APIKEY,
	);
	const [forecastUrl, setForecastUrl] = useState(
		'https://api.openweathermap.org/data/2.5/forecast?q=' +
			city +
			'&units=metric&appid=' +
			process.env.REACT_APP_APIKEY,
	);
	const [forecastDataGrouped, setForecastDataGrouped] = useState(null);
	const [activeWeatherCard, setActiveWeatherCard] = useState(0);
	const formUrl = (city) => {
		setCWeatherUrl(
			'https://api.openweathermap.org/data/2.5/weather?q=' +
				city +
				'&units=metric&appid=' +
				process.env.REACT_APP_APIKEY,
		);
		setForecastUrl(
			'https://api.openweathermap.org/data/2.5/forecast?q=' +
				city +
				'&units=metric&appid=' +
				process.env.REACT_APP_APIKEY,
		);
	};
	let { data: cWeatherData, error: cWeatherError, loading: cWeatherLoading } = useFetch(cWeatherUrl);
	let { data: forecastData, error: forecastError, loading: forecastLoading } = useFetch(forecastUrl);

	useEffect(() => {
		if (city !== '') {
			formUrl(city);
		}
	}, [city]);

	useEffect(() => {
		const groupDataByDate = () => {
			const groups = forecastData.list.reduce((groups, item) => {
				const date = item.dt_txt.split(' ')[0];
				const group = groups[date] || [];
				group.push(item);
				groups[date] = group;
				return groups;
			}, {});
			const groupArrays = Object.keys(groups).map((date) => {
				return {
					date,
					data: groups[date],
				};
			});
			setForecastDataGrouped(groupArrays);
		};
		//only when the foreCastData is not empty
		if (forecastData) {
			groupDataByDate();
		}
	}, [forecastData]);

	if (cWeatherError) {
		return <div>Error: {cWeatherError.message}</div>;
	} else {
		return (
			<>
				<img className="logo" src={logo} alt="MLH Prep Logo"></img>
				
				<div>
					<h2>Enter a city below 👇</h2>
					<input type="text" value={city} onChange={(event) => setCity(event.target.value)} />
					<div className="mainWeatherCard">
						{cWeatherLoading && <h2>Loading...</h2>}
<<<<<<< HEAD
						{!cWeatherLoading && cWeatherData && (
							
							<><Bookmark city={city} />
								<h3>{(weatherCondition = cWeatherData.weather[0].main)}</h3>
								<p>Feels like {cWeatherData.main.feels_like}°C</p>
								<i>
									<p>
										{cWeatherData.name}, {cWeatherData.sys.country}
									</p>
								</i>
							</>
						)}
=======
						{!cWeatherLoading && cWeatherData && <MainWeatherCard data={cWeatherData} />}
>>>>>>> 2a24606a41087661bdb6a580408291c398ac4237
					</div>
					{!cWeatherLoading && cWeatherData && <PlaylistRecommendation weather={cWeatherData.weather[0].main} />}
					{forecastError ? (
						<div>Error: {forecastError.message}</div>
					) : (
						<div className="DailyForecast">
							{forecastLoading && <h2>Loading...</h2>}
							{!forecastLoading && (
								<DailyForecast
									data={forecastDataGrouped}
									setActiveWeatherCard={setActiveWeatherCard}
									activeWeatherCard={activeWeatherCard}
								/>
							)}
							{!forecastLoading && forecastDataGrouped != null && (
								<HourlyForecast data={forecastDataGrouped[activeWeatherCard]} />
							)}
						</div>
					)}
					<p className="required-things-heading">Things you should carry in your bag 🎒</p>
					{!cWeatherLoading && cWeatherData && <Box itemType="things" weather={cWeatherData.weather[0].main} />}
					<p className="required-things-heading">Things you eat 😋</p>
					{!cWeatherLoading && cWeatherData && <Box itemType="food" weather={cWeatherData.weather[0].main} />}
				</div>
			</>
		);
	}
}

export default App;

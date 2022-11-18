import { useEffect, useState } from 'react';
import './App.css';
import logo from './mlh-prep.png';
import { useFetch } from './Hooks/useFetch';
import DailyForecast from './Components/DailyForecast';
import HourlyForecast from './Components/HourlyForecast';
import MainWeatherCard from './Components/MainWeatherCard';
import Box from './Components/Box';

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

	let weatherConditions = new Map([
		['Thunderstorm', '0tvTKWuNraoLD79QYNQqjs'],
		['Drizzle', '2ehQYxdKgrAjAmRtGs0Lvo'],
		['Rain', '3r82Jvzw3SSGKKiKf3dXMM'],
		['Snow', '3CilYZJlRy9Ezo90iDWjh9'],
		['Clouds', '5LkCNhKwuKa1niaXnFuzVf'],
		['Clear', '3dbanqXCAZtvBR0Fb2WzJE'],
		['Mist', '0GRb68fTXCzZ2lIQ08EKn0'],
		['Fog', '6pBgfrL2GNWzuFijJL1Dm3'],
		['Rest', '0BcF3XeAFrAkhdQGiVAoPA'],
	]);
	let weatherCondition = '';

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
						{!cWeatherLoading && cWeatherData && <MainWeatherCard data={cWeatherData} />}
					</div>

					<div
						style={{ padding: 10 }}
						dangerouslySetInnerHTML={{
							__html:
								'<iframe style="border-radius:12px"\n' +
								'                src="https://open.spotify.com/embed/playlist/' +
								weatherConditions.get(weatherConditions.has(weatherCondition) ? weatherCondition : 'Rest') +
								'?utm_source=generator"\n' +
								'                width="83%" height="280" frameBorder="0" allowFullScreen=""\n' +
								'                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"\n' +
								'                loading="lazy"></iframe>',
						}}
					/>

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

import { useEffect, useState, useRef } from 'react';
import './App.css';
import { useFetch } from './hooks/useFetch';
import DailyForecast from './components/DailyForecast';
import HourlyForecast from './components/HourlyForecast';
import Navbar from './components/Navbar';
import MainWeatherCard from './components/MainWeatherCard';
import Box from './components/RequiredThings/Box';
import Loader from './components/Loader';
import MapContainer from './components/Map';
import PlaylistRecommendation from './components/PlaylistRecommendation';
import Autocomplete from './components/Autocomplete';
import Footer from './components/Footer';
import Bookmark from './components/Bookmark';
import { BookmarkProvider } from './helpers/context/bookmark';
import alanBtn from '@alan-ai/alan-sdk-web';

function App() {
	const [city, setCity] = useState('New York City');
	const [label, setLabel] = useState('');
	const [degree, setDegree] = useState('metric');
	const [{ data: cWeatherData, error: cWeatherError, loading: cWeatherLoading }, fetchWeatherData] = useFetch();
	const [{ data: forecastData, error: forecastError, loading: forecastLoading }, fetchForeCastData] = useFetch();
	const [forecastDataGrouped, setForecastDataGrouped] = useState(null);
	const [activeWeatherCard, setActiveWeatherCard] = useState(0);
	let timer,
		timeoutVal = 1000;
	const reFetchData = (city, degree) => {
		fetchWeatherData(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${degree}&appid=${process.env.REACT_APP_APIKEY}`,
		);
		fetchForeCastData(
			`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${degree}&appid=${process.env.REACT_APP_APIKEY}`,
		);
	};

	const handleKeyDown = () => {
		window.clearTimeout(timer);
	};
	const handleKeyUp = () => {
		if (city) {
			window.clearTimeout(timer);
			timer = window.setTimeout(() => {
				reFetchData(city, degree);
			}, timeoutVal);
		}
	};

	const weather = (weatherType) => {
		switch (weatherType) {
			case 'Rain':
				return 'https://joy.videvo.net/videvo_files/video/free/2022-01/large_watermarked/211212_07_Jakarta_4k_013_preview.mp4';
			case 'Clouds':
				return 'https://joy.videvo.net/videvo_files/video/free/2019-12/large_watermarked/190915_B_01_Timelapse%20Danang_05_preview.mp4';
			case 'Snow':
				return 'https://joy.videvo.net/videvo_files/video/free/2021-01/large_watermarked/210108_01_Snowy%20Woods_4k_003_preview.mp4';
			case 'Clear':
				return 'https://joy.videvo.net/videvo_files/video/free/2019-03/large_watermarked/181015_07a_Hollywood_UHD_004_preview.mp4';
			case 'Haze':
				return 'https://joy.videvo.net/videvo_files/video/free/2019-04/large_watermarked/190408_01_Alaska_Landscapes1_09_preview.mp4';
			default:
				return 'https://joy.videvo.net/videvo_files/video/free/2019-03/large_watermarked/181015_07a_Hollywood_UHD_004_preview.mp4';
		}
	};

	const findLocation = () => {
		navigator.geolocation.getCurrentPosition((position) => {
			fetchWeatherData(
				'https://api.openweathermap.org/data/2.5/weather?lat=' +
					position.coords.latitude +
					'&lon=' +
					position.coords.longitude +
					'&units=metric&appid=' +
					process.env.REACT_APP_APIKEY,
			);

			fetchForeCastData(
				'https://api.openweathermap.org/data/2.5/forecast?lat=' +
					position.coords.latitude +
					'&lon=' +
					position.coords.longitude +
					'&units=metric&appid=' +
					process.env.REACT_APP_APIKEY,
			);
		});
	};

	useEffect(() => {
		if (navigator.geolocation) {
			findLocation();
		} else {
			reFetchData(city, degree);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (cWeatherData) {
			setCity(cWeatherData.name);
		}
	}, [cWeatherData]);

	useEffect(() => {
		reFetchData(city, degree);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [degree]);

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

	function sendDataToAlan(city) {
		fetch(
			'https://api.openweathermap.org/data/2.5/weather?q=' +
				city +
				'&units=metric&appid=' +
				process.env.REACT_APP_APIKEY,
		)
			.then((res) => res.json())
			.then(
				(result) => {
					if (result['cod'] !== 200) {
					} else {
						alanBtnRef.btnInstance.callProjectApi('readWeather', result, function (error, result) {});
					}
				},
				(error) => {
					console.log(error);
				},
			);
	}

	const alanBtnRef = useRef({}).current;
	// Adding the Alan button
	useEffect(() => {
		alanBtnRef.btnInstance = alanBtn({
			key: process.env.REACT_APP_ALANAPI,
			onCommand: (commandData) => {
				if (commandData.command === 'searchCity') {
					reFetchData(commandData.city, degree);
				}
				if (commandData.command === 'weatherData') {
					sendDataToAlan(commandData.city);
				}
			},
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (cWeatherError || forecastError) {
		return <div>Error: {cWeatherError.message || forecastError.message}</div>;
	} else if (cWeatherLoading || forecastLoading || cWeatherData == null || forecastData == null) {
		return (
			<div id="loader">
				<Loader />
			</div>
		);
	} else {
		return (
			<BookmarkProvider>
				<div className={weather(cWeatherData.weather[0].main)}>
					<Navbar changeUnit={degree} setChangeUnit={setDegree} />
					<main className="main-div" id={weather(cWeatherData.weather[0].main)}>
						<div className="main-div__container">
							<div className="search-bar-items">
								<Autocomplete
									changeCity={city}
									setChangeCity={setCity}
									changeLabel={label}
									setChangeLabel={setLabel}
									update={reFetchData}
									deg={degree}
									value={city}
									onChange={(e) => setCity(e.currentTarget.value)}
									onKeyDown={() => handleKeyDown()}
									onKeyUp={() => handleKeyUp()}
								/>
								<Bookmark city={city}> </Bookmark>
							</div>

							<h1 className="section-heading" id="location-label">
								{label ? label : city}
							</h1>
							<section id="mapAndWeathercard">
								<MainWeatherCard data={cWeatherData} changeUnit={degree} />
								<MapContainer
									fetchWeatherData={fetchWeatherData}
									fetchForeCastData={fetchForeCastData}
									cWeatherData={cWeatherData}
									degree={degree}
								/>
							</section>

							<section>
								<DailyForecast
									data={forecastDataGrouped}
									setActiveWeatherCard={setActiveWeatherCard}
									activeWeatherCard={activeWeatherCard}
									changeUnit={degree}
								/>
							</section>

							<section className="suggested-section">
								<HourlyForecast data={forecastDataGrouped[activeWeatherCard]} changeUnit={degree} />
							</section>

							<section className="suggested-section">
								<h2 className="section-heading">Items to bring 🎒</h2>
								<Box className="box" itemType="things" weather={cWeatherData.weather[0].main} />
							</section>

							<section>
								<h2 className="section-heading">Activities to do 🙆🏻‍♂️</h2>
								<Box itemType="activities" weather={cWeatherData.weather[0].main} />
							</section>

							<section className="suggested-section">
								<h2 className="section-heading">Food to eat 😋</h2>
								<Box itemType="food" weather={cWeatherData.weather[0].main} />
							</section>

							<section className="suggested-section">
								<h2 className="section-heading">Songs to listen to 🎶</h2>
								<PlaylistRecommendation weather={cWeatherData.weather[0].main} />
							</section>

							<video src={weather(cWeatherData.weather[0].main)} autoPlay loop muted></video>
						</div>
					</main>
					<Footer />
				</div>
			</BookmarkProvider>
		);
	}
}

export default App;

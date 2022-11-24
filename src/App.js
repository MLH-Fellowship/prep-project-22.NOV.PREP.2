import { useEffect, useState } from 'react';
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

function App() {
	const [city, setCity] = useState('New York City');
	const [label, setLabel] = useState('');
	const [weatherType, setWeatherType] = useState('');
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState(null);
	const [results, setResults] = useState(null);
	const [degree, setDegree] = useState('metric');

	const [cWeatherUrl, setCWeatherUrl] = useState(
		`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${degree}&appid=${process.env.REACT_APP_APIKEY}`,
	);
	const [forecastUrl, setForecastUrl] = useState(
		`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${degree}&appid=${process.env.REACT_APP_APIKEY}`,
	);
	const [forecastDataGrouped, setForecastDataGrouped] = useState(null);
	const [activeWeatherCard, setActiveWeatherCard] = useState(0);
	let timer,
		timeoutVal = 1000;
	const updateUrls = (city, degree) => {
		setCWeatherUrl(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${degree}&appid=${process.env.REACT_APP_APIKEY}`,
		);
		setForecastUrl(
			`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${degree}&appid=${process.env.REACT_APP_APIKEY}`,
		);
	};
	let { data: cWeatherData, error: cWeatherError, loading: cWeatherLoading } = useFetch(cWeatherUrl);
	let { data: forecastData, error: forecastError, loading: forecastLoading } = useFetch(forecastUrl);

	const handleKeyDown = () => {
		window.clearTimeout(timer);
	};
	const handleKeyUp = () => {
		if (city) {
			window.clearTimeout(timer);
			timer = window.setTimeout(() => {
				updateUrls(city);
			}, timeoutVal);
		}
	};
	useEffect(() => {
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
						setIsLoaded(false);
						setError(result);
					} else {
						setIsLoaded(true);
						setResults(result);
						setWeatherType(result.weather[0].main);
					}
				},
				(error) => {
					setIsLoaded(false);
					setError(error);
					setWeatherType(error);
				},
			);
	}, [city]);

	// For vids
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
			setCWeatherUrl(
				'https://api.openweathermap.org/data/2.5/weather?lat=' +
					position.coords.latitude +
					'&lon=' +
					position.coords.longitude +
					'&units=metric&appid=' +
					process.env.REACT_APP_APIKEY,
			);

			setForecastUrl(
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
			alert('Geolocation is not supported by this browser.');
		}
	}, []);

	useEffect(() => {
		if (cWeatherData != null) {
			setCity(cWeatherData.name);
		}
	}, [cWeatherData]);

	useEffect(() => {
		updateUrls(city, degree);
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
			// <div className={weather(weatherType)}>
			<BookmarkProvider>
				<div className={weather(weatherType)}>
					<Navbar changeUnit={degree} setChangeUnit={setDegree} />
					<main className="main-div" id={weather(weatherType)}>
						<div className="main-div__container">
							{/* <h2>Enter a city below 👇</h2> */}
							<div className="search-bar-items">
								<Autocomplete
									changeCity={city}
									setChangeCity={setCity}
									changeLabel={label}
									setChangeLabel={setLabel}
									update={updateUrls}
									deg={degree}
									value={city}
									onChange={(e) => setCity(e.currentTarget.value)}
									onKeyDown={() => handleKeyDown()}
									onKeyUp={() => handleKeyUp()}
								/>
								<Bookmark city={city}> </Bookmark>
							</div>

							<h1 className="section-heading">{label}</h1>
							<section id="mapAndWeathercard">
								<MainWeatherCard data={cWeatherData} changeUnit={degree} />
								<MapContainer
									setCWeatherUrl={setCWeatherUrl}
									setForecastUrl={setForecastUrl}
									coord={cWeatherData.coord}
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

							<section class="suggested-section">
								<HourlyForecast data={forecastDataGrouped[activeWeatherCard]} changeUnit={degree} />
							</section>

							<section class="suggested-section">
								<h2 className="section-heading">Items to bring 🎒</h2>
								<Box className="box" itemType="things" weather={cWeatherData.weather[0].main} />
							</section>

							<section class="suggested-section">
								<h2 className="section-heading">Food to eat 😋</h2>
								<Box itemType="food" weather={cWeatherData.weather[0].main} />
							</section>

							<section>
								<h2 className="section-heading">Acitivities to do 🙆🏻‍♂️</h2>
								<Box itemType="activities" weather={cWeatherData.weather[0].main} />
							</section>

							<section class="suggested-section">
								<h2 className="section-heading">Songs to listen to 🎶</h2>
								<PlaylistRecommendation weather={cWeatherData.weather[0].main} />
							</section>
							<Footer />
							<video src={weather(weatherType)} autoPlay loop muted></video>
						</div>
					</main>
				</div>
			</BookmarkProvider>
		);
	}
}

export default App;

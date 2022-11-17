import { useEffect, useState } from 'react';
import './App.css';
import Box from './Components/Box.jsx';
import logo from './mlh-prep.png';

function App() {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [city, setCity] = useState('New York City');
	const [results, setResults] = useState(null);
	const [generic, setGeneric] = useState('app');
	useEffect(() => {
		fetch(
			'https://api.openweathermap.org/data/2.5/weather?q=' +
				city +
				'&units=metric' +
				'&appid=' +
				process.env.REACT_APP_APIKEY,
		)
			.then((res) => res.json())
			.then(
				(result) => {
					if (result['cod'] !== 200) {
						setIsLoaded(false);
					} else {
						setIsLoaded(true);
						setResults(result);
						setGeneric('app ' + result.weather[0].main);
					}
				},
				(error) => {
					setIsLoaded(true);
					setError(error);
				},
			);
	}, [city]);

	if (error) {
		return <div>Error: {error.message}</div>;
	} else {
		return (
			<div className={[generic]}>
				<main>
					<img className="logo" src={logo} alt="MLH Prep Logo"></img>
					<div>
						<h2>Enter a city below 👇</h2>
						<input
							type="text"
							value={city}
							onChange={(event) => {
								setCity(event.target.value);
							}}
						/>
						<div className="Results">
							{!isLoaded && <h2>Loading...</h2>}
							{console.log(results)}
							{isLoaded && results && (
								<>
									<h3>{results.weather[0].main}</h3>
									<p>Feels like {results.main.feels_like}°C</p>
									<i>
										<p>
											{results.name}, {results.sys.country}
										</p>
									</i>
								</>
							)}
						</div>
					</div>
					<p className="required-things-heading">Things you should carry in your bag 🎒</p>
					{isLoaded && results && <Box itemType="things" weather={results.weather[0].main} />}
					<p className="required-things-heading">Things you eat 😋</p>
					{isLoaded && results && <Box itemType="food" weather={results.weather[0].main} />}
				</main>
			</div>
		);
	}
}

export default App;

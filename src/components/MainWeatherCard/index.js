import '../../assets/css/MainWeatherCard.css';
import dateFormat from 'dateformat';
const MainWeatherCard = ({ data, changeUnit }) => {
	return (
		<div className="container">
			<div className="card">
				<div>
					<h3> Weather in {data.name}</h3>
					<h3>{dateFormat(new Date(data.dt), 'h:MM TT')}</h3>
				</div>

				<div>
					<div>
						<div>
							<img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="weather icon" />
							<h1>
								{data.main.temp} &deg; {changeUnit === 'metric' ? 'C' : 'F'}
							</h1>
						</div>
						<h2>{data.weather[0].main}</h2>
						<h3>Feels like {data.main.feels_like}&deg;</h3>
					</div>

					<div>
						<div>
							<h3>Humidity</h3>
							<h4>{data.main.humidity}%</h4>
						</div>
						<div>
							<h3>Wind Speed</h3>
							<h4>{data.wind.speed} km/j</h4>
						</div>

						<div>
							<h3>Temp Min</h3>
							<h4>
								{data.main.temp_min} &deg; {changeUnit === 'metric' ? 'C' : 'F'}
							</h4>
						</div>

						<div>
							<h3>Temp Max</h3>
							<h4>
								{data.main.temp_max} &deg; {changeUnit === 'metric' ? 'C' : 'F'}
							</h4>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MainWeatherCard;

import "./index.css"
import dateFormat from "dateformat"
const MainWeatherCard = ({data}) =>{
        console.log(data)

    return (
        <div className="container">
            <div>
                <h3> Weather in {data.name}</h3>
                <h3>{dateFormat(new Date(data.dt), "h:MM TT")}</h3>
            </div>

            <div>
                <div>
                    <div>
                      <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="weather icon" />
                      <h3>{data.main.temp}  °C</h3>
                    </div>
                    <h4>{data.weather[0].main}</h4>
                    <h5>Feels like {data.main.feels_like}</h5>
                </div>

                <div>
                     <div>
                        <h4>Humidity</h4>
                        <h5>{data.main.humidity}%</h5>
                     </div>
                     <div>
                        <h4>Wind Speed</h4>
                        <h5>{data.wind.speed} km/j</h5>
                     </div>

                     <div>
                        <h4>Temp Min</h4>
                        <h5>{data.main.temp_min} °C</h5>
                     </div>

                     <div>
                     <h4>Temp Max</h4>
                        <h5>{data.main.temp_max} ° C</h5>
                     </div>

                </div>

            </div>

        </div>
    )

}

export default MainWeatherCard
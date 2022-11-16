import React from "react";
import "./index.css";
import dateFormat from "dateformat";

const DailyForecast = ({ data, setActiveWeatherCard, activeWeatherCard}) => {
  const formatDate = (date) => {
    const currentDate = new Date(date);
    return dateFormat(currentDate, "ddd, mmmm dS");
  }
  return (
    <div className="weatherCards">
      {data &&
        data.map((element, index) => (
          <div id={index} className={`weatherCard ${index === activeWeatherCard? "active": "deactive"} `} onClick={() => setActiveWeatherCard(index)}>
            <h4>{formatDate(element.date)}</h4>
            <div>
               <img
                src={`http://openweathermap.org/img/wn/${element.data[0]?.weather[0].icon}@2x.png`}
                alt="weather icon"
              />
              <h3>{element.data[0]?.main.temp} &deg;C</h3>
            </div>
            <div>
              <div>
                 <p>Humidity</p>
                 <p>{element.data[0]?.main.humidity}%</p>
              </div>
              <div>
                 <p>Wind Speed</p>
                 <p>{element.data[0]?.wind.speed} km/j</p>
              </div>
             </div>
          </div>
        ))}
    </div>
  );
};

export default DailyForecast;
import { useEffect, useState } from "react";
import './App.css';
import logo from './mlh-prep.png'
import { useFetch } from "./Hooks/useFetch";

function App() {
  const [city, setCity] = useState("New York City"); 
  const [url, setUrl] = useState("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&appid=" + process.env.REACT_APP_APIKEY)
  const formUrl = (city) => {
    setUrl("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&appid=" + process.env.REACT_APP_APIKEY)
  }
  let {data, error, loading}  =  useFetch(url);
  useEffect(() => { 
     if(city !== ""){
      formUrl(city); 
     }
  }, [city])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return <>
      <img className="logo" src={logo} alt="MLH Prep Logo"></img>
      <div>
        <h2>Enter a city below 👇</h2>
        <input
          type="text"
          value={city}
          onChange={event => setCity(event.target.value)} />
        <div className="Results">
          {loading && <h2>Loading...</h2>}
          {!loading && data && <>
            <h3>{data.weather[0].main}</h3>
            <p>Feels like {data.main.feels_like}°C</p>
            <i><p>{data.name}, {data.sys.country}</p></i>
          </>}
        </div>
      </div>
    </>
  }
}

export default App;

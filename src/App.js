import React, { useState } from "react";
import { fetchWeather } from "./api/fetchWeather";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true);

  const fetchData = async (e) => {
    if (e.key === "Enter") {
      setLoading(true);
      try {
        const data = await fetchWeather(cityName);
        setWeatherData(data);



        if (!recentSearches.includes(cityName)) 
          {
          setRecentSearches([cityName, ...recentSearches]);
        }

        setCityName("");
        setError(null);
      } 
      
      catch (error) 
      
      {
        setError(error.message);
      }
      setLoading(false);
    }
  };



  const handleRecentClick = async (city) => {
    setLoading(true);
    try 
    {
      const data = await fetchWeather(city);
      setWeatherData(data);
      setError(null);
    } 
    
    catch (error) 
    {
      setError(error.message);
    }
    setLoading(false);
  };


  return (
    <div>

      <input
        type="text"
        placeholder="Enter city name..."
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        onKeyDown={fetchData}
      />
      
      <button onClick={() => setIsCelsius(!isCelsius)}>
       
        Switch to {isCelsius ? "Fahrenhit" : "Celsius"}
      </button>

      {loading && <div>Loading...</div>}
      
      {error && <div style={{ color: "red" }}> 
        {error}
        </div>}




      {recentSearches.length > 0 && (
        <div>
          <h3>
            Recent Searches:
          </h3>
          <ul>
            {recentSearches.map((city, index) => (
              <li key={index} onClick={() => handleRecentClick(city)} style={{ cursor: "pointer" }}>
                {city}
              </li>
            ))}
          </ul>
        </div>
      )}

      {weatherData?.location && (
        <div>

          <h2>
            {weatherData.location.name}, {weatherData.location.region},{" "}
            {weatherData.location.country}
          </h2>
          
          <p>
            Temperature: {isCelsius ? weatherData.current.temp_c + " °C" : weatherData.current.temp_f + " °F"}
          </p>

          <p>
            Condition: {weatherData.current.condition.text}
            </p>

          <img
            src={weatherData.current.condition.icon}
            alt={weatherData.current.condition.text}
          />


          <p>Humidity: {weatherData.current.humidity}</p>
          <p>Pressure: {weatherData.current.pressure_mb}</p>
          <p>Visibility: {weatherData.current.vis_km}</p>
        
        </div>

      )}
    </div>
    
  );
};

export default App;

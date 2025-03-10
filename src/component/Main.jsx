import React, { useEffect, useState } from "react";

const Main = () => {
  const [city, setCity] = useState("Mumbai");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  var date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // const WeatherData = () => {
  const API_KEY = "8e0c22e3d15c59a3959abda710957e79";
  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeatherData(data);
        console.log(data);

        setError(null); // clear any previous errors
      } else {
        setWeatherData(null);
        setError(data.message); // handle errors from API
      }
    } catch (error) {
      console.log(error);
      setError("Failed to fetch weather data");
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <>
      <h1 className="title">Today's Weather</h1>
      <div className="app">
        <div className="container">
          <h1 className="date">{date}</h1>

          {error && <p className="error">{error}</p>}

          {weatherData ? (
            <div className="weather_data">
              <p className="city">
                {weatherData.name}, {weatherData.sys.country}
              </p>
              <figure>
                <img
                  src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                  alt={weatherData.weather[0].description}
                  className="weather_type_img"
                />
              </figure>
              <p className="degree">{weatherData.main.temp}°C</p>
              <p className="weather_type">
                {weatherData.weather[0].description}
              </p>
            </div>
          ) : (
            <p className="loading">Loading weather data...</p>
          )}

          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter the city name"
              className="weather_city"
              onChange={handleInputChange}
              value={city}
            />
            <button className="search" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Main;

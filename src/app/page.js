"use client";

import { useState, useEffect } from "react";

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState("London");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [useLocation, setUseLocation] = useState(false);

  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
  const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

  const fetchWeather = async (cityName, lat = null, lon = null) => {
    setLoading(true);
    setError("");

    if (!API_KEY) {
      setError(
        "API key not configured. Please add your OpenWeatherMap API key to .env.local"
      );
      setLoading(false);
      return;
    }

    try {
      let weatherUrl, forecastUrl;

      if (lat && lon) {
        // Use coordinates
        weatherUrl = `${WEATHER_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        forecastUrl = `${FORECAST_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      } else {
        // Use city name
        weatherUrl = `${WEATHER_URL}?q=${cityName}&appid=${API_KEY}&units=metric`;
        forecastUrl = `${FORECAST_URL}?q=${cityName}&appid=${API_KEY}&units=metric`;
      }

      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(weatherUrl),
        fetch(forecastUrl),
      ]);

      if (!weatherResponse.ok) {
        throw new Error("City not found");
      }

      if (!forecastResponse.ok) {
        throw new Error("Forecast data not available");
      }

      const weatherData = await weatherResponse.json();
      const forecastData = await forecastResponse.json();

      setWeather(weatherData);
      setForecast(forecastData);
      setCity(weatherData.name);
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUseLocation(true);
        fetchWeather(null, latitude, longitude);
      },
      (error) => {
        setError(
          "Unable to retrieve your location. Please search for a city instead."
        );
        setLoading(false);
      }
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      setUseLocation(false);
      fetchWeather(city);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const getWeatherIcon = (weatherCode) => {
    const icons = {
      "01": "☀️", // clear sky
      "02": "⛅", // few clouds
      "03": "☁️", // scattered clouds
      "04": "☁️", // broken clouds
      "09": "️", // shower rain
      10: "️", // rain
      11: "⛈️", // thunderstorm
      13: "️", // snow
      50: "️", // mist
    };

    const code = weatherCode.substring(0, 2);
    return icons[code] || "🌤️";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const getDailyForecast = () => {
    if (!forecast) return [];

    const dailyData = {};
    forecast.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!dailyData[date]) {
        dailyData[date] = {
          date: item.dt * 1000,
          temp: item.main.temp,
          icon: item.weather[0].icon,
          description: item.weather[0].description,
          min: item.main.temp_min,
          max: item.main.temp_max,
        };
      } else {
        // Update min/max temperatures
        dailyData[date].min = Math.min(dailyData[date].min, item.main.temp_min);
        dailyData[date].max = Math.max(dailyData[date].max, item.main.temp_max);
      }
    });

    return Object.values(dailyData).slice(0, 5); // Get next 5 days
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Weather App
        </h1>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>

          {/* Location Button */}
          <button
            type="button"
            onClick={getCurrentLocation}
            disabled={loading}
            className="w-full px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
          >
            📍 Use My Location
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Current Weather Display */}
        {weather && !loading && (
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">
              {getWeatherIcon(weather.weather[0].icon)}
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {weather.name}, {weather.sys.country}
              {useLocation && (
                <span className="text-sm text-green-600 ml-2">
                  📍 Your Location
                </span>
              )}
            </h2>

            <div className="text-4xl font-bold text-gray-800 mb-2">
              {Math.round(weather.main.temp)}°C
            </div>

            <p className="text-lg text-gray-600 mb-4 capitalize">
              {weather.weather[0].description}
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="text-gray-600">Feels like</div>
                <div className="font-semibold">
                  {Math.round(weather.main.feels_like)}°C
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="text-gray-600">Humidity</div>
                <div className="font-semibold">{weather.main.humidity}%</div>
              </div>
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="text-gray-600">Wind</div>
                <div className="font-semibold">
                  {Math.round(weather.wind.speed)} m/s
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="text-gray-600">Pressure</div>
                <div className="font-semibold">{weather.main.pressure} hPa</div>
              </div>
            </div>
          </div>
        )}

        {/* 5-Day Forecast */}
        {forecast && !loading && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              5-Day Forecast
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
              {getDailyForecast().map((day, index) => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-lg p-4 text-center"
                >
                  <div className="text-sm text-gray-600 mb-2">
                    {formatDate(day.date)}
                  </div>
                  <div className="text-2xl mb-2">
                    {getWeatherIcon(day.icon)}
                  </div>
                  <div className="text-sm text-gray-600 capitalize mb-1">
                    {day.description}
                  </div>
                  <div className="font-semibold text-gray-800">
                    {Math.round(day.temp)}°C
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {Math.round(day.min)}° / {Math.round(day.max)}°
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading weather data...</p>
          </div>
        )}
      </div>
    </div>
  );
}

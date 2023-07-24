import axios from 'axios';
import Banner from '../banner/Banner';
import React, { useEffect, useState } from 'react';

const Clima = () => {
  const apiKey = 'a618aa639b910e409586e9837a98064d';
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getLocationWeather = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${apiKey}`;
            resolve(api);
          },
          function (error) {
            reject(error);
          }
        );
      } else {
        reject(new Error("El navegador no admite geolocalización"));
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = await getLocationWeather(); 
        const response = await axios.get(api); 
        const weatherData = response.data;
        setData(weatherData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading weather data...</p>
      ) : data ? (
        <Banner nombre={data.name} temperatura={data.main.temp} />
      ) : (
        <p>Failed to fetch weather data.</p>
      )}
    </>
  );
};

export default Clima;
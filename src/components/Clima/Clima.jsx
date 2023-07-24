import axios from 'axios';
import Banner from '../banner/Banner';
import React, { useEffect, useState } from 'react';

function obtenerHoraLocal(timezoneOffset) {
  const currentDate = new Date();
  const utcOffset = currentDate.getTimezoneOffset() * 60; // Obtener el desplazamiento de la zona horaria local en segundos
  const localTimestamp = currentDate.getTime() / 1000 + utcOffset + timezoneOffset; // Ajustar la fecha y hora local utilizando el desplazamiento horario
  const localDate = new Date(localTimestamp * 1000);
  return localDate;
}

function time(timezoneOffset) {
  const localDate = obtenerHoraLocal(timezoneOffset);
  const hours = localDate.getHours().toString().padStart(2, '0'); // Obtener las horas en formato de 24 horas
  const minutes = localDate.getMinutes().toString().padStart(2, '0'); // Obtener los minutos
  const formattedTime = hours + ':' + minutes; 
  return formattedTime;
}


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
        console.log(data);
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
        <Banner nombre={data.name}  temperatura={data.main.temp} pais={data.sys.country} hora={time(data.timezone)} />
      ) : (
        <p>Failed to fetch weather data.</p>
      )}
    </>
  );
};

export default Clima;
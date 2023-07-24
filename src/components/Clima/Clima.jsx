
import axios from 'axios'
import Banner from '../banner/Banner'
import React, { useEffect, useState } from 'react';



const Clima = () => {
    const apiKey = 'a618aa639b910e409586e9837a98064d';
    
let res;
    const [data, setData] = useState([]);

    useEffect(()=>{
        const fetchData = async () => {
            try {
              const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Cordoba,AR&APPID=${apiKey}`);
              const data = await response.data;
              setData(data);
          
            } catch (error) {
              console.log(error);
            }
    };
    
    fetchData();
}, []);

return (
  <>
    <Banner nombre={data.name}/>
  </>
);
};



 
 


export default Clima
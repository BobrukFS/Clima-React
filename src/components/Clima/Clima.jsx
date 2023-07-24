
import axios from 'axios'
import Banner from '../banner/Banner'




const Clima = () => {

const apiKey = 'a618aa639b910e409586e9837a98064d'

 axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Cordoba,AR&APPID=${apiKey}`).then((resp) => console.log(resp.data.main))
 
    return <>
    
        <Banner></Banner>
    
    
    </>
}

export default Clima
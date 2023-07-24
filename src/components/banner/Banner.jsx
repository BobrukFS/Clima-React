
function Banner({nombre, temperatura}) {
    let icono;
    let tempCelsius = Math.round(temperatura - 273.15);

    if(tempCelsius >= 5 && tempCelsius < 15 ){
        icono = 'src/assets/sunCloud.png'
    } else if (tempCelsius >= 15){
        icono = 'src/assets/sun.png'
    } else{
        icono = 'src/assets/cloudy.png'
    }

    return (  
        <div className="banner">
            <div className="banner__container">
                <img className="banner__icon"  src={icono} alt="icono de clima" />
                <p className="banner__temp">13º</p>
                <p className="banner__name">{nombre}</p>
            </div>
            <div className="banner__container">
                <p className="banner__time">7:00 PM</p>
                <p className="banner__day">Sunset Time, Monday</p>
            </div>
           
        </div>
    );
}

export default Banner;

import classes from './ForecastBonus.module.css'; 
import React, { useState } from 'react';
import Conditions from '../Conditions/Conditions';



const Forecast = () => {

    let [city, setCity] = useState('');
    let [country, setCountry] = useState('');
    let [unit, setUnit] = useState('imperial');
    let [responseObj, setResponseObj] = useState({});
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const uriEncodedCity = encodeURIComponent(city);
    
   function getForecast(e) {
       e.preventDefault();
       if (city.length === 0) {
        return setError(true);
    }
    e.preventDefault();
    if (country.length === 0){
        return setError(true);
    }

    setError(false);
   setResponseObj({});
  
   setLoading(true);
  
   let uriEncodedCity = encodeURIComponent(city);
   let uriEncodeCountry = encodeURIComponent(country);

    fetch(`https://community-open-weather-map.p.rapidapi.com/weather?units=${unit}&q=${uriEncodedCity},${uriEncodeCountry}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "9c82fb2f60msh660633c2ea954dcp1fb8a0jsn5c0936bb6a61",
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
        }
    })
 
       .then(response => response.json())
       .then(response => {
           setResponseObj(response)
           if (response.cod !== 200) {
            throw new Error()
        }
        setResponseObj(response);
       setLoading(false);
       })

    .catch(err => {
        setError(true);
       setLoading(false);
       console.log(err.message);
    });
   }
   return (
<div class="container">
    <div class="card">
        <div class="row">
            <div id="container" class="col">
            <img class="card-img" src="https://cdn.dribbble.com/users/925716/screenshots/3333720/attachments/722375/night.png" alt="night"></img>
            <div class="card-body">
                <h2 id="text">Weather Finder</h2>
                <p id="text2">Temperature, conditions and more</p>
                </div>
                </div>
            <div id="container" class="col">
                <form onSubmit={getForecast}> 
                    <div class="row"> 
                        <input className={classes.TextInput}
                            type="text"
                            placeholder="City"
                            maxLength="50"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            />            
                        <input className={classes.TextInput}
                            type="text"
                            placeholder="Country"
                            maxLength="50"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            />                       
                        <button className={classes.Button} type="button submit">Get Forecast</button>
                    </div>
                    <div class="row">
                        <label className={classes.Radio}>
                            <input
                                type="radio"
                                name="units"
                                checked={unit === "imperial"}
                                value="imperial"
                                onChange={(e) => setUnit(e.target.value)}
                            />
                                Fahrenheit
                        </label>

                        <label className={classes.Radio}>
                            <input
                                type="radio"
                                name="units"
                                checked={unit === "metric"}
                                value="metric"
                                onChange={(e) => setUnit(e.target.value)}  
                                />
                                Celcius
                        </label>    
                        </div>         
                
                        <Conditions
                        responseObj={responseObj}
                        error={error} //new
                        loading={loading} //new
                        />
                </form>
              </div>
        </div>
    </div>
</div>
    /* <div>
        <h2>Find Current Weather Conditions</h2>
        <div>
            {JSON.stringify(responseObj)}
        </div>
        <button onClick={getForecast}>Get Forecast</button>
    </div> */
   )
}

export default Forecast;
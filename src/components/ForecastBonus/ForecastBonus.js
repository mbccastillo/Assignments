import classes from "./ForecastBonus.module.css";
import React, { useEffect, useState } from "react";
import Conditions from "../Conditions/Conditions";

const Forecast = () => {
	// Data that you want to use in the form
	const uriInitial = {
		city: "",
		country: "",
		unit: "imperial",
	};
	const initialPlace = {
		city: "",
		country: "",
	};

	const [uri, setUri] = useState(uriInitial);
	const [place, setPlace] = useState(initialPlace);
	const [unit, setUnit] = useState("imperial");
	const [message, setMessage] = useState("");
	const [responseObj, setResponseObj] = useState(null);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	// eslint-disable-next-line no-unused-vars

	// In this function you deal with the fields in the form
	const handleChange = (e) => {
		setError(false);
		const { name, value } = e.target;
		setPlace({ ...place, [name]: value });
	};

	useEffect(() => {
		if (place.city !== "" && place.country !== "") {
			setUri({
				...uri,
				city: encodeURIComponent(place.city),
				country: encodeURIComponent(place.country),
				unit: unit,
			});
		}
	}, [place, unit]); // eslint-disable-line

	const fetchData = async (unit, city, country) => {
		fetch(
			`https://community-open-weather-map.p.rapidapi.com/weather?units=${unit}&q=${city},${country}`,
			{
				method: "GET",
				headers: {
					"x-rapidapi-key":
						"9c82fb2f60msh660633c2ea954dcp1fb8a0jsn5c0936bb6a61",
					"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
				},
			}
		)
			.then((response) => response.json())
			.then((response) => {
				setResponseObj(response);
				if (response.cod !== 200) {
					throw new Error();
				}
				setResponseObj(response);
				setLoading(false);
			})

			.catch((err) => {
				setError(true);
				setLoading(false);
				console.log(err.message);
			});
	};

	const getForecast = (e) => {
		e.preventDefault();
		if (place.city === "" || place.country === "") {
			setError(true);
			setMessage("Please, enter a valid city and country");
		} else {
			setLoading(true);
			fetchData(uri.unit, uri.city, uri.country);
		}
	};

	return (
		<div class="container">
			<div class="card">
				<div class="row">
					<div id="container" class="col">
						<img
							class="card-img"
							src="https://cdn.dribbble.com/users/925716/screenshots/3333720/attachments/722375/night.png"
							alt="night"
						></img>
						<div class="card-body">
							<h2 id="text">Weather Finder</h2>
							<p id="text2">Temperature, conditions and more</p>
						</div>
					</div>
					<div id="container" className="col">
						<form onSubmit={getForecast}>
							<div className="row">
								<input
									className={classes.TextInput}
									type="text"
									placeholder="City..."
									maxLength="100"
									name="city"
									value={place.city}
									onChange={handleChange}
								/>
								<input
									className={classes.TextInput}
									type="text"
									name="country"
									placeholder="Country..."
									maxLength="100"
									value={place.country}
									onChange={handleChange}
								/>
								<button className={classes.Button} type="button submit">
									Get Forecast
								</button>
							</div>
							<div className="row">
								<label className={classes.Radio}>
									<input
										type="radio"
										name="units"
										value="imperial"
										checked={unit === "imperial"}
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
							{error && <small style={{ color: "red" }}>{message}</small>}
							{!error && responseObj !== null && responseObj !== undefined && (
								<>
									<Conditions responseObj={responseObj} loading={loading} />
								</>
							)}
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
	);
};

export default Forecast;

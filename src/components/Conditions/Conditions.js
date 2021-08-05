import React from "react";
import classes from "./Conditions.module.css";

const Conditions = (props) => {
	return (
		<div className={classes.Wrapper}>
			<div>
				{/* <p><strong>{props.responseObj.name}</strong></p> */}
				{/* <p>It is currently {Math.round(props.responseObj.main.temp)} degrees out with {props.responseObj.weather[0].description}.</p> */}
				{props.loading && <div className={classes.Loader} />}
				{props.responseObj.cod === 200 && (
					<>
						<label className={classes.TextOutput}>
							Location:
							<span style={{ color: "white" }}> {props.responseObj.name}</span>
						</label>

						<label className={classes.TextOutput}>
							Temperature:{" "}
							<span style={{ color: "white" }}>
								{Math.round(props.responseObj.main.temp)} degrees
							</span>
						</label>

						<label className={classes.TextOutput}>
							Humidity:{" "}
							<span style={{ color: "white" }}>
								{Math.round(props.responseObj.main.humidity)} %
							</span>
						</label>

						<label className={classes.TextOutput}>
							Conditions:{" "}
							<span style={{ color: "white" }}>
								{props.responseObj.weather[0].description}
							</span>
						</label>
					</>
				)}
			</div>
		</div>
	);
};
export default Conditions;

import React from 'react';
import classes from './Conditions.module.css';

const Conditions = (props) => {
   return (
        <div className={classes.Wrapper}>
           {props.error && <small className={classes.Small}>Please enter both a valid country and a valid city.</small>}
           {props.loading && <div className={classes.Loader}/>}
           {props.responseObj.cod === 200 ?
               <div>
                {/* <p><strong>{props.responseObj.name}</strong></p> */}
                {/* <p>It is currently {Math.round(props.responseObj.main.temp)} degrees out with {props.responseObj.weather[0].description}.</p> */}
                <row>
                <label className={classes.TextOutput}>Location:<span class="white"> {props.responseObj.name}</span></label></row>
                <row>
                <label className={classes.TextOutput}>Temperature: <span class="white">{Math.round(props.responseObj.main.temp)}</span> degrees </label></row>
                <row>
                <label className={classes.TextOutput}>Humidity: {Math.round(props.responseObj.main.humidity)} % </label></row>
                <row>
                <label className={classes.TextOutput}>Conditions: {props.responseObj.weather[0].description}</label></row>

               </div>
           : null
           }
       </div>
   )
}
export default Conditions;
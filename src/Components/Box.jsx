
import React from "react";
import './assets/css/Box.css';
import requiredThings from "./assets/Js/requiredThings";


function Item(props) {
	return (
		<div className="flex required-thing">
			<img src={props.img} alt={props.alt} width="50" height="50"></img>
			<p>{props.name}</p>
		</div>
	);
}



function Box(props){
	return (
		<div className="flex required-things-box">
			{Object.keys(requiredThings[props.weather]).map(item=>{
				return <Item img={requiredThings[props.weather][item]} name={item}/>
			})}
		</div>
	)
}


export default Box;

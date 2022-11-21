import React from 'react';
import '../assets/css/Box.css';
import getRequiredMap from '.';

function Item(props) {
	return (
		<div className="flex required-thing">
			<img src={props.img} alt={props.alt} width="50" height="50"></img>
			<p>{props.name}</p>
		</div>
	);
}

function Box(props) {
	return (
		<div className="flex required-things-box">
			{Object.keys(getRequiredMap[props.itemType][props.weather]).map((item, index) => {
				return <Item key={index} img={getRequiredMap[props.itemType][props.weather][item]} name={item} />;
			})}
		</div>
	);
}

export default Box;

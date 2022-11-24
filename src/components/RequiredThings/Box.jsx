import React from 'react';
import '../../assets/css/Box.css';
import getRequiredMap from './index';

function Item(props) {
	return (
		<div className="flex required-thing">
			<img class="icons" src={props.img} alt={props.alt} width="50" height="50"></img>
			<h3>{props.name}</h3>
		</div>
	);
}

function Box(props) {
	return (
		<div className="flex required-things-box">
			{Object.keys(getRequiredMap[props.itemType][props.weather]).map((item, index) => {
				return (
					<Item
						key={index}
						alt="Required Item Images"
						img={getRequiredMap[props.itemType][props.weather][item]}
						name={item}
					/>
				);
			})}
		</div>
	);
}

export default Box;

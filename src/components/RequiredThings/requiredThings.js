import Raincoat from '../../assets/img/requiredThings/Raincoat.png';
import Flashlight from '../../assets/img/requiredThings/Flashlight.png';
import WaterproofBoots from '../../assets/img/requiredThings/WaterproofBoots.png';
import Umbrella from '../../assets/img/requiredThings/Umbrella.png';
import Googles from '../../assets/img/requiredThings/Goggles.png';
import Gloves from '../../assets/img/requiredThings/Gloves.png';
import Jacket from '../../assets/img/requiredThings/Jacket.png';
import Watch from '../../assets/img/requiredThings/Watch.png';
import Mask from '../../assets/img/requiredThings/Mask.png';
import Sunscreen from '../../assets/img/requiredThings/Sunscreen.png';
import Sunglasses from '../../assets/img/requiredThings/Sunglasses.png';
import Sanitation from '../../assets/img/requiredThings/Sanitation.png';
import MosquitoRepellent from '../../assets/img/requiredThings/MosquitoRepellent.png';
import Cap from '../../assets/img/requiredThings/Cap.png';
import SandScarf from '../../assets/img/requiredThings/Scarf.png';
import Wipes from '../../assets/img/requiredThings/Wipes.jpg';

const requiredThings = {
	Thunderstorm: {
		Raincoat: Raincoat,
		Flashlight: Flashlight,
		'Waterproof Boots': WaterproofBoots,
	},
	Drizzle: {
		Raincoat: Raincoat,
		'Waterproof Boots': WaterproofBoots,
		Umbrella: Umbrella,
	},
	Rain: {
		Raincoat: Raincoat,
		'Waterproof Boots': WaterproofBoots,
		Umbrella: Umbrella,
	},
	Snow: {
		Googles: Googles,
		Gloves: Gloves,
		Jacket: Jacket,
	},
	Mist: {
		Watch: Watch,
		Googles: Googles,
		Mask: Mask,
	},
	Smoke: {
		Watch: Watch,
		Googles: Googles,
		Mask: Mask,
	},
	Haze: {
		Watch: Watch,
		Googles: Googles,
		Mask: Mask,
	},
	Dust: {
		'Face Wipes': Wipes,
		Googles: Googles,
		Mask: Mask,
	},
	Fog: {
		Watch: Watch,
		Googles: Googles,
		Mask: Mask,
	},
	Sand: {
		Mask: Mask,
		Googles: Googles,
		'Sand Scarf': SandScarf,
	},
	Ash: {
		'Face Wipes': Wipes,
		Googles: Googles,
		Mask: Mask,
	},
	Squall: {
		Watch: Watch,
		Googles: Googles,
		Mask: Mask,
	},
	Tornado: {
		Sanitation: Sanitation,
		Flashlight: Flashlight,
		Googles: Googles,
	},
	Clear: {
		Sunglasses: Sunglasses,
		BaseballCap: Cap,
		Sunscreen: Sunscreen,
	},
	Clouds: {
		BaseballCap: Cap,
		Watch: Watch,
		'Mosquito Repellent': MosquitoRepellent,
	},

	Sunny: {
		Sunglasses: Sunglasses,
		BaseballCap: Cap,
		Sunscreen: Sunscreen,
	},
};

export default requiredThings;

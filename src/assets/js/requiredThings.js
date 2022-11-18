import Raincoat from '../img/requiredThings/Raincoat.png';
import Flashlight from '../img/requiredThings/Flashlight.png';
import WaterproofBoots from '../img/requiredThings/WaterproofBoots.png';
import Umbrella from '../img/requiredThings/Umbrella.png';
import Googles from '../img/requiredThings/Goggles.png';
import Gloves from '../img/requiredThings/Gloves.png';
import Jacket from '../img/requiredThings/Jacket.png';
import Watch from '../img/requiredThings/Watch.png';
import Mask from '../img/requiredThings/Mask.png';
import Sunscreen from '../img/requiredThings/Sunscreen.png';
import Sunglasses from '../img/requiredThings/Sunglasses.png';
import Sanitation from '../img/requiredThings/Sanitation.png';
import MosquitoRepellent from '../img/requiredThings/MosquitoRepellent.png';
import Cap from '../img/requiredThings/Cap.png';
import SandScarf from '../img/requiredThings/Scarf.png';
import Wipes from '../img/requiredThings/Wipes.jpg';

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

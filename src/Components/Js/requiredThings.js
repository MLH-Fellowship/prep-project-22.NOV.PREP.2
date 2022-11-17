import Raincoat from '../assets/requiredThings/Raincoat.png';
import Flashlight from '../assets/requiredThings/Flashlight.png';
import WaterproofBoots from '../assets/requiredThings/WaterproofBoots.png';
import Umbrella from '../assets/requiredThings/Umbrella.png';
import Googles from '../assets/requiredThings/Goggles.png';
import Gloves from '../assets/requiredThings/Gloves.png';
import Jacket from '../assets/requiredThings/Jacket.png';
import Watch from '../assets/requiredThings/Watch.png';
import Mask from '../assets/requiredThings/Mask.png';
import Sunscreen from '../assets/requiredThings/Sunscreen.png';
import Sunglasses from '../assets/requiredThings/Sunglasses.png';
import Sanitation from '../assets/requiredThings/Sanitation.png';
import MosquitoRepellent from '../assets/requiredThings/MosquitoRepellent.png';
import Cap from '../assets/requiredThings/Cap.png';
import SandScarf from '../assets/requiredThings/Scarf.png';
import Wipes from '../assets/requiredThings/Wipes.jpg';




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

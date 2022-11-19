import { GoogleMap, LoadScript } from '@react-google-maps/api';

const MapContainer = () => {
	const containerStyle = {
		width: '400px',
		height: '400px',
	};

	const center = {
		lat: -3.745,
		lng: -38.523,
	};

	return (
		<LoadScript googleMapsApiKey="AIzaSyBShwQPxU1woXWRZR9hiWHUnbacBu1DMKg">
			<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
				{/* Child components, such as markers, info windows, etc. */}
				<></>
			</GoogleMap>
		</LoadScript>
	);
};

export default MapContainer;

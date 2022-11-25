import { useEffect, useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useFetch } from '../../hooks/useFetch';

const Autocomplete = ({ setChangeCity, update, deg, setChangeLabel }) => {
	const [locations, setLocations] = useState([]);
	const [{ data }, fetchData] = useFetch();
	const autoCity = (city) => {
		if (city) {
			fetchData(
				`https://autocomplete.search.hereapi.com/v1/autocomplete?q=${city}&limit=4&types=city&apiKey=${process.env.REACT_APP_HEREAPI}`,
			);
		}
	};

	useEffect(() => {
		let cleanedData = [];
		if (data) {
			let i = 0;
			cleanedData = data.items.map((item) => {
				return { id: i++, name: item.address.label };
			});
			setLocations(cleanedData);
		}
	}, [data]);

	let styling = {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		width: 400,
		margin: '0',
		borderRadius: '50px',
		fontSize: '5.5rem',
		boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)',
		zIndex: 999,
	};

	return (
		<div className="search-bar" style={styling}>
			<ReactSearchAutocomplete
				items={locations}
				onSearch={(city) => {
					autoCity(city);
				}}
				onSelect={(label) => {
					setChangeLabel(label.name);
					let city = label.name.split(',')[0];
					setChangeCity(city);
					update(city, deg === 'metric' ? 'metric' : 'imperial');
				}}
				autoFocus
				placeholder="Enter a city"
			/>
		</div>
	);
};

export default Autocomplete;

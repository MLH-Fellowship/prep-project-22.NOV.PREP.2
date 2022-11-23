import { useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

const Autocomplete = ({ setChangeCity, update, deg, setChangeLabel }) => {
	const [locations, setLocations] = useState([]);

	const autoCity = (city) => {
		if (city) {
			let url = `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${city}&limit=4&types=city&apiKey=${process.env.REACT_APP_HEREAPI}`;

			let cleanedData = [];

			fetch(url)
				.then((res) => res.json())
				.then((data) => {
					let i = 0;
					data.items.map((item) => {
						const itemObj = { id: i, name: item.address.label };
						cleanedData.push(itemObj);
						i++;
					});
					setLocations(cleanedData);
				});
		}
	};

	let styling = {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		width: 400,
		margin: '0 auto',
		borderRadius: '50px',
		fontSize: '5.5rem',
		marginBottom: '3rem',
		boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)',
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

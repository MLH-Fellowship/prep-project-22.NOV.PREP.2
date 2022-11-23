import { useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

const Autocomplete = ({ setChangeCity, update, deg }) => {
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

	return (
		<div className="search-bar" style={{ width: 400, margin: '0 auto' }}>
			<ReactSearchAutocomplete
				items={locations}
				onSearch={(city) => {
					autoCity(city);
				}}
				onSelect={(label) => {
					let city = label.name.split(',')[0];
					setChangeCity(city);
					update(city, deg == 'metric' ? 'metric' : 'imperial');
				}}
				autoFocus
				placeholder="Enter a city"
			/>
		</div>
	);
};

export default Autocomplete;

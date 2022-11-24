import React, { useEffect, useState } from 'react';
import dateFormat from 'dateformat';
import '../../assets/css/HourlyForecast.css';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
const HourlyForecast = ({ data, changeUnit }) => {
	const [temp, setTemp] = useState([]);
	const [labels, setLabels] = useState([]);
	useEffect(() => {
		if (data) {
			const [temp, hours] = data.data.reduce(
				([a, b], item) => {
					a.push(item.main.temp);
					b.push(dateFormat(new Date(item.dt_txt), 'HH:MM  TT'));
					return [a, b];
				},
				[[], []],
			);
			setLabels(hours);
			setTemp(temp);
		}
	}, [data]);

	ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
				labels: {
					color: 'white',
					font: {
						size: 20,
					},
				},
			},
		},
		scales: {
			y: {
				title: {
					display: true,
					color: 'white',
					text: `Temperature °${changeUnit === 'metric' ? 'C' : 'F'}`,
					font: {
						size: 20,
					},
				},
				grid: {
					borderColor: 'white',
					display: false,
				},
				ticks: {
					color: 'white',
					beginAtZero: true,
					font: {
						size: 20,
					},
				},
			},
			x: {
				title: {
					display: true,
					color: 'white',
					text: 'Hours',
					font: {
						size: 20,
					},
				},
				grid: {
					borderColor: 'white',
					display: false,
				},
				ticks: {
					color: 'white',
					beginAtZero: true,
					font: {
						size: 20,
					},
				},
			},
		},
	};
	const dataValue = {
		labels,
		datasets: [
			{
				label: `${dateFormat(new Date(data.date), 'ddd, mmmm dS')}`,
				data: temp,
				borderColor: '#0D9DE3',
				backgroundColor: 'white',
			},
		],
	};

	return (
		<div className="graph">
			<div>
				<Line options={options} data={dataValue} />
			</div>
		</div>
	);
};

export default HourlyForecast;

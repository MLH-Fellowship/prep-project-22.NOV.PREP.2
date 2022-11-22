let weatherConditions = new Map([
	['Thunderstorm', '0tvTKWuNraoLD79QYNQqjs'],
	['Drizzle', '2ehQYxdKgrAjAmRtGs0Lvo'],
	['Rain', '3r82Jvzw3SSGKKiKf3dXMM'],
	['Snow', '3CilYZJlRy9Ezo90iDWjh9'],
	['Clouds', '5LkCNhKwuKa1niaXnFuzVf'],
	['Clear', '3dbanqXCAZtvBR0Fb2WzJE'],
	['Mist', '0GRb68fTXCzZ2lIQ08EKn0'],
	['Fog', '6pBgfrL2GNWzuFijJL1Dm3'],
	['Rest', '0BcF3XeAFrAkhdQGiVAoPA'],
]);

const PlaylistRecommendation = ({ weather }) => {
	return (
		<div>
			<div
				style={{ padding: 10 }}
				dangerouslySetInnerHTML={{
					__html:
						'<iframe style="border-radius:12px"\n' +
						'                src="https://open.spotify.com/embed/playlist/' +
						weatherConditions.get(weatherConditions.has(weather) ? weather : 'Rest') +
						'?utm_source=generator"\n' +
						'                width="83%" height="280" frameBorder="0" allowFullScreen=""\n' +
						'                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"\n' +
						'                loading="lazy"></iframe>',
				}}
			/>
		</div>
	);
};

export default PlaylistRecommendation;

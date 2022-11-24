import '../../assets/css/Footer.css';
import logofooter from '../../assets/img/mascot-logo.png';
import React from 'react';

const Footer = () => {
	return (
		<footer>
			<div className="content">
				<h3>Made with ❤️ by</h3>
				<img src={logofooter} className="footer-logo" alt="logo" />
			</div>
		</footer>
	);
};

export default Footer;

import '../../assets/css/Footer.css';
import logofooter from '../../assets/img/logofinal.png';
import React from 'react';

const Footer = () => {
	return (
		<footer bgColor="light" className="text-center text-lg-left">
			<div className="content">
				<p className="footer-text">Made with ❤️ by</p>
				<img src={logofooter} className="logofooter" alt="logo" />
			</div>
		</footer>
	);
};

export default Footer;

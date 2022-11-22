import React from 'react';
import logo from '../../assets/img/logo.png';
import Toggle from 'react-toggle';
import '../../assets/css/Navbar.css';

import { useBookmarkContext } from '../../helpers/context/bookmark';
import { BookmarkProvider } from '../../helpers/context/bookmark';


const Navbar = ({ changeUnit, setChangeUnit }) => {

	const hamburgerClicked = () => {
		let hamburger = document.querySelector('.navbar-hamburger');
		let navButtons = document.querySelector('.navbar-btns');
		hamburger.classList.toggle('active');
		navButtons.classList.toggle('active');
	};
	const [, toggleBookmarkModal] = useBookmarkContext();
	return (
		<nav className="navbar">
			<div className="navbar-logo">
				<img src={logo} className="logo" alt="logo" />
			</div>

			<BookmarkProvider>
				<div className="navbar-btns">
					<button
						className="saved-locations-btn nav-item"
						href="#"
						onClick={(e) => {
							e.preventDefault();
							toggleBookmarkModal();
						}}
					>
						Saved Locations
					</button>
					<div className="toggle-btn nav-item">
						<label>
							<span>°C </span>
							<Toggle defaultChecked={false} icons={false} />
							<span> °F</span>
						</label>
					</div>
			</BookmarkProvider>

			<div className="navbar-hamburger" onClick={hamburgerClicked}>
				<span class="bar"></span>
				<span class="bar"></span>
				<span class="bar"></span>
			</div>
		</nav>
	);
};

export default Navbar;

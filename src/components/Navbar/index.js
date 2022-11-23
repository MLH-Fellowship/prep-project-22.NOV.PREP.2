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
		<BookmarkProvider>
			<nav className="navbar">
				<div className="navbar-logo">
					<img src={logo} className="logo" alt="logo" />
				</div>
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
						<span>°C </span>
						<Toggle
							defaultChecked={changeUnit === 'imperial'}
							icons={false}
							onChange={(event) => {
								event.target.checked ? setChangeUnit('imperial') : setChangeUnit('metric');
							}}
							className="unstyled"
						/>
						<span> °F</span>
					</div>
				</div>
				<div className="navbar-hamburger" onClick={hamburgerClicked}>
					<span className="bar"></span>
					<span className="bar"></span>
					<span className="bar"></span>
				</div>
			</nav>
		</BookmarkProvider>
	);
};

export default Navbar;

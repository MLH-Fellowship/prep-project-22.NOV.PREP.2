import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { Scrollbars } from 'react-custom-scrollbars';
import BookmarkCard from '../BookmarkCard';
import { toast } from 'react-toastify';
import '../../assets/css/BookmarkLocationsModal.css';

const BookmarkedLocationsModal = ({ isOpen, closeModal, clearBookmarks, ...rest }) => {
	const [bookmarkedLocations, setBookmarkedLocation] = useState([]);

	ReactModal.setAppElement('#root');

	useEffect(() => {
		const stringedBookmarks = localStorage.getItem('BookmarkedLocations');
		if (stringedBookmarks) {
			setBookmarkedLocation(JSON.parse(stringedBookmarks));
		} else {
			setBookmarkedLocation([]);
		}
	}, []);

	const handleClearBookmarks = () => {
		clearBookmarks();

		setBookmarkedLocation([]);

		toast.info('Bookmarks Cleared Successfully.', {
			position: 'top-right',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};

	return (
		<ReactModal
			isOpen={isOpen}
			contentLabel="modal"
			closeTimeoutMS={200}
			onRequestClose={() => closeModal()}
			preventScroll
			{...rest}
		>
			<Scrollbars className="custom-scrollbar" autoHide autoHideTimeout={500} autoHideDuration={200}>
				<div className="bookmark-header-wrapper">
					<h2>Saved Locations</h2>

					{bookmarkedLocations.length > 0 ? (
						<div className="clear-bookmark">
							<button onClick={handleClearBookmarks}>Clear Bookmarks</button>
						</div>
					) : null}
				</div>

				<div className="bookmark-container">
					{bookmarkedLocations.length > 0 ? (
						bookmarkedLocations.map((place) => {
							return <BookmarkCard place={place.name} />;
						})
					) : (
						<div className="empty-bookmark">
							<h3>No saved locations.</h3>
						</div>
					)}
				</div>
			</Scrollbars>
		</ReactModal>
	);
};

export default BookmarkedLocationsModal;

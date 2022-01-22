import React, { useState, useEffect } from 'react';
import { CloseIcon } from './icons/CloseIcon';
import { Button } from './reusable/Button';

export const Modal = ({ movie, isOpen, handleModal }) => {
	const [img, setImg] = useState();

	const closeModal = () => {
		handleModal(!isOpen);
	};

	const getImg = async () => {
		const res = await fetch(`${movie.posterURLs[185]}`);
		const imgBlob = await res.blob();
		const imageObjectURL = URL.createObjectURL(imgBlob);
		setImg(imageObjectURL);
	};

	useEffect(() => {
		getImg();
	}, []);
	return (
		<div id='modal-background'>
			<div id='centered'>
				<div id='modal-card'>
					<button
						id='close-modal-button'
						type='button'
						onClick={closeModal}
					>
						<CloseIcon />
					</button>
					<div>
						<img id='modal-img' src={img} alt='moive poster' />
						<div>
							<h3 className='genre-header'>Genre</h3>
							<ul className='genre-list'>
								{movie.genres.map((genre, index) => {
									return <li key={index}>{genre}</li>;
								})}
							</ul>
						</div>
					</div>

					<div id='modal-info-container'>
						<h1 className='movie-title'>{movie.title}</h1>

						<p className='movie-date'>{movie.year}</p>
						<p>{movie.overview}</p>
						<h3>Cast</h3>
						<p>{movie.cast.join(', ')}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

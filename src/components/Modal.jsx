import React, { useState, useEffect } from 'react';
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
					<Button
						id='close-modal-button'
						type='button'
						text='Close'
						onClick={closeModal}
					/>
					<img id='modal-img' src={img} alt='moive poster' />
					<div id='modal-info'>
						<h1>{movie.title}</h1>
						<p>{movie.year}</p>
						<p>{movie.overview}</p>
						<h3>Cast</h3>
						<p>{movie.cast.join(', ')}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

import React, { useEffect, useState } from 'react';
import { Button } from './reusable/Button';

export const MovieCard = ({ movie, handleModalData, controlModal }) => {
	const [img, setImg] = useState(null);

	const truncate = (str) => {
		if (str.length > 30) {
			return str.substr(0, 200) + '...';
		} else {
			return str;
		}
	};

	const getImg = async () => {
		const res = await fetch(`${movie.posterURLs[154]}`);
		const imgBlob = await res.blob();
		const imageObjectURL = URL.createObjectURL(imgBlob);
		setImg(imageObjectURL);
	};

	const setModalData = () => {
		handleModalData(movie);
		controlModal();
	};

	useEffect(() => {
		console.log('useEffeect ran');
		getImg();
	}, []);

	return (
		<div className='movie-card'>
			<h2 className='movie-title'>{movie.title}</h2>
			<div className='mid-card'>
				<img
					className='movie-poster'
					src={img}
					alt={`${movie.title} +  'poster'`}
				></img>
				<div className='mid-card-info'>
					<div>
						<p className='movie-date'>{movie.year}</p>
						<p className='movie-length'>{movie.runtime} mins</p>
					</div>
					<div>
						<p className='movie-rating'>
							Rating: {movie.imdbRating}%
						</p>
						<p>Votes: {movie.imdbVoteCount}</p>
					</div>
				</div>
			</div>
			<div>
				<p>{truncate(movie.overview)}</p>
				<div className='bottom-card'>
					<a
						className='movie-link'
						href={`https://www.youtube.com/watch?v=${movie.video}`}
						target='_blank'
						rel='noreferrer'
					>
						Watch trailer
					</a>
					<Button
						id='read-more'
						type='button'
						text='Read more...'
						onClick={setModalData}
					/>
				</div>
			</div>
		</div>
	);
};

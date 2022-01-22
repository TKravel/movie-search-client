import React, { useEffect, useState } from 'react';
import { AlertIcon } from './icons/AlertIcon';
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
		try {
			const res = await fetch(`${movie.posterURLs[154]}`);
			if (res.status !== 200) {
				return setImg(null);
			}
			const imgBlob = await res.blob();
			const imageObjectURL = URL.createObjectURL(imgBlob);
			setImg(imageObjectURL);
		} catch (err) {
			if (err) {
				setImg(null);
			}
		}
	};

	const setModalData = () => {
		handleModalData(movie);
		controlModal();
	};

	useEffect(() => {
		getImg();
	}, []);

	return (
		<div className='movie-card'>
			<h2 className='movie-title'>{movie.title}</h2>
			<div className='mid-card'>
				{img !== null ? (
					<img
						className='movie-poster'
						src={img}
						alt={movie.title + ' movie poster'}
					></img>
				) : (
					<div className='missing-movie-poster'>
						<p>
							<strong>Oops!</strong>
						</p>
						<AlertIcon id='missing-icon' />
						<p>
							We're having trouble finding that poster right now
						</p>
					</div>
				)}

				<div className='mid-card-info'>
					<div>
						<p className='movie-date'>{movie.year}</p>
						<p className='movie-length'>{movie.runtime} mins</p>
					</div>
					<div>
						<p>Language: {movie.originalLanguage}</p>
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

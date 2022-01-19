import React, { useEffect, useState } from 'react';

export const MovieCard = ({ movie }) => {
	const [img, setImg] = useState(null);

	const truncate = (str) => {
		if (str.length > 30) {
			return str.substr(0, 100) + '...';
		} else {
			return str;
		}
	};

	const getImg = async () => {
		const res = await fetch(`${movie.posterURLs[185]}`);
		const imgBlob = await res.blob();
		const imageObjectURL = URL.createObjectURL(imgBlob);
		setImg(imageObjectURL);
	};

	useEffect(() => {
		console.log('useEffeect ran');
		getImg();
	}, []);

	return (
		<div className='movie-card'>
			<h2>{movie.title}</h2>
			<div className='mid-card'>
				<img src={img} alt={`${movie.title} +  'poster'`}></img>
				<div>
					<p>{movie.year}</p>
					<p>{movie.runtime} mins</p>
				</div>
			</div>
			<div>
				<h3>{movie.tagline}</h3>
				<p>{truncate(movie.overview)}</p>
				<div className='bottom-card'>
					<a
						href={`https://www.youtube.com/watch?v=${movie.video}`}
						target='_blank'
						rel='noreferrer'
					>
						Watch trailer
					</a>
					<p>
						Rating: {movie.imdbRating}% / Votes:{' '}
						{movie.imdbVoteCount}
					</p>
				</div>
			</div>
		</div>
	);
};

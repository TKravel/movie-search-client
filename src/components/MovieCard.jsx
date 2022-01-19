import React, { useEffect, useState } from 'react';

export const MovieCard = ({ movie }) => {
	const [img, setImg] = useState(null);

	const data = {
		url: movie.posterURLs[500],
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
		<div>
			<h2>{movie.title}</h2>
			<div>
				<img src={img} alt={`${movie.title} +  'poster'`}></img>
				<div>
					<p>{movie.year}</p>
					<p>{movie.runtime} mins</p>
				</div>
				<h3>{movie.tagline}</h3>
				<p>{movie.overview}</p>
				<div>
					<a
						href={`https://www.youtube.com/watch?v=${movie.video}`}
						target='_blank'
						rel='noreferrer'
					>
						Trailer
					</a>
					<p>
						Rating: {movie.imdbRating} / votes:{' '}
						{movie.imdbVoteCount}
					</p>
				</div>
			</div>
		</div>
	);
};

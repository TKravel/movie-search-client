import React from 'react';
import tmdbIcon from '../img/TMDB.svg';
export const Footer = () => {
	return (
		<div id='footer'>
			<span>
				This product uses the TMDB API but is not endorsed or certified
				by TMDB
			</span>
			<img id='tmdb-icon' src={tmdbIcon}></img>
		</div>
	);
};

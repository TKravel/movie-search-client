import React from 'react';
import { Spinner } from './icons/Spinner';

export const SearchMsg = ({ searching, query, results, error }) => {
	// if error message return
	if (error !== null) {
		return null;
	}
	//  display welcome message or search spinner
	if (!searching && !results) {
		return (
			<div className='display-msg'>
				<h2>Welcome to Movie Search!</h2>
				<p>
					Search Netflix and Prime Video for available movies while
					filtering by year range and genre
				</p>
			</div>
		);
	} else if (searching && !results) {
		return (
			<div className='display-msg'>
				<h2>Looking for {query.genre} movies...</h2>
				<Spinner id='search-spinner' />
			</div>
		);
	} else {
		return null;
	}
};

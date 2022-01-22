import React from 'react';

export const ErrorMsg = ({ error }) => {
	//  return if no errors
	if (error === null) {
		return null;
	} else if (error.results) {
		//  alert user to no results found
		return (
			<div className='display-msg'>
				<h2>No results found!</h2>
				<p>Please widen your search and try again!</p>
			</div>
		);
	} else if (error.msg) {
		//  display error msg if error occurred
		return (
			<div className='display-msg'>
				<h2>Oops, something went wrong!</h2>
				<p>Please try again or check back later</p>
				<p>Sorry for the inconvenience</p>
				<p style={{ color: '#8d0801' }}>
					<strong>Error: {error.msg}</strong>
				</p>
			</div>
		);
	} else {
		//  return null as saftey net if nothing matches
		return null;
	}
};

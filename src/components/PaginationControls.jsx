import React from 'react';
import { Button } from './reusable/Button';

export const PaginationControls = ({ currentPage, pageCount, changePage }) => {
	const handleClick = (e) => {
		const action = e.target.id;
		e.preventDefault();

		changePage(action);
	};
	return (
		<div>
			<Button id='prev' type='button' text='Prev' onClick={handleClick} />
			<span>
				Page {currentPage} of {pageCount}
			</span>
			<Button id='next' type='button' text='Next' onClick={handleClick} />
		</div>
	);
};

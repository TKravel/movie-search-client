import React, { useEffect } from 'react';
import { Button } from './reusable/Button';
import { Spinner } from './icons/Spinner';

export const PaginationControls = ({
	currentPage,
	pageCount,
	changePage,
	fetchingNewPage,
}) => {
	const cardContainerTop = document.getElementById('card-container');
	const handleClick = (e) => {
		const action = e.target.id;
		e.preventDefault();
		changePage(action);
		cardContainerTop.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};

	return (
		<div className='page-control-container'>
			<Button id='prev' type='button' text='Prev' onClick={handleClick} />
			<span>
				Page {currentPage} of {pageCount}
			</span>
			<Button id='next' type='button' text='Next' onClick={handleClick} />
			{fetchingNewPage && <Spinner id='page-update-spinner' />}
		</div>
	);
};

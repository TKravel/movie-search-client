import { useEffect, useImperativeHandle } from 'react';
import { useState } from 'react/cjs/react.development';
import './App.css';
import { MovieCard } from './components/MovieCard';
import { SearchBar } from './components/navbar/SearchBar';
import { PaginationControls } from './components/PaginationControls';

function App() {
	const [searchQuery, setSearchQuery] = useState(null);
	const [searchResults, setSearchResults] = useState(null);
	const [totalPages, setTotalPages] = useState(0);
	const [page, setPage] = useState(1);

	const handlePage = (action) => {
		console.log(action);
		console.log(page);
		console.log(totalPages);
		if (action === 'prev') {
			if (page !== 1) {
				setPage((prevValue) => {
					return prevValue - 1;
				});
				setSearchQuery((prevValues) => {
					return {
						...prevValues,
						page: page,
					};
				});
			}
		} else if (action === 'next') {
			if (page !== totalPages) {
				setPage((prevValue) => {
					return prevValue + 1;
				});
				setSearchQuery((prevValues) => {
					return {
						...prevValues,
						page: page,
					};
				});
			}
		}
	};

	const buildQuery = (provider, dateRange, genre) => {
		const { netflix, prime } = provider;
		const { startDate, endDate } = dateRange;
		setSearchQuery({
			provider: netflix ? 'netflix' : 'prime',
			startDate: startDate === '' ? '1900' : startDate,
			endDate: endDate,
			genre: { ...genre },
			page: page,
		});
	};

	useEffect(() => {
		console.log(searchQuery);
		if (searchQuery === null) {
			return;
		}
		fetch('http://localhost:3001', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(searchQuery),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.docs && data.count) {
					setSearchResults(data.docs);
					setTotalPages(data.count);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, [searchQuery]);

	return (
		<div className='App'>
			<SearchBar liftData={buildQuery} />
			{searchResults !== null && (
				<PaginationControls
					currentPage={page}
					pageCount={totalPages}
					changePage={handlePage}
				/>
			)}
			{searchResults !== null
				? searchResults.map((result) => {
						return <MovieCard key={result.tmdbID} movie={result} />;
				  })
				: null}
			{searchResults !== null && (
				<PaginationControls
					currentPage={page}
					pageCount={totalPages}
					changePage={handlePage}
				/>
			)}
		</div>
	);
}

export default App;

import { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import './App.css';
import { MovieCard } from './components/MovieCard';
import { SearchBar } from './components/navbar/SearchBar';

function App() {
	const [searchQuery, setSearchQuery] = useState(null);
	const [searchResults, setSearchResults] = useState(null);
	const [totalPages, setTotalPages] = useState(0);

	const buildQuery = (provider, dateRange, genre) => {
		const { netflix, prime } = provider;
		const { startDate, endDate } = dateRange;
		setSearchQuery({
			provider: netflix ? 'netflix' : 'prime',
			startDate: startDate === '' ? '1900' : startDate,
			endDate: endDate,
			// rating: rating,
			genre: { ...genre },
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
			{searchResults !== null
				? searchResults.map((result) => {
						return <MovieCard key={result.tmdbID} movie={result} />;
				  })
				: null}
		</div>
	);
}

export default App;

import { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import './App.css';
import { Footer } from './components/Footer';
import { Modal } from './components/Modal';
import { MovieCard } from './components/MovieCard';
import { SearchBar } from './components/navbar/SearchBar';
import { PaginationControls } from './components/PaginationControls';

function App() {
	const [searchQuery, setSearchQuery] = useState(null);
	const [searchResults, setSearchResults] = useState(null);
	const [totalPages, setTotalPages] = useState(0);
	const [page, setPage] = useState(1);
	const [modalOpened, setModalOpened] = useState(false);
	const [modalData, setModalData] = useState(null);

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

	const handleModal = () => {
		setModalOpened(!modalOpened);
	};

	const buildQuery = (provider, dateRange, genre, sort) => {
		const { netflix } = provider;
		const { startDate, endDate } = dateRange;
		const { title } = sort;
		setSearchQuery({
			provider: netflix ? 'netflix' : 'prime',
			startDate: startDate === '' ? '1900' : startDate,
			endDate: endDate,
			genre: { ...genre },
			sort: title ? 'original_title' : 'year',
			page: page,
		});
	};

	useEffect(() => {
		if (modalOpened) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
	}, [modalOpened]);

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
		<div id='app-wrapper'>
			<div id='App'>
				<SearchBar liftData={buildQuery} />
				<div id='card-container'>
					{!searchResults && (
						<div id='start-msg'>
							<h2>Start searching!</h2>
						</div>
					)}
					{searchResults !== null && (
						<PaginationControls
							currentPage={page}
							pageCount={totalPages}
							changePage={handlePage}
						/>
					)}
					{searchResults !== null
						? searchResults.map((result) => {
								return (
									<MovieCard
										key={result.tmdbID}
										movie={result}
										handleModalData={setModalData}
										controlModal={handleModal}
									/>
								);
						  })
						: null}
					{searchResults !== null && (
						<PaginationControls
							currentPage={page}
							pageCount={totalPages}
							changePage={handlePage}
						/>
					)}
					{modalOpened && (
						<Modal
							movie={modalData}
							isOpen={modalOpened}
							handleModal={setModalOpened}
						/>
					)}
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default App;

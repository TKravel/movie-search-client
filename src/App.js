import { useEffect, useState } from 'react';
import './App.css';
import { Footer } from './components/Footer';
import { Modal } from './components/Modal';
import { MovieCard } from './components/MovieCard';
import { SearchBar } from './components/navbar/SearchBar';
import { PaginationControls } from './components/PaginationControls';
import { ErrorMsg } from './components/ErrorMsg';
import { SearchMsg } from './components/SearchMsg';

function App() {
	const [searchQuery, setSearchQuery] = useState(null);
	const [searchResults, setSearchResults] = useState(null);
	const [totalPages, setTotalPages] = useState(0);
	const [page, setPage] = useState(1);
	const [modalOpened, setModalOpened] = useState(false);
	const [modalData, setModalData] = useState(null);
	const [isSearching, setIsSearching] = useState(false);
	const [loadingNewPage, setLoadingNewPage] = useState(false);
	const [errors, setErrors] = useState(null);

	const handlePage = (action) => {
		if (action === 'prev') {
			if (page !== 1) {
				setLoadingNewPage(true);
				setSearchQuery((prevValues) => {
					return {
						...prevValues,
						page: page - 1,
					};
				});
				setPage((prevValue) => {
					return prevValue - 1;
				});
			}
		} else if (action === 'next') {
			if (page !== totalPages) {
				setLoadingNewPage(true);
				setSearchQuery((prevValues) => {
					return {
						...prevValues,
						page: page + 1,
					};
				});
				setPage((prevValue) => {
					return prevValue + 1;
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
		setSearchResults(null);
		setErrors(null);
		setPage(1);
		setSearchQuery({
			provider: netflix ? 'netflix' : 'prime',
			startDate: startDate === '' ? '1900' : startDate,
			endDate: endDate,
			genre: genre,
			sort: title ? 'original_title' : 'year',
			page: 1,
		});
		setIsSearching(true);
	};

	useEffect(() => {
		if (modalOpened) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
	}, [modalOpened]);

	useEffect(() => {
		if (searchQuery === null) {
			return;
		}
		fetch(`${process.env.REACT_APP_SERVER}/search`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(searchQuery),
		})
			.then((response) => response.json())
			.then((data) => {
				setIsSearching(false);
				if (data.err) {
					console.log(data.err);
					setErrors({ error: true, msg: data.err });
				} else if (data.docs.length === 0) {
					setErrors({ results: true });
				} else if (data.docs && data.count) {
					setSearchResults(data.docs);
					setTotalPages(data.count);
					setIsSearching(false);
					setLoadingNewPage(false);
				}
			})
			.catch((err) => {
				console.log(err);
				setErrors({ error: true, msg: Error.message });
			});
	}, [searchQuery]);

	return (
		<div id='app-wrapper'>
			<div id='App'>
				<SearchBar liftData={buildQuery} />
				<div id='card-container'>
					<SearchMsg
						searching={isSearching}
						query={searchQuery}
						results={searchResults}
						error={errors}
					/>
					<ErrorMsg error={errors} />
					{searchResults !== null && (
						<>
							<PaginationControls
								currentPage={page}
								pageCount={totalPages}
								changePage={handlePage}
								fetchingNewPage={loadingNewPage}
							/>
							{searchResults.map((result) => {
								return (
									<MovieCard
										key={result.tmdbID}
										movie={result}
										handleModalData={setModalData}
										controlModal={handleModal}
									/>
								);
							})}
							<PaginationControls
								currentPage={page}
								pageCount={totalPages}
								changePage={handlePage}
								loadingPage={loadingNewPage}
								setLoadingPage={setLoadingNewPage}
							/>
						</>
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

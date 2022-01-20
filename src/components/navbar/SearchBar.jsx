import React, { useState } from 'react';
import { Button } from '../reusable/Button';
import { Checkbox } from './Checkbox';
import { NumberInput } from './NumberInput';
import { RadioButton } from './RadioButton';
// import { RangeInput } from './RangeInput';

export const SearchBar = ({ liftData }) => {
	const [provider, setProvider] = useState({
		netflix: true,
		prime: false,
	});
	const [dateRange, setDateRange] = useState({
		startDate: '',
		endDate: '2022',
	});
	// const [rating, setRating] = useState(75);
	const [genreSelection, setGenreSelection] = useState({
		action: false,
		comedy: false,
		drama: false,
		fantasy: false,
		horror: false,
		mystery: false,
		romance: false,
		thriller: false,
		western: false,
	});

	const [sort, setSort] = useState({
		title: true,
		year: false,
	});

	const handleProvider = (e) => {
		const box = e.target.id;
		if (box === 'netflix') {
			setProvider({
				netflix: true,
				prime: false,
			});
		} else {
			setProvider({
				netflix: false,
				prime: true,
			});
		}
	};

	const handleDate = (e) => {
		const dateSelection = e.target.id;
		const value = e.target.value;

		if (value.length > 4) {
			return;
		}

		setDateRange((prevValues) => {
			return {
				...prevValues,
				[dateSelection]: value,
			};
		});
	};

	// const handleRating = (e) => {
	// 	const value = e.target.value;
	// 	console.log(value);

	// 	setRating(value);
	// };

	const handleGenre = (e) => {
		const box = e.target.id;
		const value = e.target.checked;

		setGenreSelection((prevValues) => {
			return {
				...prevValues,
				[box]: value,
			};
		});
	};

	const handleSort = (e) => {
		const selection = e.target.id;
		if (selection === 'title') {
			setSort({
				title: true,
				year: false,
			});
		} else {
			setSort({
				title: false,
				year: true,
			});
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(provider, dateRange, genreSelection);
		liftData(provider, dateRange, genreSelection, sort);
	};
	return (
		<nav id='nav'>
			<form id='nav-form' onSubmit={handleSubmit}>
				<h1>Movie search</h1>

				<fieldset id='fieldset-provider'>
					<legend>Provider</legend>
					<div>
						<RadioButton
							id='netflix'
							label='Netflix'
							value={provider.netflix}
							onChange={handleProvider}
						/>
					</div>
					<div>
						<RadioButton
							id='prime'
							label='Prime'
							value={provider.prime}
							onChange={handleProvider}
						/>
					</div>
				</fieldset>
				<fieldset id='fieldset-year'>
					<legend>Year range</legend>
					<div>
						<NumberInput
							id='startDate'
							label='Start'
							min='1900'
							max='2022'
							value={dateRange.startDate}
							onChange={handleDate}
						/>
					</div>
					<div>
						<NumberInput
							id='endDate'
							label='End'
							min='1900'
							max='2022'
							value={dateRange.endDate}
							onChange={handleDate}
						/>
					</div>
				</fieldset>
				<fieldset id='fieldset-genres'>
					<legend>Genre</legend>
					<div id='genre-container'>
						<Checkbox
							id='action'
							label='Action'
							value={genreSelection.action}
							onChange={handleGenre}
						/>
						<Checkbox
							id='comedy'
							label='Comedy'
							value={genreSelection.comedy}
							onChange={handleGenre}
						/>
						<Checkbox
							id='drama'
							label='Drama'
							value={genreSelection.drama}
							onChange={handleGenre}
						/>
						<Checkbox
							id='fantasy'
							label='Fantasy'
							value={genreSelection.fantasy}
							onChange={handleGenre}
						/>
						<Checkbox
							id='horror'
							label='Horror'
							value={genreSelection.horror}
							onChange={handleGenre}
						/>
						<Checkbox
							id='mystery'
							label='Mystery'
							value={genreSelection.mystery}
							onChange={handleGenre}
						/>
						<Checkbox
							id='romance'
							label='Romance'
							value={genreSelection.romance}
							onChange={handleGenre}
						/>
						<Checkbox
							id='thriller'
							label='Thriller'
							value={genreSelection.Thriller}
							onChange={handleGenre}
						/>
						<Checkbox
							id='western'
							label='Western'
							value={genreSelection.western}
							onChange={handleGenre}
						/>
					</div>
				</fieldset>
				<fieldset id='fieldset-sort'>
					<legend>Sort by</legend>
					<div>
						<RadioButton
							id='title'
							label='Title'
							value={sort.title}
							onChange={handleSort}
						/>
					</div>
					<div>
						<RadioButton
							id='year'
							label='Year'
							value={sort.year}
							onChange={handleSort}
						/>
					</div>
				</fieldset>
				<Button id='search-button' type='submit' text='Search' />
			</form>
		</nav>
	);
};

import React, { useState } from 'react';
import { Button } from '../reusable/Button';
import { Checkbox } from './Checkbox';
import { NumberInput } from './NumberInput';
import { RangeInput } from './RangeInput';

export const SearchBar = () => {
	const [checkboxes, setCheckboxes] = useState({
		netflix: true,
		prime: true,
	});
	const [startDate, setStartDate] = useState('');
	const [dateRange, setDateRange] = useState({
		startDate: '',
		endDate: '2022',
	});
	const [rating, setRating] = useState(75);
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

	const handleCheckboxes = (e) => {
		const box = e.target.id;
		const value = e.target.checked;
		console.log('clicked');
		setCheckboxes((prevValues) => {
			return {
				...prevValues,
				[box]: value,
			};
		});
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

	const handleRating = (e) => {
		const value = e.target.value;
		console.log(value);

		setRating(value);
	};

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

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(checkboxes, dateRange, rating, genreSelection);
	};
	return (
		<nav>
			<form onSubmit={handleSubmit}>
				<h1>Movie search</h1>
				<p>Provider</p>
				<Checkbox
					id='netflix'
					name='netflix'
					label='Netflix'
					value={checkboxes.netflix}
					onChange={handleCheckboxes}
				/>
				<Checkbox
					id='prime'
					name='prime'
					label='Prime'
					value={checkboxes.prime}
					onChange={handleCheckboxes}
				/>
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
				<RangeInput
					id='rating'
					label='Rating'
					value={rating}
					onChange={handleRating}
				/>
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
				<Button id='search-button' type='submit' text='Search' />
			</form>
		</nav>
	);
};

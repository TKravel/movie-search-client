import React from 'react';

export const NumberInput = ({ id, label, min, max, value, onChange }) => {
	return (
		<label htmlFor='id'>
			<input
				id={id}
				name={id}
				type='number'
				placeholder={min}
				min={min}
				max={max}
				value={value}
				onChange={onChange}
			/>
			{label}
		</label>
	);
};

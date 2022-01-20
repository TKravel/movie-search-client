import React from 'react';

export const NumberInput = ({ id, label, min, max, value, onChange }) => {
	return (
		<label htmlFor='id' className='num-input-flexbox'>
			{label}
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
		</label>
	);
};

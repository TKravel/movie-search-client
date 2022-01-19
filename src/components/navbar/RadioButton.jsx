import React from 'react';

export const RadioButton = ({ id, value, onChange, label }) => {
	return (
		<label htmlFor={id}>
			<input
				type='radio'
				id={id}
				name={id}
				checked={value}
				onChange={onChange}
			/>
			{label}
		</label>
	);
};

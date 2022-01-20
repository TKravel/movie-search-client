import React from 'react';

export const RadioButton = ({ id, value, onChange, label }) => {
	return (
		<div className='radio-wrapper'>
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
		</div>
	);
};

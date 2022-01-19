import React from 'react';

export const RangeInput = ({ id, label, value, onChange }) => {
	return (
		<div>
			<label htmlFor={id}>
				<input
					id={id}
					name={id}
					type='range'
					value={value}
					onChange={onChange}
				/>
				{label} <span> above {value}%</span>
			</label>
		</div>
	);
};

import React from 'react';

export const Checkbox = ({ id, label, value, onChange }) => {
	return (
		<div>
			<label htmlFor={id}>
				<input
					type='checkbox'
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

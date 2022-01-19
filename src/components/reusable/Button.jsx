import React from 'react';

export const Button = ({ id, type, text }) => {
	return (
		<button id={id} type={type}>
			{text}
		</button>
	);
};

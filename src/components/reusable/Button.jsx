import React from 'react';

export const Button = ({ id, type, text, onClick }) => {
	return (
		<button id={id} type={type} onClick={onClick}>
			{text}
		</button>
	);
};

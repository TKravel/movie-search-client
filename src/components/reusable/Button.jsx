import React from 'react';

export const Button = ({ id, type, text, onClick }) => {
	return (
		<button id={id} className='button' type={type} onClick={onClick}>
			{text}
		</button>
	);
};

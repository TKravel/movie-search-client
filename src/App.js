import { useEffect } from 'react';
import './App.css';
import { SearchBar } from './components/navbar/SearchBar';

function App() {
	useEffect(() => {
		fetch('http://localhost:3001', {
			method: 'GET',
		});
	}, []);
	return (
		<div className='App'>
			<SearchBar />
		</div>
	);
}

export default App;

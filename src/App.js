import React from 'react';
import { Grid } from '@material-ui/core';
import './App.scss';
import List from './components/list';

function App() {
	return (
		<Grid className="App">
			<List />
		</Grid>
	);
}

export default App;

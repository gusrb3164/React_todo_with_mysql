import React, { useEffect, useState } from 'react';
import Header from './header';
import { Grid, Paper } from '@material-ui/core';
import Todo from './todo';
import Http from '../axios';
import Add from './add';

const List = () => {
	const [list, setList] = useState(['']);
	const [error, setError] = useState(null);
	useEffect(() => {
		const fetchList = async () => {
			try {
				const response = await Http.get('/');
				setList(response.data);
			} catch (e) {
				setError(e);
			}
		};
		fetchList();
	}, []);
	if (error) return <Grid className="list">에러가 발생했습니다.</Grid>;
	return (
		<Paper elevation={10} className="container-paper">
			<Grid className="list">
				<Header />
				{list.map((todo) => (
					<Todo
						key={todo.id}
						id={todo.id}
						text={todo.text}
						result={todo.result}
					/>
				))}
				<Add />
			</Grid>
		</Paper>
	);
};

export default List;

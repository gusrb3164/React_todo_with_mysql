import { Grid, Paper, IconButton } from '@material-ui/core';
import React, { useState } from 'react';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import Http from '../axios';

const Todo = ({ id, text, result }) => {
	const [done, setDone] = useState(result);

	const clickDone = async ({ id, result }) => {
		var body = new URLSearchParams();
		body.append('result', result);

		try {
			var temp = '/' + id;
			const response = await Http.post(temp, body);
			if (response.status === 200) {
				setDone((prev) => prev * -1);
			}
		} catch (e) {
			alert('수정오류가 발생했습니다.');
		}
	};

	const clickDelete = async ({ id }) => {
		try {
			var temp = '/' + id;
			await Http.delete(temp);
			window.location.reload();
		} catch (e) {
			alert('삭제오류가 발생했습니다.');
		}
	};
	return (
		<Paper>
			<Grid container className="todo" direction="row">
				{done === 1 ? (
					<Grid item className="done" xs={9}>
						{text}
					</Grid>
				) : (
					<Grid className="not-done" item xs={9}>
						{text}
					</Grid>
				)}

				<Grid item xs={1}>
					<IconButton
						onClick={() => {
							clickDone({ id, result });
						}}
						aria-label="done"
					>
						<DoneIcon />
					</IconButton>
				</Grid>
				<Grid item xs={1}>
					<IconButton
						onClick={() => {
							clickDelete({ id });
						}}
						aria-label="delete"
					>
						<DeleteIcon />
					</IconButton>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default Todo;

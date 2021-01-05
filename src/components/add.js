import React, { useRef } from 'react';
import { Grid, Paper, TextField, IconButton } from '@material-ui/core';
import Http from '../axios';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const Add = () => {
	const textInput = useRef();
	const clickAdd = async () => {
		var text = textInput.current.value;
		if (text === '') {
			return;
		} else {
			var body = new URLSearchParams();
			body.append('text', text);
			try {
				await Http.put('/', body);
				window.location.reload();
			} catch (e) {
				alert('추가오류가 발생했습니다.');
			}
		}
	};
	return (
		<Paper>
			<Grid container className="add" direction="row">
				<Grid className="add-text" item xs={10}>
					<TextField className="add-textfield" inputRef={textInput} label="todo"></TextField>
				</Grid>
				<Grid item className="add-btn" xs={2}>
					<IconButton>
						<AddCircleOutlineIcon
							onClick={() => {
								clickAdd();
							}}
							aria-label="delete"
						/>
					</IconButton>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default Add;

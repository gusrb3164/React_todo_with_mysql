var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var client = mysql.createConnection({
	user: 'root',
	password: '1234',
	database: 'Company',
});

var app = express();
app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	})
);
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);

app.listen(3001, function () {
	console.log('server running at http://localhost:3001');
});

app.get('/', function (request, response) {
	client.query('SELECT * FROM todos', function (error, data) {
		if (error) {
			console.log('get 에러 발생');
		} else {
			response.send(data);
		}
	});
});
app.put('/', function (request, response) {
	var body = request.body;

	client.query(
		'INSERT INTO todos (text,result) values (?,?)',
		[body.text, -1],
		function (error) {
			if (error) {
				console.log('put 에러 발생');
			} else {
				response.sendStatus(200);
			}
		}
	);
});
app.post('/:id', function (request, response) {
	var body = request.body;

	client.query(
		'UPDATE todos SET result=? WHERE id=?',
		[body.result * -1, request.params.id],
		function (error) {
			if (error) {
				console.log('post 에러 발생');
			} else {
				response.sendStatus(200);
			}
		}
	);
});

app.delete('/:id', function (request, response) {
	client.query(
		'DELETE FROM todos WHERE id=?',
		[request.params.id],
		function (error) {
			if (error) {
				console.log('delete 에러 발생');
			} else {
				response.sendStatus(200);
			}
		}
	);
});

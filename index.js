/**
 * Email:  eteplus@163.com
 * Author: eteplus
 * Date:   15/7/12
 * Time:   10:04
 */
var express = require('express');
var io = require('socket.io');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var db = require('./server/models/');
var app = express();
var port = process.env.PORT || 3000;

//将请求的资源地址重定向
app.use(express.static(__dirname + '/public'));
//app.use('/angular',express.static(__dirname + '/node_modules/angular'));

app.use(bodyParser());
app.use(cookieParser());
app.use(session({
	secret: 'chatroom',
	cookie: {
		maxAge: 60 * 1000
	}
}));

app.get('/', function(req ,res) {
	res.sendFile('index.html');
});

app.get('/api/validate', function(req, res) {
	var _userId = req.session._userId;
	console.log(_userId);
	if(_userId) {
		db.User.findUserById(_userId, function(err, user) {
			if(err) {
				res.status(401).json({msg: err});
			}
			else {
				res.json(user);
			}
		});
	}
	else {
		res.status(401).json(null);
	}
});
app.post('/api/login', function(req, res) {
	var email = req.body.email;
	if(email) {
		db.User.findUserByEmail(email, function(err, user) {
			if(err) {
				res.status(500).json({msg: err});
			}
			else {
				req.session._userId = user._id;
				res.json(user);
			}
		})
	}
	else {
		res.status(403);
	}
});

app.get('/api/logout', function(req, res) {
	req.session._userId = null;
	res.status(200).json(null);
});

var sockets = io.listen(app.listen(port,'127.0.0.1')).sockets;
var messages = [];
sockets.on('connection',function(socket){
	//监听getAllMessage事件
	socket.on('getAllMessages',function(){
		//触发allMessages事件
		socket.emit('allMessages',messages);
	});
	socket.on('createMessage',function(message){
		messages.push(message);
		socket.emit('messageAdded',message);
	})
});
console.log('Socket is on port ' + port);


/**
 * Email:  eteplus@163.com
 * Author: eteplus
 * Date:   15/7/15
 * Time:   11:01
 */
var mongoose = require('mongoose');
var gravatar = require('gravatar');
//连接mongodb数据库
//连接字符串格式：mongodb://主机/数据库名
mongoose.connect('mongodb://127.0.0.1:27017/chatroom');

var Schema = mongoose.Schema;
//User骨架模板
var UserSchema = new Schema({
	email: String,
	name: String,
	avatarUrl: String
});
//User模型
var UserModel = mongoose.model('user',UserSchema);

exports.findUserById = function(_userId, callback) {
	UserModel.findOne({
		_id: _userId
	}, callback);
};

exports.findUserByEmail = function(email, callback) {
	UserModel.findOne({
		email: email
	}, function(err, user) {
		if(user) {
			callback(null, user);
		}
		else {
			user = new UserModel({
				email: email,
				name: email.split('@')[0],
				avatarUrl: gravatar.url(email)
			});
			user.save(callback);
		}
	})
};

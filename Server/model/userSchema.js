var mongoose = require('./db.js');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username : {type : String, default: ""},
	password : {type : String, default: ""},
	redHeart_list: {type: Array, default: []}					// 列表中元素格式:
																// {pid: P0001, sid: S0001}
});

var User = mongoose.model('User', userSchema);

// 添加mongoose中的中间件： 实现做额外的自定义事件处理
// 这里实现修改editTime
// User.schema.pre('create', function(next){
//	var user = this;
//	user.editTime = new Date();
//	next();
// });

module.exports = User;



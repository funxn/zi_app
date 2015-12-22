var mongoose = require('./db.js');
var Schema = mongoose.Schema;

var poetrySchema = new Schema({
	pid: {type : String, default: ""},
	bgColor_list: {type: Array, default: []},
	song_list: {type: Array, default: []},
	content: {
		title: {type: String, default: ""},
		author: {type: String, default: ""},
		lines: {type: String, default: ""}
	}
});

module.exports = mongoose.model('poems', poetrySchema);
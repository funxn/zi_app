var mongoose = require('./db.js');
var Schema = mongoose.Schema;
 
var songSchema = new Schema({
	sid: {type : String, default: ""}
});

module.exports = mongoose.model('Song', songSchema);

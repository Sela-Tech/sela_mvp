// libraries
var gm = require('gm');
var im = require('imagemagick');
var mongoose = require('mongoose');
var fs = require('fs');
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
// classes
var ObjectId = mongoose.Schema.Types.ObjectId;

var gridfs;

var GridfsHelper = function() {
	var self = this;
	
	mongoose.connection.once('open', function () {
		gridfs = Grid(mongoose.connection.db);
	});

    self.write = function(id, path, callback) {};

    self.read = function(id, preset, callback) {};

    self.remove = function(id, callback) {};

	return {
		write: self.write,
		read: self.read,
		remove: self.remove
	};

};

module.exports = GridfsHelper;
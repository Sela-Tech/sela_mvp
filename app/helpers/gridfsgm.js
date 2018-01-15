import {lchmod} from 'fs';

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

    self.remove = function(id, callback) {

		if (!id) {
			callback(true, null);
			return;
		}

		gridfs.files.findOne({
			_id: ObjectId(id)
		}, function(err, file) {
			if(err) {
				callback(err, null);
				return;
			}

			if(!file) {
				callback(null, null);
				return;
			}

			var i = 0;
			var watch = function(err, result) {};

			// ONLY use this logic if add metadata to files
			// if(file.metadata) {
			// 	gridfs.remove({
			// 		_id: file.metadata
			// 	}, watch);
			// } else {
			// 	watch(null, null);
			// }

			gridfs.remove({
				_id: id
			}, watch);
		});
	};

	return {
		write: self.write,
		read: self.read,
		remove: self.remove
	};

};

module.exports = GridfsHelper;
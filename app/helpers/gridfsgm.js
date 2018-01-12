// libraries
var gm = require('gm');
var im = require('imagemagick');
var mongo = require('mongodb');
var fs = require('fs');
var Grid = require('gridfs-stream');

// classes
var ObjectId = require('mongoose').Schema.Types.ObjectId;

var GridfsHelper = function() {
    var self = this;

    self.write = function() {};

    self.read = function() {};

    self.remove = function() {};

	return {
		write: self.write,
		read: self.read,
		remove: self.remove
	};

};

module.exports = GridfsHelper;
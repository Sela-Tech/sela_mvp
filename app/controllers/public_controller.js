// classes
var Controller = require('./base_controller');

// instances
var controller = new Controller();

controller.index = function(req, res, next) {

    res.sendFile('index.html', {
        root: FRONTEND + '/index'
    });

};

controller.project = function(req, res, next) {
    res.sendFile('material_project.html', {
        root: FRONTEND + '/project_creation'
    });
};

controller.login = function(req, res, next) {

};

module.exports = controller;
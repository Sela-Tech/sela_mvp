module.exports = function(connection) {
    require('./chat.js')(connection);
    require('./organization.js')(connection);
    require('./password_reset.js')(connection);
    require('./project.js')(connection);
    require('./project_contractor.js')(connection);
    require('./project_observer.js')(connection);
    require('./task.js')(connection);
    require('./user.js')(connection);
    require('./verification.js')(connection);
};

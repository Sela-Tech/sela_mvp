var fs = require('fs');

var public = require(ROOT + '/app/controllers/public_controller');
module.exports = function routes() {

    // working sites
    this.get('/', public.index);
    this.get('/project', public.project);


};
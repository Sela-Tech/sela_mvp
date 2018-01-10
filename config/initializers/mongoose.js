var mongoose = require('mongoose');

//Uncomment to turn on debugging
//mongoose.set('debug', true)

module.exports = function(done) {

    done = (typeof done === 'function') ? done : function() {};


    console.log('Initializer: Mongoose started');

    // the mongoose models and the mongoose connection don't need to happen in order

    require(ROOT + '/app/models')();
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.MONGOLAB_URI, { useMongoClient: true });

    mongoose.connection.on('error', function(err) {
        console.log('Error MONGOOSE: ' + err);
    });

    mongoose.connection.on('connected', function() {
        done();
    });

    console.log('Initializer: Mongoose completed');

};
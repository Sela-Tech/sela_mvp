var express = require('express');
var path = require('path');

module.exports = function() {

    this.use(express.static(FRONTEND));

    // adds additional logging information to the console
    if (process.env.LOG_LINES === 'true') {
        ['log', 'warn'].forEach(function(method) {
            var old = console[method];
            console[method] = function() {
                var stack = (new Error()).stack.split(/\n/);
                var args = [].slice.apply(arguments).concat([stack[1].trim()]);
                return old.apply(console, args);
            };
        });
    }

};
var Controller = function() {};

Controller.prototype.before = function(routes, fn) {
    var self = this;

    self._befores = self._befores || {};
    self._handlers = self._handlers || {};

    var route;

    for (var i = 0, j = routes.length; i < j; i++) {
        route = routes[i];

        for (var key in self) {
            if (key === 'before' || key === '_befores' || key === '_handlers') {
                continue;
            }

            if (route !== key && route !== '*') {
                continue;
            }

            // save the before into the befores array
            self._befores[key] = self._befores[key] || [];
            self._befores[key].push(fn);

            // save the route handler into the handlers array
            self._handlers[key] = self._handlers[key] || self[key];

            (function(self, key) {

                // replace the controller key with a generic function to trigger the before function chain
                self[key] = function(req, res, next) {

                    var befores = [];

                    var handler = self._handlers[key].bind({}, req, res, next);

                    // loop over each before binding it to the req, res, and the next before handler
                    // this has to be in reverse so the next binded function exists before binding occurs
                    for (var i = self._befores[key].length - 1; i >= 0; i--) {

                        // there is still a next before and it should be bound
                        if (self._befores[key][i + 1]) {
                            befores[i] = self._befores[key][i].bind({}, req, res, befores[i + 1]);
                        }

                        // there are no more befores and the last function should be the route handler;
                        else {
                            befores[i] = self._befores[key][i].bind({}, req, res, handler);
                        }

                    }

                    befores[0]();

                };

            })(self, key);
        }
    }
};

module.exports = Controller;
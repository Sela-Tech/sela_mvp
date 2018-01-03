var Controller = function() {};

Controller.prototype.before = function(routes, fn) {
    var self = this;

    self._befores = self._befores || {};
    self._handlers = self._handlers || {};

    var route;

    for (var i = 0, j = routes.length; i < j; i++) {
        route = routes[i];

        for (const key in self) {
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

            })(self, key);
        }
    }
}
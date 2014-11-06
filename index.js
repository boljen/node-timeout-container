/**
 * This is a container meant to be used as a timeout manager. It has some very
 * specific characteristics making it especially suitable for certain use cases.
 *
 * The first characteristic is that the container works with an interval. This
 * interval will periodically check whether keys have timed out. If that is the
 * case, the key will be removed from the container and a callback
 * will be executed.
 *
 * The second characteristic is that you can also manually check whether a key
 * has timed out. In that case, the above check will be performed as well, but
 * limited to that specific key.
 *
 * The third characteristic is that you can actually store values in this
 * container as well. These values will also be dereferenced upon the timeout
 * event. You do have to explicitly enable this behavior.
 *
 * @param {Integer} timeout - The amount of time for a value to time out.
 * @param {Integer} interval - The amount of time for an interval to hit.
 * @param {Function} callback - The callback to call upon a key timeout.
 */
var TimeoutContainer = function(cfg, cb) {

  this._t = cfg.timeout;

  if (cfg.interval >= 0)
    this._i = cfg.interval;
  else
    this._i = 1000;

  this._i = cfg.interval || 1000;
  this._c = cb;

  this.setInterval(this._i);
};

TimeoutContainer.prototype.setInterval = function(interval) {
  this._t = interval;
  var self = this;

  if (this._runner) {

  }

  if (timeout > 0) {
    this._runner = setInterval(function() {
      self._refreshAll();
    }, interval);
  }
};

TimeoutContainer.prototype.setTimeout = function(timeout) {

};

TimeoutContainer.prototype.clean = function() {

};

TimeoutContainer.prototype.cleanAll = function() {

};

TimeoutContainer.prototype.remove = function(key) {

};

TimeoutContainer.prototype.push = function(key, callback, timeout) {

};

TimeoutContainer.prototype.pull = function(key) {

};

TimeoutContainer.prototype.alive = function(key) {

};

TimeoutContainer.prototype.listen = function(key, callback) {
  if (!key)
    key = this._l;
};

module.exports = TimeoutContainer;

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
 * @param {Integer} config.timeout - The amount of time for a value to time out.
 * When you do not manually specify a timeout, this will be the value which will
 * be called.
 *
 * @param {Integer} config.interval - The amount of time for an interval to hit.
 * If no interval is set, or the interval is 0, no interval-timer will be
 * created.
 *
 * @param {Integer} config.max - The maximum amount of keys in this container.
 * By default max is 0 (=infinite)
 *
 * @param {Function} callback - The callback to call upon a key timeout, only
 * relevant if a timer is actually running.
 */
var TimeoutContainer = function(cfg, cb) {

  // Empties
  this._timeout = 0;
  this._timeoutBlocks = 0;

  // Configuration
  this._interval = (cfg.interval && cfg.interval > 0) ? cfg.interval : this._timeout;
  this.setTimeout(cfg.timeout);
  this._callback = cb;

  // setup
  this._total = 0;          // total keys
  this._totalInterval = 0;  // total keys in interval object

  this._nextInterval = 0;       // Interval to be executed next
  this._intervals = {};     // Intervals queue'd for execution

  this._keys = {};  // all the keys with their interval block or closure
  this._timer = null;
};

TimeoutContainer.prototype.setCallback = function(callback) {
  this._callback = callback;
};

TimeoutContainer.prototype.setTimeout = function(timeout) {
  this._timeout = timeout;
  this._timeoutBlocks = Math.ceil(this._timeout / this._interval);
};

TimeoutContainer.prototype.push = function(key, timeout) {

  if (this._keys[key])
    return this.keepAlive(key);

  var block, expire;

  if (timeout)
    block = Math.ceil(timeout / this._interval);
  else
    block = this._timeoutBlocks;

  block = block+this._nextInterval;

  if (!this._intervals[block])
    this._intervals[block] = [];

  var index = this._intervals[block].push(key)-1;
  expire = Date.now();

  this._keys[key] = [block, index, expire];
  if (this._totalInterval === 0)
    this.startIntervalTimer();
  this._total++;
  this._totalInterval++;
};

TimeoutContainer.prototype.pull = function(key) {
  if (!this._keys[key])
    return false;

  var k = this._keys[key];

  this._total--;
  this._totalInterval--;

  this._intervals[k[0]].splice(k[1], 1);

  if (this._intervals[k[0]].length === 0)
    delete this._intervals[k[0]];

  delete this._keys[key];

  if (this._totalInterval === 0)
    this.stopIntervalTimer();

  if (k[2] >= Date.now()) {
    return true;
  } else {
    this._callback(key);
    return false;
  }
};

TimeoutContainer.prototype.clearInterval = function() {
  var ci = this._intervals[this._nextInterval];

  if (ci) {

    for (var i = 0; i < ci.length; i++) {
      this._total--;
      this._totalInterval--;
      delete this._keys[ci[i]];
      this._callback(ci[i]);
    }

    delete this._intervals[this._nextInterval];
  }
  if (this._totalInterval === 0)
    this.stopIntervalTimer();
    
  this._nextInterval++;
};

TimeoutContainer.prototype.keepAlive = function(key) {

};

TimeoutContainer.prototype.isAlive = function(key) {

};

TimeoutContainer.prototype.startIntervalTimer = function() {
  var self = this;
  this._timer = setInterval(function() {
    self.clearInterval();
  }, this._interval);
};

TimeoutContainer.prototype.stopIntervalTimer = function() {
  clearInterval(this._timer);
  this._timer = null;
};


module.exports = TimeoutContainer;

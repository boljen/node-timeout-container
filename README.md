# Timeout Container

This is a container meant to be used as a timeout manager. It has some very
specific characteristics making it especially suitable for certain use cases.

The first characteristic is that the container works with an interval. This
interval will periodically check whether keys have timed out. If that is the
case, the key will be removed from the container and a callback will be executed.

The second characteristic is that you can attempt to verify whether a key has
timed out, upon which a check will be


## Install

    npm install timeout-container

    var TimeoutContainer = require('timeout-container');

## API

### new Container

    /**
    * @param {Integer} timeout - The amount of time for a value to time out.
    * @param {Integer} interval - The amount of time for each interval to hit.
    * @param {Function} callback - The callback to call upon a key timeout.
    */
    var TimeoutContainer = function(timeout, cb)

Example:

    var container = new TimeoutContainer(30000, 500, function(key) {
      console.log('key '+key+' timed out');
    });

### container.push

This will add a new key to the container. You can use a specific timeout for
this key alone.

### container.pull

This will return true if the key has not yet timed out, and will remove the key
from the container.

### container.alive

This will return true if the key has not yet timed out, but will not remove the
key from the container.

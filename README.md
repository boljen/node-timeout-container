# Timeout Container

Push keys into the container, along with their timeout. Pull those keys back out
or catch the timeout.

## Install

    npm install timeout-container

    var TimeoutContainer = require('timeout-container');

## Example

    var container = new TimeoutContainer({
      timeout: 500, // The default timeout of a key
      interval: 100, // The rate at which to automatically check for expired keys
    }, function(key) {
      // Will be called when a key times out.
    })

    //push key test and override default timeout
    container.push('test', 550);

    // If key exists hasn't timed out, will return true
    container.pull('test');

## License

MIT

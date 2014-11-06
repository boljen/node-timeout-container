var TimeoutContainer = require('./../index.js');

setInterval(function() {
  console.log('ok');
}, 500);

describe('TimeoutContainer', function() {

  describe('construct', function() {
    it('Should construct', function() {
      var tc = new TimeoutContainer(1000, 200, function() {

      });
    });
    it('Should start the interval listener', function() {

    });
    it('Should not start the interval listener if the interval is 0', function() {

    });
  });

  describe.skip('setTimout', function() {
    it('Should update the timeout', function() {

    });
  });

  describe.skip('setInterval', function() {
    it('Should set the interval', function() {

    });
    it('Should refresh the interval listener', function() {

    });
  });

  describe.skip('cleanAll', function(){
    it('Should refresh all the entries', function() {

    });
  });

  describe.skip('clean', function() {
    it('Should refresh the specified entry', function() {

    });
  });

  describe.skip('remove', function() {
    it('Should remove a key', function() {

    });
    it('Should remove the custom listener', function() {

    });
  });

  describe.skip('push', function() {
    it('Should return the container instance', function() {

    });
    it('Should add a key to the stack', function() {

    });
    it('Should add a key to the stack with a custom timeout', function() {

    });
    it('Should refresh the key if the key already exists', function() {

    });
    it('Should register the last added key', function() {

    });
  });

  describe.skip('alive', function() {
    it('Should return true if alive', function() {

    });
    it('Should return false if non-existent', function() {

    });
    it('Should refresh', function() {

    });
  });

  describe.skip('pull', function() {
    it('Should remove a key from the stack', function() {

    });
    it('Should remove custom timeout hooks', function() {

    });
    it('Should refresh', function() {

    });
  });

  describe.skip('listen', function() {
    it('Should hook to the specified key and call the callback', function() {

    });
    it('Should NOT call the general callback', function() {

    });
    it('Should call the general callback, if configrured', function() {

    });
    it('should use the last added key, if none specified');
  });


});

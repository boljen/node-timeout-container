var TimeoutContainer = require('./../index.js');

describe('TimeoutContainer', function() {

  var tc, done = false, notimer = true;

  beforeEach(function() {
    if (done) {
      tc = new TimeoutContainer({timeout: 20, interval: 10}, function() {});
      if(notimer) {
        tc.stopIntervalTimer = function() {};
        tc.startIntervalTimer = function(){};
      }
    }
  });

  describe('construct', function() {
    it('Should construct', function() {
      var tc = new TimeoutContainer({timeout: 1000}, function() {});
    });
    after(function() {
      done = true;
    });
  });

  describe('setTimout', function() {
    it('Should update the timeout', function() {
      tc.setTimeout(14000);
      tc._timeout.should.equal(14000);
    });
  });

  describe('setCallback', function() {
    it('Should set the callback', function() {
      var fx = function(){};
      tc.setCallback(fx);
      tc._callback.should.equal(fx);
    });
  });

  describe('push', function() {
    it('Should add to correct block', function() {
      tc.push('test');
      tc._total.should.equal(1);
      tc._totalInterval.should.equal(1);
    });
    it('Should do a keepalive when key already exists', function(done) {
      tc.keepAlive = function() {
        done();
      };
      tc.push('test');
      tc.push('test');
    });
    it('Should start interval if none is started', function(done) {
      tc.startIntervalTimer = function() {
        tc.startIntervalTimer = function() {
          throw new Error("Should not happen");
        };
        // Make sure to do this on the next tick
        setTimeout(function() {
          tc.push('test2');
          done();
        }, 0);
      }
      tc.push('test');
    });
  })


  describe('pull', function() {
    it('Should pull to correct key from the stack', function() {
      tc.push('test');
      tc.setCallback(function() {
        throw new Error("Should not happen");
      })
      tc.pull('test').should.be.true;
    });
    it('Should timeout', function(done) {
      tc.push('test', 2);
      setTimeout(function() {
        tc.pull('test').should.be.false;
        done();
      }, 20);
    });
    it('Should stop interval if no more intervalled keys', function(done) {
      tc.stopIntervalTimer = function() {
        tc.stopIntervalTimer = function() {
          throw new Error("Should not happen");
        };
        // Make sure to do this on the next tick
        setTimeout(function() {
          tc.pull('test');
          done();
        }, 0);
      };
      tc.push('test');
      tc.pull('test');
    });
  });

  describe('clearInterval', function() {
    it('Should clear the interval, do timeout callbacks, and move on', function() {
      tc.push('test', 1);
      tc.clearInterval();
      tc.pull('test').should.be.true;
      tc.push('test', 1);
      tc.clearInterval();
      tc.clearInterval();
      tc.pull('test').should.be.false;
    });
    it('Should stop timer if no interval', function(done) {
      tc.push('test', 1);
      tc.stopIntervalTimer = function() {
        done();
      };
      tc.clearInterval();
      tc.clearInterval();
    });
  });

  describe('--integration', function() {
    before(function() {
      notimer = false;
    });
    it('should callback upon timeout', function(done) {
      tc.push('test');
      tc.setCallback(function(k) {
        k.should.equal('test');
        done();
      });
    });
  });

});

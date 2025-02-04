import strategies from '../lib/strategies';

describe('promise-poller strategies', function() {
  describe('fixed interval strategy', function() {
    it('polls on a fixed interval', function() {
      const options = {
        interval: 1000
      };

      const expectedIntervals = [1000, 1000, 1000, 1000, 1000];
      expectedIntervals.forEach((interval, index) => {
        expect(strategies['fixed-interval'].getNextInterval(index, options)).toEqual(interval);
      });
    });
  });

  describe('linear backoff strategy', function() {
    it('increases the interval linearly', function() {
      const options = {
        start: 1000,
        increment: 500
      };

      const expectedIntervals = [1000, 1500, 2000, 2500, 3000];
      expectedIntervals.forEach((interval, index) => {
        expect(strategies['linear-backoff'].getNextInterval(index, options)).toEqual(interval);
      });
    });
  });

  describe('exponential backoff strategy', function() {
    it('uses exponential backoff with jitter', function() {
      const randoms = [0.2, 0.4, 0.6, 0.8, 0.9];
      const expectedIntervals = [1000, 1400, 2800, 6600, 10000];
      Math.random = () => randoms.shift();

      const options = {
        min: 1000,
        max: 10000
      };

      expectedIntervals.forEach((interval, index) => {
        expect(strategies['exponential-backoff'].getNextInterval(index, options)).toEqual(interval);
      });
    });
  });
});

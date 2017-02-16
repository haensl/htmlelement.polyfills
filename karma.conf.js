(() => {
  module.exports = (config) => {
    config.set({
      basePath: './',
      frameworks: ['jasmine'],
      exclude: [],
      reporters: ['spec'],
      specReporter: {
        suppressPassed: true
      },
      port: 9876,
      colors: true,
      autoWatch: true,
      browsers: ['PhantomJS'], //, 'Chrome', 'Firefox', 'Safari'],
      singleRun: false,
      concurrency: Infinity,
      usePolling: true
    });
  };
})();

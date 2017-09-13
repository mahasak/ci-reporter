'use strict';

var tsm = require('teamcity-service-messages');

var Reporter = function (engine, args) {
  this.engine = engine;

  if (typeof args === 'object' || typeof args === 'undefined') {
    this.args = args || {};
  } else {
    this.args = args;
  }
};

var isTeamCityContext = function () {
  if (process === null || typeof process === 'undefined') {
    return false;
  }
  var env = process.env;
  if (env === null || typeof env === 'undefined') {
    return false;
  }
  return env.TEAMCITY_VERSION !== null && typeof env.TEAMCITY_VERSION !== 'undefined';
}

Reporter.prototype.start = function (text) {
  if (isTeamCityContext()) {
    tsm.progressStart(text);
  }
  console.log(text);
}

Reporter.prototype.finish = function (text) {
  if (isTeamCityContext()) {
    tsm.progressFinish(text);
  }
  console.log(text);
}

Reporter.prototype.error = function (text) {
  if (isTeamCityContext()) {
    tsm.buildProblem(text);
  }
  console.log(text);
}

exports.default = Reporter;
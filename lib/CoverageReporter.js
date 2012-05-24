var jasmine = require('jasmine-node'),
	_ = require('underscore'),
	util = require('util');

var args = require('./args'),
	config = require(args.projectFolder + '/coverage.json');

function CoverageReporter() {}
util.inherits(CoverageReporter, jasmine.Reporter);

_.extend(CoverageReporter.prototype, {
	reportRunnerResults: function(runner) {
		console.log(util.inspect(_$jscoverage['script.js'].source));
	}
});

exports.CoverageReporter = CoverageReporter;

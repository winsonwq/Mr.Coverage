(function() {
	var jasmine = require('jasmine-node'),
		_ = require('underscore'),
		coverageConfig = require('../coverage.json');

	function CoverageReporter() {}
	CoverageReporter.prototype = new jasmine.Reporter();

	_.extend(CoverageReporter.prototype, {

		reportRunnerStarting: function() {
		},
		reportRunnerResults: function(runner) {
			console.log(_$jscoverage['script.js']);
		}
	});

	exports.CoverageReporter = CoverageReporter;
})();

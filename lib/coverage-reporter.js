var jasmine = require('jasmine-node'),
	_ = require('underscore'),
	util = require('util');

var Parser = require('./jscoverage-parser').Parser,
	Template = require('./template/table-tmpl');

function CoverageReporter() {}
util.inherits(CoverageReporter, jasmine.Reporter);

_.extend(CoverageReporter.prototype, {
	reportRunnerResults: function(runner) {
		if (typeof _$jscoverage === 'undefined') return;
		var parser = new Parser(_$jscoverage);
		process.stdout.write('\n' + Template.tmpl(parser.toJSONObject()));
	}
});

exports.CoverageReporter = CoverageReporter;

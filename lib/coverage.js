var	jasmine = require('jasmine-node'),
	_ = require('underscore');

var	args = require('./args'),
	CoverageReporter = require('./coverage-reporter').CoverageReporter;

jasmine.getEnv().addReporter(new CoverageReporter());
/*
	for jasmine-node testing, if there is a param not in the jasmine-node
	params list, the help will show, so we need remove project foleder param.
*/
if(args.results.length > 0 && _.last(args.results).indexOf('--') !== -1){
	var consoleArgs = process.argv;
	process.argv = consoleArgs.slice(0, consoleArgs.length - 1);
}

require('../node_modules/jasmine-node/lib/jasmine-node/cli.js');

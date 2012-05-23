var jasmine = require('jasmine-node'),
	CoverageReporter = require('./lib/CoverageReporter').CoverageReporter;

jasmine.getEnv().addReporter(new CoverageReporter());
require('./node_modules/jasmine-node/lib/jasmine-node/cli.js');

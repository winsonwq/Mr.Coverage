describe("jscoverage-parser", function() {

	var Parser = require('../lib/jscoverage-parser.js').Parser;
	var data, parser;

	beforeEach(function() {
		data = require('./jscoverage.js').jcData;
		parser = new Parser(data);
	});

	it("#getTotalCoverage", function(done) {
		expect(parser.getTotalCoverage()).toBe(13/24);
		done();
	});

});

describe("jscoverage-parser", function() {

	var expect = require('chai').expect;
	var Parser = require('../lib/jscoverage-parser.js').Parser;
	var data;

	beforeEach(function() {
		data = require('./jscoverage.js').jcData;
	});

	describe("#getTotalCoverage", function() {

		it("should return the total js coverage", function(done) {
			var parser = new Parser(data);
			expect(parser.getTotalCoverage()).to.equal(17 / 24);
			done();
		});

		it("should return the total js coverage of config array", function(done) {
			var parser = new Parser(data, ['script.js']);
			expect(parser.getTotalCoverage()).to.equal(9 / 12);
			done();
		});
	});

	describe("#toJSONObject", function() {

		it("should return json object format of parser", function(done) {
			var parser = new Parser(data);
			var json = parser.toJSONObject();
			expect(json.files.length).to.equal(2);
			expect(json.totalLineNum).to.equal(24);
			expect(json.totalExecutedLineNum).to.equal(12);
			expect(json.totalIgnoreLineNum).to.equal(5);

			expect(json.files[0].filename).to.equal('script.js');
			expect(json.files[0].totalCoverage).to.equal(9 / 12);
			expect(json.files[0].source.length).to.equal(12);
			expect(json.files[1].totalCoverage).to.equal(8 / 12);

			expect(json.totalCoverage).to.equal(17 / 24);
			done();
		});

		it("should print table with table template", function(done) {
			var tableTemplate = require('../lib/template/table-tmpl.js');
			var parser = new Parser(data);
			var consoleStr = tableTemplate.tmpl(parser.toJSONObject());

			var lines = consoleStr.split('\n');
			expect(lines.length).to.equal(5);
			expect(lines[0].substr(lines[0].length - 3, 2)).to.equal('71');
			expect(lines[2].substr(lines[2].length - 19, 2)).to.equal('75');
			expect(lines[3].substr(lines[3].length - 19, 2)).to.equal('67');
			done();
		});
	});
});

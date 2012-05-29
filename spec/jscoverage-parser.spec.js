describe("jscoverage-parser", function() {

	var Parser = require('../lib/jscoverage-parser.js').Parser;
	var data;

	beforeEach(function() {
		data = require('./jscoverage.js').jcData;
	});

	describe("#getTotalCoverage", function() {

		it("should return the total js coverage", function(done) {
			var parser = new Parser(data);
			expect(parser.getTotalCoverage()).toBe(17 / 24);
			done();
		});

		it("should return the total js coverage of config array", function(done) {
			var parser = new Parser(data, ['script.js']);
			expect(parser.getTotalCoverage()).toBe(9 / 12);
			done();
		});
	});

	describe("#toJSONObject", function() {

		it("should return json object format of parser", function(done) {
			var parser = new Parser(data);
			var json = parser.toJSONObject();
			expect(json.files.length).toBe(2);
			expect(json.totalLineNum).toBe(24);
			expect(json.totalExecutedLineNum).toBe(12);
			expect(json.totalIgnoreLineNum).toBe(5);

			expect(json.files[0].filename).toBe('script.js');
			expect(json.files[0].totalCoverage).toBe(9 / 12);
			expect(json.files[0].source.length).toBe(12);
			expect(json.files[1].totalCoverage).toBe(8 / 12);

			expect(json.totalCoverage).toBe(17 / 24);
			done();
		});

		it("should print table with table template", function(done) {
			var tableTemplate = require('../lib/template/table-tmpl.js');
			var parser = new Parser(data);
			var consoleStr = tableTemplate.tmpl(parser.toJSONObject());

			var lines = consoleStr.split('\n');
			expect(lines.length).toBe(5);
			expect(lines[0].substr(lines[0].length - 3, 2)).toBe('71');
			expect(lines[2].substr(lines[2].length - 19, 2)).toBe('75');
			expect(lines[3].substr(lines[3].length - 19, 2)).toBe('67');
			done();
		});
	});
});

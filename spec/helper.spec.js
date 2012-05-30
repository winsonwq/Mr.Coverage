describe("helper", function() {
	var Helper = require('../lib/helper'),
		fs = require('fs'),
		wrench = require('wrench'),
		Path = require('path'),
		expect = require('chai').expect;

	var TEST_BASE = '/tmp/jscoverage';

	beforeEach(function() {
		if (Path.existsSync(TEST_BASE)) {
			wrench.rmdirSyncRecursive(TEST_BASE);
		}
		wrench.mkdirSyncRecursive(TEST_BASE);
		_$jscoverage = undefined;
	});

	describe("#replaceFile", function() {

		it("should replace a file to the one which is used for jscoverage", function(done) {
			var filepath = Path.join(TEST_BASE, 'script.js');

			fs.writeFileSync(filepath, 'exports.get1 = function(){return 1;};');

			expect(typeof _$jscoverage).to.equal('undefined');
			Helper.replaceFile(filepath, function() {
				var script = require(filepath);

				expect(_$jscoverage).not.to.equal(undefined);

				expect(_$jscoverage['script.js'][1]).to.equal(1);
				expect(script.get1()).to.equal(1);
				expect(_$jscoverage['script.js'][1]).to.equal(2);
				expect(_$jscoverage['script.js']).not.to.equal(undefined);
				expect(_$jscoverage['script.js'].source.length).to.equal(1);
				done();
			});
		});

	});

	describe("#replaceDir", function() {

		it("should replace all files which are used for jscoverage", function(done) {
			var file1path = '/tmp/jscoverage/spec/script1.js',
				file2path = '/tmp/jscoverage/spec/inner/script2.js';

			wrench.mkdirSyncRecursive(Path.join(TEST_BASE, 'spec', 'inner'));
			fs.writeFileSync(file1path, 'exports.get1 = function(){\nreturn 1;};');
			fs.writeFileSync(file2path, 'exports.get = function(num){return num;};');

			expect(typeof _$jscoverage).to.equal('undefined');
			Helper.replaceDir(Path.join(TEST_BASE, 'spec'), function() {
				var script = require(file1path);

				expect(_$jscoverage).not.to.equal(undefined);
				expect(script.get1()).to.equal(1);
				expect(_$jscoverage['script1.js']).not.to.equal(undefined);
				expect(_$jscoverage['script1.js'].source.length).to.equal(2);

				script = require(file2path);
				expect(script.get(2)).to.equal(2);
				expect(_$jscoverage['inner/script2.js']).not.to.equal(undefined);
				expect(_$jscoverage['inner/script2.js'].source.length).to.equal(1);

				done();
			});
		});

	});

});

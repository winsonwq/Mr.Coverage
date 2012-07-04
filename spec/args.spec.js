var sinon = require('sinon');
var args = require('../lib/args');

describe("args", function() {
	var should = require('chai').should();
	var process;

	beforeEach(function() {
		process = {
			argv: ['node', './lib/mocha-coverage']
		};
	});

	describe("#getParams", function() {

		[
			['/User/yourname/nodeproj', 'spec'],
			['/User/yourname/nodeproj', 'spec/a.js', 'spec/inner/b.js', 'inner'],
			['', 'spec'],
			['', '']
		].forEach(function(item) {
			it("should return project folder : '" + item[0] + "' and specFolder : '" + item.slice(1).join(',') + "'", function(done) {
				var specInfo = item.slice(1);
				var specFiles = specInfo.filter(function(item) {
					return item.indexOf('.js') !== -1;
				});

				var specFolders = specInfo.filter(function(item) {
					return item.indexOf('.js') === -1;
				});

				process.argv.push(item[0]);
				process.argv = process.argv.concat(item.slice(1));
				process.argv.push('+');
				process.argv.push('-R');
				process.argv.push('html-cov');

				var argument = args.getParams(process.argv.slice(2));
				argument.projectFolder.should.equal(item[0]);
				argument.params.should.eql(['-R', 'html-cov']);
				argument.isCoverageReport.should.be.true;
				done();
			});
		});

		it("should return empty project and spec folder if there is no params", function(done) {
			var argument = args.getParams(process.argv.slice(2));
			argument.projectFolder.should.equal('');
			argument.params.should.eql([]);
			argument.isCoverageReport.should.not.be.true;
			done();
		});

	});

	describe("#foldersToFiles", function() {
		var fs = require('fs');

		it("should return specific js files in the spec folders based on a basePath", function(done) {
			var readDirStub = sinon.stub(fs, 'readdirSync').returns(['a.js', 'b.js', 'c.txt']);
			var files = args.foldersToFiles(['spec', 'spec/inner'], '/Users');

			files.should.eql(['/Users/spec/a.js', '/Users/spec/b.js', '/Users/spec/inner/a.js', '/Users/spec/inner/b.js']);
			readDirStub.restore();
			done();
		});
	});

	describe("#toAbsPathFiles", function() {

		it("should return specific js files based on a basePath", function(done) {
			var files = args.toAbsPathFiles(['spec/a.js', 'spec/inner/b.js'], '/Users');
			files.should.eql(['/Users/spec/a.js', '/Users/spec/inner/b.js']);
			done();
		});

	});

	describe("#getSpecFiles", function() {
		var fs = require('fs');

	  	it("should return js files grouped with the specFiles and the files in specFolders based on a basePath", function(done) {
	  		var readDirStub = sinon.stub(fs, 'readdirSync').returns(['mock.js', 'c.txt']);
	  	  	var files = args.getSpecFiles(['spec', 'spec/inner'], ['spec/a.js', 'spec/inner/b.js'], '/Users');

			files.should.eql(['/Users/spec/mock.js', '/Users/spec/inner/mock.js', '/Users/spec/a.js', '/Users/spec/inner/b.js']);
			readDirStub.restore();
			done();
	  	});

	});

});
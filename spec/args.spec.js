describe("args", function() {
	var should = require('chai').should();
	var process;

	beforeEach(function() {
		process = {
			argv: ['node', './lib/mocha-coverage']
		};
	});

	[
		['/User/yourname/nodeproj', 'spec'],
		['/User/yourname/nodeproj', 'spec/a.js', 'spec/inner/b.js', 'inner'],
		['', 'spec'],
		['', '']
	].forEach(function(item) {
		it("should return project folder : '" + item[0] + "' and specFolder : '" + item.slice(1).join(',') + "'", function(done) {
			var specInfo = item.slice(1);
			var specFiles = specInfo.filter(function(item){ 
				return item.indexOf('.js') !== -1; 
			});

			var specFolders = specInfo.filter(function(item){ 
				return item.indexOf('.js') === -1;
			});

			process.argv.push(item[0]);
			process.argv = process.argv.concat(item.slice(1));
			process.argv.push('+');
			process.argv.push('-R');
			process.argv.push('html-cov');

			var args = require('../lib/args').getParams(process.argv.slice(2));
			args.projectFolder.should.equal(item[0]);
			args.specFiles.should.eql(specFiles);
			args.specFolders.should.eql(specFolders);
			args.params.should.eql(['-R', 'html-cov']);
			args.isCoverageReport.should.be.true;
			done();
		});
	});

	it("should return empty project and spec folder if there is no params", function(done) {
		var args = require('../lib/args').getParams(process.argv.slice(2));
		args.projectFolder.should.equal('');
		args.specFolders.should.eql([]);
		args.specFiles.should.eql([]);
		args.params.should.eql([]);
		args.isCoverageReport.should.not.be.true;
		done();
	});
});

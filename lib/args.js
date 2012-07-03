var fs = require('fs'),
	Path = require('path');

module.exports = {
	getParams: function(args) {
		var params = [],
			specFolders = [],
			specFiles = [],
			projectFolder, isCoverageReport = false;

		if (args.length > 0) {
			projectFolder = args.shift();
		}

		while (args.length && args[0] !== '+') {
			var arg = args.shift();
			if (Path.extname(arg) === '.js') {
				specFiles.push(arg);
			} else {
				specFolders.push(arg);
			}
		}

		// shift +
		args.shift();

		while (args.length) {
			var arg = args.shift();
			if (arg === '-R') {
				isCoverageReport = args[0] === 'html-cov' || args[0] === 'json-cov';
			}
			params.push(arg);
		}

		var that = this;
		return {
			projectFolder: projectFolder || '',
			params: params,
			isCoverageReport: isCoverageReport,
			hasInvalidParams : this.hasInvalidParams(specFolders, specFiles, projectFolder),
			getSpecFiles : function(basePath){
				return that.getSpecFiles(specFolders, specFiles, basePath);
			}
		};
	},
	hasInvalidParams: function(specFolders, specFiles, projectFolder) {
		specFolders.concat(specFiles).length === 0 || projectFolder === ''
	},

	foldersToFiles: function(specFolders, basePath) {
		var files = [];
		specFolders.forEach(function(folder) {
			fs.readdirSync(Path.join(basePath, folder)).forEach(function(filename) {
				if (Path.extname(filename) === '.js') {
					files.push(Path.join(basePath, folder, filename));
				}
			});
		});
		return files;
	},

	toAbsPathFiles: function(relPathFiles, basePath) {
		var files = [];
		relPathFiles.forEach(function(filename) {
			if (Path.extname(filename) === '.js') {
				files.push(Path.join(basePath, filename));
			}
		});
		return files;
	},

	getSpecFiles: function(specFolders, specFiles, basePath) {
		return this.foldersToFiles(specFolders, basePath).concat(this.toAbsPathFiles(specFiles, basePath));
	}
};
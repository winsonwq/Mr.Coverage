var _ = require('underscore'),
	Path = require('path');

_.extend(exports, {
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
			if(arg === '-R'){
				isCoverageReport = args[0] === 'html-cov' || args[0] === 'json-cov';
			}
			params.push(arg);
		}

		return {
			projectFolder: projectFolder || '',
			specFolders: specFolders,
			specFiles: specFiles,
			params: params,
			isCoverageReport: isCoverageReport
		};
	}
});
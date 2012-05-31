var _ = require('underscore'),
	Path = require('path');

_.extend(exports, {
	getParams: function(args) {
		var params = [],
			specFolders = [],
			specFiles = [],
			projectFolder;

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

		args.shift();

		while (args.length){
			params.push(args.shift());
		}

		return {
			projectFolder: projectFolder || '',
			specFolders: specFolders,
			specFiles: specFiles,
			params: params
		};
	}
});

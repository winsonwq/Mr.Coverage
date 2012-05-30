var _ = require('underscore'),
	Path = require('path');

_.extend(exports, (function() {
	var args = process.argv.slice(2),
		params = [],
		specFiles = [], projectFolder;

	while (args.length) {
		var arg = args.shift();
		if ((/(\-{2}project\-directory)|(-pd)\=.+/i).test(arg)) {
			projectFolder = Path.resolve(arg.split('=')[1]);
		} else if (Path.extname(arg) === '.js') {
			specFiles.push(arg);
		} else {
			params.push(arg);
		}
	}

	return {
		projectFolder: projectFolder || '',
		specFiles: specFiles,
		params: params
	};
})());

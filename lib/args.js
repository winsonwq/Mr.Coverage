var _ = require('underscore'),
	Path = require('path');

_.extend(exports, (function() {
	var args = process.argv.slice(2),
		results = [],
		specFolder, projectFolder;

	while (args.length) {
		var arg = args.shift();
		if ((/(\-{2}project\-directory)|(-pd)\=.+/i).test(arg)) {
			projectFolder = Path.resolve(arg.split('=')[1]);
			// project folder will always stay at last
			results.push(arg);
		} else if (!/^\-{2}/.test(arg)) {
			specFolder = arg;
		} else {
			results.unshift(arg);
		}
	}

	return {
		projectFolder: projectFolder || '',
		specFolder: specFolder || '',
		results: results
	};
})());

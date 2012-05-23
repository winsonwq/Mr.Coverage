var Path = require('path'),
	util = require('util'),
	spawn = require('child_process').spawn,
	exec = require('child_process').exec,
	JS_COVERAGE_BASE = '/tmp/js-coverage';

function jscoverage(sourceDir, destDir, callback) {
	exec(util.format('jscoverage %s %s', sourceDir, destDir), callback);
}

function collectArgs() {
	var args = process.argv.slice(2),
		results = [],
		specFolder;

	while (args.length) {
		var arg = args.shift();
		if (!/^\-{2}/.test(arg)) {
			specFolder = arg;
		} else {
			results.push(arg);
		}
	}

	return {
		specFolder: specFolder || '',
		results: results
	};
}

function help() {
	require('./coverage');
}

function runCoverage(consoleArgs) {
	if(consoleArgs.specFolder === '') return;
	jscoverage('./', JS_COVERAGE_BASE, function() {
		var jasmineArgs = ['coverage', Path.join(JS_COVERAGE_BASE, consoleArgs.specFolder)].concat(consoleArgs.results);
		var jasmineRun = spawn('node', jasmineArgs);

		jasmineRun.stdout.on('data', function(data) {
			console.log(data.toString());
		});

		jasmineRun.stderr.on('data', function(data) {
			console.log('stderr: ' + data);
		});

		jasmineRun.on('exit', function() {
			// console.log('END');
		});
	});
}

function run() {
	var consoleArgs = collectArgs();
	if (consoleArgs.specFolder === '') {
		help();
	} else {
		runCoverage(consoleArgs);
	}
}

run();

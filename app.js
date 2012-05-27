var Path = require('path'),
	spawn = require('child_process').spawn,
	consoleArgs = require('./lib/args'),
	Helper = require('./lib/helper'),
	JS_COVERAGE_BASE = '/tmp/jscoverage';

function help() {
	var helpStr = ['USAGE: jasmine-coverage --project-directory=(project-directory) (jasmine-node Options below)'].join('\n')
	console.log(helpStr);
	require('./lib/coverage');
}

function runCoverage(consoleArgs) {
	if (consoleArgs.specFolder === '' || consoleArgs.projectFolder === '') return;
	if (Helper.resetDir(JS_COVERAGE_BASE) === false) return;

	Helper.jscoverage(consoleArgs.projectFolder, JS_COVERAGE_BASE, function(err) {
		if (err) {
			console.log(err.toString());
			return;
		}
		runJasmineProxy(consoleArgs);
	});
}

function runJasmineProxy(consoleArgs) {
	var jasmineArgs = ['./lib/coverage', Path.join(JS_COVERAGE_BASE, consoleArgs.specFolder)].concat(consoleArgs.results);
	var jasmineRun = spawn('node', jasmineArgs);

	jasmineRun.stdout.on('data', function(data) {
		process.stdout.write(data.toString());
	});

	jasmineRun.stderr.on('data', function(data) {
		process.stdout.write(data.toString());
	});

	jasmineRun.on('exit', function() {
		Helper.resetDir(JS_COVERAGE_BASE);
	});
}

function run() {
	if (consoleArgs.specFolder === '' || consoleArgs.projectFolder === '') {
		process.argv = [];
		help();
	} else {
		runCoverage(consoleArgs);
	}
}

run();

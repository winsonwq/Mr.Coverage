var Path = require('path'),
	util = require('util'),
	fs = require('fs'),
	wrench = require('wrench'),
	spawn = require('child_process').spawn,
	exec = require('child_process').exec,
	JS_COVERAGE_BASE = '/tmp/jscoverage';

function jscoverage(sourceDir, destDir, callback) {
	exec(util.format('jscoverage %s %s', sourceDir, destDir), callback);
}

function resetJsCoverageBase() {
	try {
		fs.readdirSync(JS_COVERAGE_BASE);
		try {
			wrench.rmdirSyncRecursive(JS_COVERAGE_BASE);
			return true;
		} catch (ex) {
			return false;
		}
	} catch (ex) {
		return true;
	}
}

function help() {
	var helpStr = ['USAGE: jasmine-coverage --project-directory=(project-directory) (jasmine-node Options below)'].join('\n')
	console.log(helpStr);
	require('./lib/coverage');
}

function runCoverage(consoleArgs) {
	if (consoleArgs.specFolder === '' || consoleArgs.projectFolder === '') return;
	if (resetJsCoverageBase() === false) return;

	jscoverage(consoleArgs.projectFolder, JS_COVERAGE_BASE, function(err) {
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
		console.log(data.toString());
	});

	jasmineRun.stderr.on('data', function(data) {
		console.log(data.toString());
	});

	jasmineRun.on('exit', function() {
		resetJsCoverageBase();
	});
}

function run() {
	var consoleArgs = require('./lib/args');
	if (consoleArgs.specFolder === '' || consoleArgs.projectFolder === '') {
		process.argv = [];
		help();
	} else {
		runCoverage(consoleArgs);
	}
}

run();

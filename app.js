var Path = require('path'),
	spawn = require('child_process').spawn,
	consoleArgs = require('./lib/args'),
	Helper = require('./lib/helper'),
	JS_COVERAGE_BASE = '/tmp/jscoverage';

function help() {
	var helpStr = ['USAGE: mr-coverage --project-directory=(project-directory) (mocha Options below)'].join('\n')
	console.log(helpStr);
	require('./lib/mocha-coverage');
}

function runCoverage(consoleArgs) {
	if (consoleArgs.specFiles.length === 0 || consoleArgs.projectFolder === '') return;
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
	var files = consoleArgs.specFiles.map(function(filePath){
		return Path.join(JS_COVERAGE_BASE, filePath);
	});
	var spawnArgs = [Path.join(__dirname, './lib/mocha-coverage')].concat(consoleArgs.params).concat(files);
	var runner = spawn('node', spawnArgs);

	runner.stdout.on('data', function(data) {
		process.stdout.write(data.toString());
	});

	runner.stderr.on('data', function(data) {
		process.stdout.write(data.toString());
	});

	runner.on('exit', function() {
		Helper.resetDir(JS_COVERAGE_BASE);
	});
}

function run() {
	if (consoleArgs.specFiles.length === 0 || consoleArgs.projectFolder === '') {
		process.argv = ['node', 'mocha', '--help'];
		help();
	} else {
		runCoverage(consoleArgs);
	}
}

run();

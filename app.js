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
		specFolder, projectFolder;

	while (args.length) {
		var arg = args.shift();
		if((/(\-{2}project\-directory)|(-pd)\=.+/i).test(arg)){
			projectFolder = arg.split('=')[1];
		}else if (!/^\-{2}/.test(arg)) {
			specFolder = arg;
		} else {
			results.push(arg);
		}
	}

	return {
		projectFolder: projectFolder,
		specFolder: specFolder || '',
		results: results
	};
}

function help() {
	var helpStr = ['USAGE: jasmine-coverage --project-directory=(project-directory) (jasmine-node Options below)'
	].join('\n')
	console.log(helpStr);
	require('./coverage');
}

function runCoverage(consoleArgs) {
	if (consoleArgs.specFolder === '' || consoleArgs.projectFolder === '') return;
	jscoverage(consoleArgs.projectFolder, JS_COVERAGE_BASE, function() {
		var jasmineArgs = ['coverage', Path.join(JS_COVERAGE_BASE, consoleArgs.specFolder)].concat(consoleArgs.results);
		var jasmineRun = spawn('node', jasmineArgs);

		jasmineRun.stdout.on('data', function(data) {
			console.log(data.toString());
		});

		jasmineRun.stderr.on('data', function(data) {
			console.log('stderr: ' + data);
		});

		jasmineRun.on('exit', function() {
			console.log('END');
		});
	});
}

function run() {
	var consoleArgs = collectArgs();
	console.log(consoleArgs);
	if (consoleArgs.specFolder === '') {
		help();
	} else {
		runCoverage(consoleArgs);
	}
}

run();

var Path = require('path'),
	fs = require('fs'),
	spawn = require('child_process').spawn,
	consoleArgs = require('./lib/args').getParams(process.argv.slice(2)),
	Helper = require('./lib/helper'),
	JS_COVERAGE_BASE = '/tmp/jscoverage';

function help() {
	var helpStr = ['USAGE: mr-coverage [project-directory] [spec-directory or spec-files] (mocha Options below, no need to set file path)'].join('\n')
	console.log(helpStr);
	require('./lib/mocha-coverage');
}

function hasInvalidParams(){
	consoleArgs.specFolders.concat(consoleArgs.specFiles).length === 0 || consoleArgs.projectFolder === ''
}

function foldersToFiles(specFolders){
	var files = [];
	specFolders.forEach(function(folder){
		fs.readdirSync(Path.join(JS_COVERAGE_BASE, folder)).forEach(function(filename){
			if(Path.extname(filename) === '.js'){
				files.push(Path.join(JS_COVERAGE_BASE, folder, filename));
			}
		});
	});
	return files;
}

function runCoverage(consoleArgs) {
	if (hasInvalidParams()) return;
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
	var files = foldersToFiles(consoleArgs.specFolders).concat(consoleArgs.specFiles);
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
	if (hasInvalidParams()) {
		process.argv = ['node', 'mocha', '--help'];
		help();
	} else {
		runCoverage(consoleArgs);
	}
}

run();

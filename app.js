var Path = require('path'),
	fs = require('fs'),
	spawn = require('child_process').spawn,
	consoleArgs = require('./lib/args').getParams(process.argv.slice(2)),
	Helper = require('./lib/helper'),
	JS_COVERAGE_BASE = '/tmp/jscoverage';

function help() {
	process.argv = ['node', 'mocha', '--help'];
	var helpStr = ['USAGE: mr-coverage [project-directory] [spec-directory or spec-files] + (mocha Options below, no need to set file path)'].join('\n')
	console.log(helpStr);
	require('./lib/mocha-coverage');
}

function hasInvalidParams(){
	consoleArgs.specFolders.concat(consoleArgs.specFiles).length === 0 || consoleArgs.projectFolder === ''
}

function foldersToFiles(specFolders, basePath){
	var files = [];
	specFolders.forEach(function(folder){
		fs.readdirSync(Path.join(basePath, folder)).forEach(function(filename){
			if(Path.extname(filename) === '.js'){
				files.push(Path.join(basePath, folder, filename));
			}
		});
	});
	return files;
}

function toAbsPathFiles(relPathFiles, basePath){
	var files = [];
	relPathFiles.forEach(function(filename){
		if(Path.extname(filename) === '.js'){
			files.push(Path.join(basePath, filename));
		}
	});
	return files;
}

function getSpecFiles(specFolders, specFiles, basePath){
	return foldersToFiles(specFolders, basePath)
		 	.concat(toAbsPathFiles(specFiles, basePath));
}

function runCoverage(consoleArgs) {
	if (hasInvalidParams()) return;
	if (Helper.resetDir(JS_COVERAGE_BASE) === false) return;

	Helper.jscoverage(consoleArgs.projectFolder, JS_COVERAGE_BASE, function(err) {
		if (err) {
			console.log(err.toString());
			return;
		}
		runMochaProxy(consoleArgs);
	});
}

function runMochaProxy(consoleArgs) {
	var files = getSpecFiles(consoleArgs.specFolders, consoleArgs.specFiles, JS_COVERAGE_BASE);
	var spawnArgs = [Path.join(__dirname, './lib/mocha-coverage')].concat(consoleArgs.params).concat(files);
	var runner = spawn('node', spawnArgs);

	runner.stdout.on('data', function(data) {
		process.stdout.write(data);
	});

	runner.stderr.on('data', function(data) {
		process.stdout.write(data);
	});

	runner.on('exit', function() {
		Helper.resetDir(JS_COVERAGE_BASE);
	});
}

function runMocha(consoleArgs){
	var files = getSpecFiles(consoleArgs.specFolders, consoleArgs.specFiles, consoleArgs.projectFolder);
	process.argv = ['node', 'mocha'].concat(consoleArgs.params.concat(files));
	require('./lib/mocha-coverage');
}

function run() {
	if (hasInvalidParams()) {
		help();
	} else if(consoleArgs.isCoverageReport){
		runCoverage(consoleArgs);
	} else {
		runMocha(consoleArgs);
	}
}

run();

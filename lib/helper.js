var Path = require('path'),
	Util = require('util'),
	fs = require('fs'),
	wrench = require('wrench'),
	Mr = require('Mr.Async'),
	exec = require('child_process').exec,
	_ = require('underscore');

_.extend(exports, {
	execJsCoverage : function(sourceDir, targetDir, callback){
		exec(Util.format('jscoverage %s %s', sourceDir, targetDir), function() {
			if(typeof callback === 'function'){
				callback();
			}
		});
	},

	replaceFile: function(sourceFilePath, callback) {
		if (!Path.existsSync(sourceFilePath)) throw sourceFilePath + ' doesn\'t exits';

		var baseDir = Path.dirname(sourceFilePath),
			jsTempDir = Path.join(baseDir, '.js'),
			jsTempTargetDir = Path.join(baseDir, '.jsc'),
			filename = Path.basename(sourceFilePath),
			tempJsPath = Path.join(jsTempDir, filename),
			targetTempJsPath = Path.join(jsTempTargetDir, filename);

		if(Path.existsSync(jsTempDir)){
			wrench.rmdirSyncRecursive(jsTempDir);
		}
		if(Path.existsSync(jsTempTargetDir)){
			wrench.rmdirSyncRecursive(jsTempTargetDir);
		}
		wrench.mkdirSyncRecursive(jsTempDir);

		// copy to /tmp/js
		fs.writeFileSync(tempJsPath, fs.readFileSync(sourceFilePath));
		// jscoverage to /tmp/jsc
		this.execJsCoverage(jsTempDir, jsTempTargetDir, function(){
			// rm source file
			fs.unlinkSync(sourceFilePath);
			fs.writeFileSync(sourceFilePath, fs.readFileSync(targetTempJsPath));

			if (typeof callback === 'function') {
				callback();
			}
		});
	},

	replaceDir : function(dir, callback){
		var dirname = Path.dirname(dir),
			basename = Path.basename(dir),
			tmpDir = Path.join(dirname, basename + 'temp'),
			targetDir = Path.join(tmpDir, basename);

		wrench.mkdirSyncRecursive(tmpDir);
		this.execJsCoverage(dir, tmpDir, function(){
			wrench.rmdirSyncRecursive(dir);
			fs.renameSync(tmpDir, dir);

			if (typeof callback === 'function') {
				callback();
			}
		});
	},

	jscoverage: function(sourceDir, destDir, callback) {
		var configPath = Path.join(sourceDir, 'coverage.json');
		var config = Path.existsSync(configPath) ? require(configPath) : [];

		wrench.copyDirSyncRecursive(sourceDir, destDir);
		
		var that = this;
		Mr.asynEach(config, function(fileOrDir, idx) {
			var replaceDir = Path.join(destDir, fileOrDir);
			if(Path.extname(fileOrDir) === '.js'){
				that.replaceFile(replaceDir, this.callback());
			}else{
				that.replaceDir(replaceDir, this.callback());
			}
		}, function() {
			callback();
		}).start();
	},

	resetDir: function(dir) {
		if (Path.existsSync(dir)) {
			try {
				wrench.rmdirSyncRecursive(dir);
				return true;
			} catch (ex) {
				return false;
			}
		} else return true;
	}
});

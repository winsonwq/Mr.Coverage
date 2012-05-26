var _ = require('underscore'),
	Path = require('path'),
	Util = require('util');

function Parser(jcData, whiteList) {
	this.init(jcData, whiteList);
}

_.extend(Parser.prototype, {
	init: function(jcData, whiteList) {
		if (jcData == null) throw 'javascript coverage can not be null.';

		this.source = jcData;
		this.whiteList = whiteList || [];
		var whiteListLen = this.whiteList.length;

		var jsonObject = {};
		jsonObject.files = [];
		jsonObject.totalLineNum = 0;
		jsonObject.totalExecutedLineNum = 0;
		jsonObject.totalIgnoreLineNum = 0;

		_.each(this.source, function(jcObject, filename) {
			if(whiteListLen){
				var exists = _.any(whiteList, function(name){ return name == filename; });
				if(!exists){ return; }
			}
			
			var each = {
				filename: filename,
				source: jcObject.source[0],
				totalLines: jcObject,
				totalLineNum: jcObject.length,
				executedLineNum: filter(jcObject, function(num) {
					return num > 0;
				}).length,
				ignoreLineNum: filter(jcObject, function(num) {
					return num === undefined;
				}).length
			};

			each.totalCoverage = (each.executedLineNum + each.ignoreLineNum) / each.totalLineNum;

			jsonObject.files.push(each);
			jsonObject.totalLineNum += each.totalLineNum;
			jsonObject.totalExecutedLineNum += each.executedLineNum;
			jsonObject.totalIgnoreLineNum += each.ignoreLineNum;

		}, this);

		jsonObject.totalCoverage = (jsonObject.totalExecutedLineNum + jsonObject.totalIgnoreLineNum) / jsonObject.totalLineNum;
		this.jsonObject = jsonObject;
	},
	getTotalCoverage: function() {
		return this.jsonObject.totalCoverage;
	},
	toJSONObject: function() {
		return this.jsonObject;
	}
});

function filter(arr, handler) {
	var results = [];
	if (_.isArray(arr)) {
		for (var i = 0, len = arr.length; i < len; i++) {
			if (handler.call(arr, arr[i], i)) {
				results.push(arr[i]);
			}
		}
	}
	return results;
}

exports.Parser = Parser;

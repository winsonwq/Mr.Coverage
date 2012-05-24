var _ = require('underscore'),
	Path = require('path');

function Parser(jcData) {
	this.init(jcData);
}

_.extend(Parser.prototype, {
	init: function(jcData) {
		if (jcData == null) throw 'javascript coverage can not be null.';
		
		this.source = jcData;
		this.results = [];
		this.totalLineNum = 0;
		this.totalExecutedNum = 0;

		_.each(this.source, function(jcObject, filename) {
			var each = {
				source : jcObject.source[0],
				totalLines : jcObject,
				totalLineNum : jcObject.length,
				executedLineNum : _.filter(jcObject, function(num){ return num > 0; }).length
			};

			this.results.push(each);
			this.totalLineNum += each.totalLineNum;
			this.totalExecutedNum += each.executedLineNum;

		}, this);
	},
	getTotalCoverage: function() {
		return this.totalExecutedNum / this.totalLineNum;
	}
});

exports.Parser = Parser;

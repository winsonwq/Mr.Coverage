var Util = require('util'),
	Table = require('easy-table');

exports.tmpl = function(json){
	if(json == null) throw 'coverage object should not be null.';

	var table = new Table();	
	var lineNum = 0;
	var totalCoverage = 'Total Coverage: ' + getPercentStr(json.totalCoverage);

	json.files.forEach(function(file, idx){
		table.cell('Line', ++lineNum);
		table.cell('File Name', file.filename, null, 30);
		table.cell('Total', file.totalLineNum);
		table.cell('Executed', file.executedLineNum + file.ignoreLineNum);
		table.cell(totalCoverage, getPercentStr(file.totalCoverage));
		table.newLine();
	});

	return table.toString();
};

function getPercentStr(num){
	return Math.ceil(num.toFixed(2) * 100) + '%';
}
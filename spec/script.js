var _ = require('underscore');

_.extend(exports, {
	add: function(a, b) {
		return a + b;
	},
	minus: function(a, b) {
		return a - b;
	},
	multiply: function(a, b) {
		return a * b;
	},
	divide: function(a, b) {
		return a / b;
	}
});

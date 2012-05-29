var jcData = {};
// exe : 7
// unexe : 3
// ignore : 2
// total : 12
jcData['script.js'] = [undefined, 1, 1, 0, 1, undefined, 0, 1, 1, 0, 1, 2];
jcData['script.js'].source = ["exports.add = (function(a, b) {", "  return a + b;", "});", "exports.minus = (function(a, b) {", "  return a - b;", "});", "exports.multiply = (function(a, b) {", "  return a * b;", "});", "exports.divide = (function(a, b) {", "  return a / b;", "});"];

// exe : 5
// unexe : 4
// ignore : 3
// total : 12
jcData['spec/script1.js'] = [undefined, undefined, 0, 1, 0, undefined, 0, 1, 1, 0, 1, 1];
jcData['spec/script1.js'].source = ["exports.add = (function(a, b) {", "  return a + b;", "});", "exports.minus = (function(a, b) {", "  return a - b;", "});", "exports.multiply = (function(a, b) {", "  return a * b;", "});", "exports.divide = (function(a, b) {", "  return a / b;", "});"];

exports.jcData = jcData;
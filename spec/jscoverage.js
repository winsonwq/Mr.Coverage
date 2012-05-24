var jcData = {};
jcData['script.js'] = [0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 2];
jcData['script.js'].source = ["exports.add = (function(a, b) {", "  return a + b;", "});", "exports.minus = (function(a, b) {", "  return a - b;", "});", "exports.multiply = (function(a, b) {", "  return a * b;", "});", "exports.divide = (function(a, b) {", "  return a / b;", "});"];

jcData['script1.js'] = [0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1];
jcData['script1.js'].source = ["exports.add = (function(a, b) {", "  return a + b;", "});", "exports.minus = (function(a, b) {", "  return a - b;", "});", "exports.multiply = (function(a, b) {", "  return a * b;", "});", "exports.divide = (function(a, b) {", "  return a / b;", "});"];

exports.jcData = jcData;
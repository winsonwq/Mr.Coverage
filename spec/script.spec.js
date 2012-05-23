describe("script", function() {

	var script = require('../script');

	it("#add", function(done) {
		expect(script.add(1, 1)).toBe(2);
		done();
	});

	it("#minus", function(done) {
		expect(script.minus(1, 1)).toBe(0);
		done();
	});

	it("#multiply", function(done) {
		expect(script.multiply(1, 1)).toBe(1);
		done();
	});

	describe("#divide", function() {

		it("1 / 1", function(done) {
			expect(script.divide(1, 1)).toBe(1);
			done();
		});

		it("1 / 0", function(done) {
			expect(script.divide(1, 0)).toBe(Infinity);
			done();
		});
	});
});

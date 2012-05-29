Mr.Coverage
===========

node js-coverage using jasmine-node, _**alpha 0.0.2**_

## Insallation
You can easily get it installed by following steps
### Step1 : Get your Nodejs ready
Visit [Nodejs](http://nodejs.org)
### Step2 : Download from NPM
```
sudo npm install -g Mr.Coverage
```
`sudo` and  `-g` are necessary because a global executable command `mr-coverage` will be generated in your `/usr/local/bin/` path.
### Step3 : Install jscoverage library
There are two ways to install it. **1**. download and install by yourself from [jscoverage](http://siliconforks.com/jscoverage/download.html). **2**. I have prepared a install.sh for you.
```
cd /usr/local/lib/node_modules/Mr.Coverage/bin
```
Then   
```
sudo bash install.sh
```
### Step4 : Done
After three steps above, you can try `mr-coverage` command in your terminal. Good Luck!

_PS: All installation tests are done in Mac._   
## Usage
For command `mr-coverage`, there is one more param called `--project-directory` or `--pd`. It should be assigned to your testing directory which can support your specs to run. Usually, it will be your project directory but not necessary. 

The other arguments are all from `jasmine-node` which is the jasmine runner in nodejs. Especially, `directory` param for `jasmine-node` means your spec folder. Right now, spec folder is always relative to the `--project-directory` folder.

### Coverage.json
You must set a `coverage.json` file under the root `--project-directory` folder. The content of that is a array to mark which file or folder Mr.Coverage should track.
```
[
  'script.js',
  'xxx_folder'
]
```
Right now, coverage.json only support the file and folder format, and it's a white list, that means if you set nothing, coverage report will not show. Btw, the format should not start with `./`. It's always relative to the root folder.

### Example
Normally, `mr-coverage` can be used like this. Suppose you have a nodejs project called "nodeproj" in `/User/yourname/Desktop/`, and have a file structures below:
```
nodeproj      
 ├─ package.json   
 ├─ script.js   
 ├─ coverage.json
 ├─ node_modules   
 └─ spec   
     └─ script.spec.js   
```
Here is the code in `script.js`, simple add/minus/multiply/divide
```javascript
var _ = require('underscore');

_.extend(exports, {
	add : function(a, b) {
		return a + b;
	}, 
	minus : function(a, b) {
		return a - b;
	}, 
	multiply : function(a, b) {
		return a * b;
	}, 
	divide : function(a, b) {
		return a / b;
	}, 
	increment : function(a) {
		return a++;
	}
});
```
Here is the code in `spec/script.spec.js`, only tested add/minus/multiply/divide, the `increment` method isn't included.
```javascript
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
			setTimeout(function(argument) {
				expect(script.divide(1, 0)).toBe(Infinity);
				done();
			}, 500);
		});
	});
});
```
Here is config in `coverage.json`
```
[ 'script.js' ]
```
After that, you can run command to get result.
```
mr-coverage --pd=/Users/yourname/Desktop/nodeproj spec --verbose
```
Result image:   
![Example Results](http://ww2.sinaimg.cn/large/64eae748tw1dtfgzf83haj.jpg)
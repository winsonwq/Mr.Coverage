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
For command `mr-coverage`, there is one more param called `--project-directory` or `--pd`. It should be assigned to your testing directory which can support your specs to run. Usually, it will be your project directory.   
   
The other arguments are all from `jasmine-node` which is the jasmine runner in nodejs. Especially, `directory` param for `jasmine-node` means your spec folder. Right now, spec folder is always relative to the `--project-directory` folder.

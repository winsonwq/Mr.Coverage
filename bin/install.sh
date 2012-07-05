#!/usr/bin/env bash

git clone git://github.com/visionmedia/node-jscoverage.git
echo ''
echo 'Installing jscoverage'
cd ./node-jscoverage && ./configure && make && make install
echo ''
cd ../../
echo 'npm install ./'
npm install ./
echo ''
echo 'DONE'

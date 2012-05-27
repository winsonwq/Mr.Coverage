#!/usr/bin/env bash

tar jxvf jscoverage-0.5.1.tar.bz2
echo ''
echo 'install jscoverage...'
cd ./jscoverage-0.5.1 && ./configure && make && make install
echo ''
cd ../../
echo 'npm install ./'
npm install ./
echo ''
echo 'DONE'

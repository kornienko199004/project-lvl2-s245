install:
	npm install

start:
	npm run babel-node -- src/bin/gendiff.js

pubish:
	npm publish

lint:
	npm run eslint .

test:
	npm run test

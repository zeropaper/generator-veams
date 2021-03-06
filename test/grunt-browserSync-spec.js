/*global describe, beforeEach, it*/
'use strict';

const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const fs = require('fs');
const answers = require('../test_helpers/prompt-answer-factory')({
	"gruntModules": [
		"grunt-browser-sync"
	]
});

describe('grunt-browser-sync', function () {
	const helperPath = "helpers/";

	beforeEach(function (done) {
		helpers.run(path.join(__dirname, '../generators/app'))
			.inDir(path.join(__dirname, 'tmp'))
			.withOptions({
				'skip-install': true,
				'skip-welcome-message': true
			})
			.withPrompts(answers)
			.on('end', done);
	});

	it('adds references to package.json', function () {
		assert.fileContent('package.json', /grunt-browser-sync/);
	});

	it('creates helper files', function () {
		assert.file(helperPath + "_grunt/browserSync.js");
	});

	it('adds task to Gruntfile.js file', function () {
		assert.fileContent("Gruntfile.js", /\'browserSync\'/);
	});
});
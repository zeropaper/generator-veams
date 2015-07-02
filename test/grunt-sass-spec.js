/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var fs = require('fs');
var answers = require('../test_helpers/prompt-answer-factory')({});

describe('grunt-sass', function () {
	var helperPath = "helpers/";
	var srcPath = "resources/";

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
		assert.fileContent('package.json', /grunt-sass/);
	});

	it('creates helper files: sass', function () {
		assert.file(helperPath + "_grunt/sass.js");
	});

	it('it compiles temp file', function () {
		assert.fileContent(helperPath + "_grunt/sass.js", /styles\.tmp\.scss/);
	});

	it('adds task to Gruntfile.js file', function () {
		assert.fileContent("Gruntfile.js", /sass:dev/);
	});

});
"use strict";

const fs = require('fs-extra'),
	  async = require("async"),
	  webpack = require('webpack'),
	  path = require('path');
	
fs.removeSync(path.resolve('./test/dist/'));

var basePath = path.resolve('./test/src/');

var webpackConfig = [
	require(basePath + '/resource-dev/webpack.config.js'), 		// dev environment
	require(basePath + '/resource-dev1/webpack.config.js'),		// html mode dev environment
	require(basePath + '/resource-dev2/webpack.config.js'),		// html mode dev environment with extension
	require(basePath + '/resource-inline-1/webpack.config.js'),	// inline without compression
	require(basePath + '/resource-inline-2/webpack.config.js'),	// inline with compression
	require(basePath + '/resource-inline-3/webpack.config.js'),		// html mode inline without compression
	require(basePath + '/resource-inline-4/webpack.config.js'),		// html mode inline without compression in dev mode
	require(basePath + '/resource-inline-5/webpack.config.js'),		// inline without compression in dev mode 
	require(basePath + '/resource-inline-6/webpack.config.js'),		// inline without compression with extension
	require(basePath + '/resource-inline-7/webpack.config.js'),		// inline file without webpack parse
	require(basePath + '/resource-md5-1/webpack.config.js'),		// md5 with compression / index chunk before react
	require(basePath + '/resource-md5-2/webpack.config.js'),	    // md5 without compression  / react chunk before index
	require(basePath + '/resource-md5-3/webpack.config.js'),		// html mode md5 without compression
	require(basePath + '/resource-md5-4/webpack.config.js'),		// html mode md5 without quote "/'
	require(basePath + '/resource-md5-5/webpack.config.js'),		// html mode md5 without compression with extension
	require(basePath + '/resource-favico/webpack.config.js'), 	// generate favicon
	require(basePath + '/resource-favico-1/webpack.config.js'), // html mode generate favicon
	require(basePath + '/resource-common-1/webpack.config.js'), 	// common chunk generated by webpack
	require(basePath + '/resource-common-2/webpack.config.js'),	    // html mode common chunk generated by webpack
	require(basePath + '/resource-copy-plugin-1/webpack.config.js'), //  usage with copy-webpack-plugin-hash
	require(basePath + '/resource-copy-plugin-2/webpack.config.js'), //  usage with copy-webpack-plugin-hash
	require(basePath + '/resource-copy-plugin-3/webpack.config.js'), // html mode usage with copy-webpack-plugin-hash
	require(basePath + '/resource-external-1/webpack.config.js'), //  external resource
	require(basePath + '/image-in-html/webpack.config.js'), //  image in html
	require(basePath + '/resource-attr-1/webpack.config.js'), //  resource attribute
];

async.filter(webpackConfig, function(configPath, callback) {
	let compiler = webpack(configPath);
	compiler.run(function(err, stats) {
		callback();
	});
}, function(err, results){
    if (!err) {
    	// console.log(results);
    }
    else {
    	console.log(err);
    }
});
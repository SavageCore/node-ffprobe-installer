'use strict';

var os = require('os');
var fs = require('fs');
var path = require('path');

var verifyFile = require('./lib/verify-file');

var platform = os.platform() + '-' + os.arch();

var packageName = '@ffprobe-installer/' + platform;

if (!require('./package.json').optionalDependencies[packageName]) {
    throw 'Unsupported platform/architecture: ' + platform;
}

var binary = os.platform() === 'win32' ? 'ffprobe.exe' : 'ffprobe';

var npm3Path = path.resolve(__dirname, '..', platform);
var npm2Path = path.resolve(__dirname, 'node_modules', '@ffprobe-installer', platform);

var npm3Binary = path.join(npm3Path, binary);
var npm2Binary = path.join(npm2Path, binary);

var npm3Package = path.join(npm3Path, 'package.json');
var npm2Package = path.join(npm2Path, 'package.json');

var ffprobePath, packageJson;

if (verifyFile(npm3Binary)) {
    ffprobePath = npm3Binary;
    packageJson = require(npm3Package);
} else if (verifyFile(npm2Binary)) {
    ffprobePath = npm2Binary;
    packageJson = require(npm2Package);
} else {
    throw 'Could not find ffprobe executable, tried "' + npm3Binary + '" and "' + npm2Binary + '"';
}

var version = packageJson.ffprobe || packageJson.version;
var url = packageJson.homepage;

module.exports = {
    path: ffprobePath,
    version: version,
    url: url
};

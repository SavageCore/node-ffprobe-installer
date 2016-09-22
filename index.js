'use strict';

var os = require('os');
var fs = require('fs');
var path = require('path');

var verifyFile = require('./lib/verify-file');

var platform = os.platform() + '-' + os.arch();

var packageName = '@ffprobe-installer/' + platform;
var version = require('./package.json').optionalDependencies[packageName];

if (!version) {
    console.error('Unsupported platform/architecture:', platform);
    process.exit(1);
}

var binary = os.platform() === 'win32' ? 'ffprobe.exe' : 'ffprobe';

var npm3Path = path.resolve(__dirname, '..', platform, binary);
var npm2Path = path.resolve(__dirname, 'node_modules', '@ffprobe-installer', platform, binary);

var ffprobePath;
if (verifyFile(npm3Path)) {
    ffprobePath = npm3Path;
} else if (verifyFile(npm2Path)) {
    ffprobePath = npm2Path;
} else {
    throw 'Could not find ffprobePath executable, tried "' + npm3Path + '" and "' + npm2Path + '"';
}

module.exports = {
    path: ffprobePath,
    version: version
};

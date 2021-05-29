'use strict';

const os = require('os');
const path = require('path');

const verifyFile = require('./lib/verify-file');

const platform = os.platform() + '-' + os.arch();

let packageName = '@ffprobe-installer/' + platform;

if (platform === 'darwin-arm64') {
	packageName = 'ffprobe-darwin-arm64';
}

if (!require('./package.json').optionalDependencies[packageName]) {
	throw new Error('Unsupported platform/architecture: ' + platform);
}

const binary = os.platform() === 'win32' ? 'ffprobe.exe' : 'ffprobe';

let appFolder = path.dirname(process.pkg ? process.execPath : (require.main ? require.main.filename : process.argv[0]));

const npm3Path = path.resolve(appFolder, '..', 'node_modules', packageName);
const npm2Path = path.resolve(appFolder, 'node_modules', packageName);

const npm3Binary = path.join(npm3Path, binary);
const npm2Binary = path.join(npm2Path, binary);

const npm3Package = path.join(npm3Path, 'package.json');
const npm2Package = path.join(npm2Path, 'package.json');

let ffprobePath;
let packageJson;

if (verifyFile(npm3Binary)) {
	ffprobePath = npm3Binary;
	packageJson = require(npm3Package);
} else if (verifyFile(npm2Binary)) {
	ffprobePath = npm2Binary;
	packageJson = require(npm2Package);
} else {
	throw new Error('Could not find ffprobe executable, tried "' + npm3Binary + '" and "' + npm2Binary + '"');
}

const version = packageJson.ffprobe || packageJson.version;
const url = packageJson.homepage;

module.exports = {
	path: ffprobePath,
	version,
	url
};

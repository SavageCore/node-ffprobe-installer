'use strict';

const os = require('os');
const fs = require('fs');
const path = require('path');

const platform = os.platform() + '-' + os.arch();

const packageName = '@ffprobe-installer/' + platform;
const version = require('./package.json').optionalDependencies[packageName];

if (!version) {
    console.error('Unsupported platform/architecture:', platform);
    process.exit(1);
}

const binary = platform.indexOf('win32') !== -1 ? 'ffprobe.exe' : 'ffprobe';

const ffprobePath = path.resolve(__dirname, '..', platform, binary);

module.exports = {
    path: ffprobePath,
    version: version
};

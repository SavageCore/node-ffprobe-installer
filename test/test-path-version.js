'use strict';

const os = require('os');
const path = require('path');

const test = require('tape');
const semver = require('semver');

const ffprobeInstaller = require('../index');

const platform = os.platform() + '-' + os.arch();
const binary = platform === 'win32' ? 'ffprobe.exe' : 'ffprobe';

test('', (t) => {
    //console.log(ffprobeInstaller.path);
    //console.log(ffprobeInstaller.version);

    t.equals(path.resolve(__dirname, '../..', platform, binary), ffprobeInstaller.path, 'Valid path');
    t.true(semver.valid(ffprobeInstaller.version), 'Valid version number');
    t.end();
});

const test = require('ava');

const executable = require('executable');
const execa = require('execa');

const m = require('.');

test('returns path', t => {
	t.truthy(m.path);
});

test('returns version', t => {
	t.truthy(m.version);
});

test('spawns', async t => {
	const result = await execa(m.path, ['-version']);
	t.falsy(result.stderr);
	t.regex(result.stdout, /ffprobe version/g);
});

test('is executable', async t => {
	t.truthy(await executable(m.path));
});

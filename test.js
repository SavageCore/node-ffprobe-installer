const test = require('ava');
const verifyFile = require('./lib/verify-file.js');

const main = async () => {
	const {execa} = await import('execa');

	const executable = require('executable');

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

	test('verifies file', t => {
		t.true(verifyFile(m.path));
		t.falsy(verifyFile('foo'));
	});
};

main();

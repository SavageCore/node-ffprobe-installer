const fs = require('fs');

function verifyFile(file) {
	try {
		const stats = fs.statSync(file);
		return stats.isFile();
	} catch (ignored) {
		return false;
	}
}

module.exports = verifyFile;

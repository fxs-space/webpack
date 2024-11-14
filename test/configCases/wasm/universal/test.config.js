const fs = require("fs");

module.exports = {
	moduleScope(scope, options) {
		if (options.name.includes("node")) {
			delete scope.window;
			delete scope.document;
			delete scope.self;
		} else {
			scope.fetch = resource =>
				new Promise((resolve, reject) => {
					fs.readFile(resource, (err, data) => {
						if (err) {
							reject(err);
							return;
						}

						return resolve(
							// eslint-disable-next-line n/no-unsupported-features/node-builtins
							new Response(data, {
								headers: { "Content-Type": "application/wasm" }
							})
						);
					});
				});
		}
	}
};

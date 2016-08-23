var gulp = require('gulp');

// define all tasks
require('./gulp/copy.tasks.js')(gulp);
require('./gulp/less.tasks.js')(gulp);
require('./gulp/lint.tasks.js')(gulp);
require('./gulp/webpack.tasks.js')(gulp);

// additional tasks outside of deployment
if (process.argv.indexOf('--deploy') === -1) {
	require('./gulp/test.tasks.js')(gulp);
	require('./gulp/watch.tasks.js')(gulp);
}

require('./gulp/app.tasks.js')(gulp);

// start the actual gulp run
require('./gulp/run')(gulp);

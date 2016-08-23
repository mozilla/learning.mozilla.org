var gulp = require('gulp');

// define all tasks
require('./gulp/copy.tasks.js')(gulp);
require('./gulp/less.tasks.js')(gulp);
require('./gulp/webpack.tasks.js')(gulp);
require('./gulp/test.tasks.js')(gulp);
require('./gulp/watch.tasks.js')(gulp);
require('./gulp/app.tasks.js')(gulp);

// start the actual gulp run
require('./gulp/run')(gulp);

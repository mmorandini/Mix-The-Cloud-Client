const requireDir = require('require-dir');

// Require all tasks in /tasks, including subfolders
requireDir('./tasks', { recurse: true });

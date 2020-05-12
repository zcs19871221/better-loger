const path = require('path');
const remove = require('better-fs').removeSync;

remove(path.join(__dirname, '../dist'));

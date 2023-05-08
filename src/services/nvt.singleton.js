const nvt = require('node-virustotal');

let defaultTimedInstance;

function getVtInstance() {
  if (!defaultTimedInstance) {
    defaultTimedInstance = nvt.makeAPI();
  }
  return defaultTimedInstance;
}

module.exports = getVtInstance;
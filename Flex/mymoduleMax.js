var fs = require('fs');

module.exports = function(dir, filtrstr, callback) {
  fs.readdir(dir, function(err, list) {
    if (err) {
      console.log("There was an error", err);
      callback(err);
    }
    else {
      callback(null, list);
    }
  });
};

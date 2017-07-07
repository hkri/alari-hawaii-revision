/* Express Server for Development */

function serve() {
  var express = require('express');
  var app = express();
  app.use('/', express.static('htdocs', {extensions: ['html']}));
  app.listen(3000);
  console.log('Server up and listening on port 3000.');
}

module.exports = serve;

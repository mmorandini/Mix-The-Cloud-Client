const express = require('express');
const port    = process.env.PORT || 4000;
const app     = express();
const dest    = `${__dirname}/public`;
const http    = require('http');


http.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write('Hello World');
  response.end();
}).listen(8888);

app.use(express.static(dest));

app.get('/*', (req, res) => res.sendFile(`${dest}/index.html`));

app.listen(port, () => console.log(`Express has started on port: ${port}`));

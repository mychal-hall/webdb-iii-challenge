const server = require("./server.js");

const port = 5000;
server.listem(port, function() {
  console.log(`\n=== API Listening on http://localhost:${port} ===\n`);
});

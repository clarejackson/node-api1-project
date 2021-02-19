const server = require('./api/server');

const port = process.env.PORT || 5000;

// START YOUR SERVER HERE
server.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})
const server = require('./api/server');

const port = process.env.PORT || 5000;

// START YOUR SERVER HERE
server.listen(PORT, () => {
  console.log(`server started at localhost:${PORT}`)
})
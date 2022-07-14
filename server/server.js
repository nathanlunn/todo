const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 8080;

app.use(morgan('dev'));

// import routers
const todoRouter = require('./routes/todo-router');

// use routers
app.use('/api/todos', todoRouter);

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
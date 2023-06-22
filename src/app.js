const express = require('express');

const PORT = 3030;
const { bookRouter, libraryRouter, userRouter } = require('./routes');

const { initializeDB } = require('./config/db-config');

const app = express();

app.use(express.json());

app.use('/book', bookRouter);
app.use('/library', libraryRouter);
app.use('/user', userRouter);

app.use((req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(`Call made to resource ${req.url} with method ${req.method}`);
  next();
});

app.listen(PORT, async () => {
  await initializeDB();
  // eslint-disable-next-line no-console
  console.log(`server running on port ${PORT}`);
});

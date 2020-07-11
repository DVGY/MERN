const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const colors = require('colors');

dotenv.config({ path: './config.env' });

const app = express();

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successfull!'.yellow))
  .catch((err) => console.log(err.message));

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/users', require('./routes/userRoute'));

app.all('*', (req, res, next) => {
  console.log('Here 2');
  res.status(404).json({
    status: 'Fail',
    msg: `Can't find ${req.originalUrl} on this server`,
  });
  next();
});
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`.yellow);
});

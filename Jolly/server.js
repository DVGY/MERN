const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const userRoute = require('./routes/userRoute');

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
  .then(() => console.log('\x1b[32m%s\x1b[0m', 'DB connection successfull!'))
  .catch((err) => console.log(err.message));

const PORT = process.env.PORT || 5000;

app.use(express.json());
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   // res.header(
//   //   'Access-Control-Allow-Headers',
//   //   'Origin, X-Requested-With, Content-Type, Accept'
//   // );
//   next();
// });

app.use('/api/users', userRoute);

app.all('*', (req, res, next) => {
  console.log('Here 2');
  res.status(404).json({
    status: 'Fail',
    msg: `Can't find ${req.originalUrl} on this server`,
  });
  next();
});
app.listen(PORT, () => {
  console.log('\n');
  console.log(`\x1b[32mServer started on port ${PORT}\x1b[0m`);
});

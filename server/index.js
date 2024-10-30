import express from 'express';
import morgan from 'morgan';
import signUpRouter from './api/user/common/userInfo.js';

const THRESHOLD = 2000;
const port = process.env.PORT || 8080;
const app = express();

app.use((req, res, next) => {
  const delayTime = Math.floor(Math.random() * THRESHOLD);

  setTimeout(() => {
    next();
  }, delayTime);
});

app.use(morgan('dev'));
app.use(express.static('dist'));
app.use(express.json());

const USER_API_URL = {
  signUp: '/api/user/signup',
};

app.use(USER_API_URL.signUp, signUpRouter);

app.listen(port, () => {
  console.log(`ready to ${port}`);
});

import express from 'express';
import morgan from 'morgan';
import noticeAdminRouter from './api/notice/admin/index.js';
import noticeCommonRouter from './api/notice/common/index.js';
import workUserRouter from './api/work/user/index.js';
import signUpRouter from './api/user/common/userInfo.js';
import userSignInRouter from './api/user/common/index.js';
import workOnRouter from './api/work/user/workOn.js';

const THRESHOLD = 2000;
const port = process.env.PORT || 8080;
const app = express();

app.use((req, res, next) => {
  const delayTime = Math.floor(Math.random() * THRESHOLD);

  setTimeout(() => {
    next();
  }, delayTime);
});

/**
 * @constant apiPathPrefix api 경로 prefix
 */
const apiPathPrefix = '/api';

const commonPath = `${apiPathPrefix}/common`;
const userPath = `${apiPathPrefix}/user`;
const adminPath = `${apiPathPrefix}/admin`;

const USER_API_URL = {
  signUp: `${userPath}/signup`,
  signIn: `${userPath}/signIn`,
};

const NOTICE_API_URL = {
  admin: `${adminPath}/notice`,
  common: `${commonPath}/notice`,
};

const WORK_API_URL = {
  user: `${userPath}/work`,
  workOn: `${userPath}/workOn`,
};

app.use(morgan('dev'));
app.use(express.static('dist'));
app.use(express.json());

// notice 라우터 연결
app.use(NOTICE_API_URL.admin, noticeAdminRouter);
app.use(NOTICE_API_URL.common, noticeCommonRouter);
app.use(USER_API_URL.signUp, signUpRouter);
app.use(USER_API_URL.signIn, userSignInRouter);
app.use(WORK_API_URL.workOn, workOnRouter);

// work 라우터 연결
app.use(WORK_API_URL.user, workUserRouter);

app.listen(port, () => {
  console.log(`ready to ${port}`);
});

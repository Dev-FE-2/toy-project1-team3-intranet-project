import express from 'express';
import morgan from 'morgan';
import noticeAdminRouter from './api/notice/admin/index.js';
import noticeCommonRouter from './api/notice/common/index.js';
import signUpRouter from './api/user/common/userInfo.js';
import userListAdminRouter from './api/user/admin/userListRouter.js';

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
};

const NOTICE_API_URL = {
  admin: `${adminPath}/notice`,
  common: `${commonPath}/notice`,
};

const USERLIST_API_URL = {
  admin: `${adminPath}/userList`
};

app.use(morgan('dev'));
app.use(express.static('dist'));
app.use(express.json());

// notice 라우터 연결
app.use(NOTICE_API_URL.admin, noticeAdminRouter);
app.use(NOTICE_API_URL.common, noticeCommonRouter);
app.use(USER_API_URL.signUp, signUpRouter);

// userList 라우터 연결
app.use(USERLIST_API_URL.admin, userListAdminRouter)

app.listen(port, () => {
  console.log(`ready to ${port}`);
});

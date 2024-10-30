import express from 'express';
import morgan from 'morgan';
import noticeAdminRouter from './api/notice/admin/index.js';
import noticeCommonRouter from './api/notice/common/index.js';
import userListAdminRouter from './api/user/admin/userListRouter.js';

const port = process.env.PORT || 8080;
const app = express();

/**
 * @constant apiPathPrefix api 경로 prefix
 */
const apiPathPrefix = '/api';

const commonPath = `${apiPathPrefix}/common`;
const userPath = `${apiPathPrefix}/user`;
const adminPath = `${apiPathPrefix}/admin`;

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

// userList 라우터 연결
app.use(USERLIST_API_URL.admin, userListAdminRouter)

app.listen(port, () => {
  console.log(`ready to ${port}`);
});

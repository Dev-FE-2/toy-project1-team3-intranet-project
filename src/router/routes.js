import SignIn from '../pages/common/signIn';
import SignUp from '../pages/common/signUp';
import Notice from '../pages/common/notice';

// 페이지 구조 저장 + 렌더링 페이지 정리
const routes = {
  //common
  '/': SignIn,
  '/signup': SignUp,

  //admin
  '/admin/notice': Notice.list,
  '/admin/notice/view': Notice.view,
  '/admin/notice/insert': Notice.form,
  '/admin/notice/update': Notice.form,

  //user
  '/user/notice': Notice.list,
  '/user/notice/view': Notice.view,
};

export default routes;

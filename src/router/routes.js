import SignIn from '../pages/common/signIn';
import SignUp from '../pages/common/signUp';
import AdminAbsence from '../pages/admin/absence';

// 페이지 구조 저장 + 렌더링 페이지 정리
const routes = {
  //common
  '/': SignIn,
  '/signUp': SignUp,

  //admin
  '/admin/absence': AdminAbsence,

  //user
};

export default routes;

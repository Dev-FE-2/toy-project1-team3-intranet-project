import SignIn from '../pages/common/signIn';
import SignUp from '../pages/common/signUp';
import Profile from '../pages/admin/profile';
// 페이지 구조 저장 + 렌더링 페이지 정리
const routes = {
  //common
  '/': SignIn,
  '/signUp': SignUp,

  //admin
  '/admin/profile':Profile,
  //user
  
};

export default routes;

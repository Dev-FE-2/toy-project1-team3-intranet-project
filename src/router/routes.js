import SignIn from '../pages/common/signIn';
import SignUp from '../pages/common/signUp';
import UserList from '../pages/admin/userList';
import Profile from '../pages/common/profile';

// 페이지 구조 저장 + 렌더링 페이지 정리
const routes = {
  //common
  '/': SignIn,
  '/signUp': SignUp,

  //admin
  '/userList': UserList,
  //user
  '/profile': Profile,
};

export default routes;

// import SignIn from '../pages/signIn';
// import SignUp from '../pages/common/signUp';
import UserList from '../pages/userList';
import Profile from '../pages/profile';

// 페이지 구조 저장 + 렌더링 페이지 정리
const routes = {
  //common
  // '/': SignIn,
  // '/signUp': SignUp,

  //admin
  '/': UserList,
  //user
  '/profile': Profile,
};


export default routes;

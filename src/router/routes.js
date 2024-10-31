import SignIn from '../pages/common/signIn';
import SignUp from '../pages/common/signUp';
import AdminAbsence from '../pages/admin/absence';
import UserAbsence from '../pages/user/absence';
import Notice from '../pages/common/notice';
import UserList from '../pages/admin/userList';
import Profile from '../pages/admin/profile';
import UserProfile from '../pages/user/profile';
import ProfileForm from '../pages/admin/profileForm';
import UserProfileForm from '../pages/user/profileForm';
import WorkCheck from '../pages/user/work'

// 페이지 구조 저장 + 렌더링 페이지 정리
// async : 비동기 데이터 사용 여부
const routes = {
  //common
  '/': SignIn,
  '/signUp': SignUp,

  //admin
  '/admin/absence': AdminAbsence,
  '/admin/notice': { ...Notice.list, async: true },
  '/admin/notice/view': Notice.view,
  '/admin/notice/insert': Notice.form,
  '/admin/notice/update': Notice.form,
  '/admin/userList': UserList,
  '/admin/profile': Profile,
  '/admin/profileForm': ProfileForm,

  //user
  '/user/absence': { ...UserAbsence, async: true },
  '/user/notice': Notice.list,
  '/user/notice/view': Notice.view,
  '/user/profile':UserProfile,
  '/user/profile/profileForm':UserProfileForm,
  '/user/work':{ ...WorkCheck, async: true }
};

export default routes;

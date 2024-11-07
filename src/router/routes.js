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
import WorkCheck from '../pages/user/work';
import attendance from '../pages/user/attendance';

// 페이지 구조 저장 + 렌더링 페이지 정리
// async : 비동기 데이터 사용 여부
const routes = {
  //common
  '/': SignIn,
  '/signUp': SignUp,

  //admin
  '/admin/absence': { ...AdminAbsence, async: true, grade: 0 },
  '/admin/notice': { ...Notice.list, async: true, grade: 0 },
  '/admin/notice/view/:noticeSn': { ...Notice.view, async: true, grade: 0 },
  '/admin/notice/insert': { ...Notice.form, async: true, grade: 0 },
  '/admin/notice/update/:noticeSn': { ...Notice.form, async: true, grade: 0 },
  '/admin/userList': { ...UserList, async: true, grade: 0 },
  '/admin/user/:userSn': { ...Profile, grade: 0 },
  '/admin/user/profileForm/:userSn': { ...ProfileForm, grade: 0 },

  //user
  '/user/absence': { ...UserAbsence, async: true, grade: 1 },
  '/user/notice': { ...Notice.list, async: true, grade: 1 },
  '/user/notice/view': { ...Notice.view, async: true, grade: 1 },
  '/user/profile': { ...UserProfile, grade: 1 },
  '/user/profile/profileForm': { ...UserProfileForm, grade: 1 },
  '/user/work': { ...WorkCheck, async: true, grade: 1 },
  '/user/attendance': { ...attendance, grade: 1 },
};

export default routes;

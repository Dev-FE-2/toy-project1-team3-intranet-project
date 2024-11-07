import axios from 'axios';
import Loader from '../../../components/loader/Loader';

const loader = new Loader();
// 사용자 로그인 함수
const signInUser = async (userId, userPW) => {
  const params = {
    USER_ID: userId.value,
    USER_PW: userPW.value,
  };

  try {
    loader.show();
    const response = await axios.post('/api/user/signIn', params);
    const { data } = response.data;

    if (data['isLogin']) {
      window.localStorage.setItem('userSn', data['USER_SERIAL_NUMBER']);
      window.localStorage.setItem('userGrade', data['USER_GRADE']);
      checkUserGrade();
    } else {
      loader.hide();
      alert('잘못된 로그인 정보입니다.');
    }
  } catch (error) {
    throw new Error(error);
  }
};

// 이벤트 리스너 추가
const addEventListeners = () => {
  const userId = document.getElementById('id');
  const userPW = document.getElementById('pw');
  const button = document.querySelector('button[type="button"]');
  const submit = document.querySelector('button[type="submit"]');

  button.addEventListener('click', () => {
    window.location.pathname = '/signUp';
  });

  submit.addEventListener('click', (e) => {
    e.preventDefault();
    signInUser(userId, userPW);
  });
};

// 사용자 권한 확인 함수
const checkUserGrade = () => {
  const userGrade = window.localStorage.getItem('userGrade');
  if (userGrade === '0') {
    window.location.href = '/admin/userList';
  } else if (userGrade === '1') {
    window.location.href = '/user/attendance';
  }
};

// 메인 함수
const signInFunc = () => {
  addEventListeners();
  checkUserGrade();
};

export default signInFunc;

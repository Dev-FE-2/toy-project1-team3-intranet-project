import axios from 'axios';

// 기능 추가
const signInFunc = async () => {
  const userId = document.getElementById('id');
  const userPW = document.getElementById('pw');
  const button = document.querySelector('button[type="button"]');
  const submit = document.querySelector('button[type="submit"]');

  const signInUser = async () => {
    const params = {
      USER_ID: userId.value,
      USER_PW: userPW.value,
    };
    try {
      const response = await axios.post('/api/user/signIn', params);
      const { data } = response.data;
      if (data['isLogin']) {
        window.localStorage.setItem('userSn', data['USER_SERIAL_NUMBER']);
        window.localStorage.setItem('userGrade', data['USER_GRADE']);
        console.log(typeof data['USER_GRADE']);
        data['USER_GRADE']
          ? (window.location.href = '/user/workOn')
          : (window.location.href = '/admin/userList');
      } else {
        alert('잘못된 로그인 정보입니다.');
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  button.addEventListener('click', () => {
    window.location.pathname = '/signUp';
  });

  submit.addEventListener('click', (e) => {
    e.preventDefault();
    signInUser();
  });

  // 사용자 권한을 확인하고 사용자 위치 라우팅
  if (window.localStorage.getItem('userGrade') == '0') {
    window.location.href = '/admin/userList';
  } else if (window.localStorage.getItem('userGrade') == '1') {
    window.location.href = '/user/workOn';
  }
};

export default signInFunc;

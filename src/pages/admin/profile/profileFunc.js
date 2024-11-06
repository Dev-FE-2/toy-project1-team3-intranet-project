import axios from 'axios';

// 사용자 정보 가져오기
const getUserInfo = async (userSn) => {
  try {
    const query = `?userSn=${userSn}`;
    const { data } = await axios.get(`/api/user/userInfo${query}`);
    return data['data'];
  } catch (error) {
    console.log(error);
  }
};

// 사용자 프로필 업데이트
const updateProfile = (userData) => {
  const profileImg = document.getElementById('profileImg');
  const name = document.getElementById('name');
  const grade = document.getElementById('grade');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');

  const defaultImage = '/src/assets/img/default_user.svg';
  profileImg.src = userData['USER_IMAGE'] || defaultImage;

  name.textContent = userData['USER_NAME'];
  grade.textContent = userData['USER_RANK'];
  email.textContent = userData['USER_EMAIL'];
  phone.textContent = userData['USER_PHONE_NUMBER'];
};

// 이벤트 리스너 추가
const changeURL = (userSn) => {
  const updateUser = document.getElementById('updateUser');

  updateUser.addEventListener('click', () => {
    window.location.pathname = `/admin/user/profileForm/${userSn}`;
  });
};

// 메인 함수
const profileFunc = async () => {
  const userSn = window.location.pathname.split('/').pop();
  const userData = await getUserInfo(userSn);
  updateProfile(userData);
  changeURL(userSn);
};

export default profileFunc;

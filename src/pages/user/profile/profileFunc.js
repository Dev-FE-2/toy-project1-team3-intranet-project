import axios from 'axios';

const profileFunc = async () => {
  const profileImg = document.getElementById('profileImg');
  const name = document.getElementById('name');
  const grade = document.getElementById('grade');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const updateUser = document.getElementById('updateUser');
  const userSn = window.localStorage.getItem('userSn');

  const getUserData = async () => {
    try {
      const query = `?userSn=${userSn}`;
      const { data } = await axios.get(`/api/user/userInfo${query}`);
      const response = await data['data'];
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const userData = await getUserData();

  const defaultImage = '/public/vite.svg';
  if (userData['USER_IMAGE']) {
    profileImg.src = `data:image/png;base64,${userData['USER_IMAGE']}`;
  } else {
    profileImg.src = defaultImage;
  }

  name.textContent = userData['USER_NAME'];
  grade.textContent = userData['USER_RANK'];
  email.textContent = userData['USER_EMAIL'];
  phone.textContent = userData['USER_PHONE_NUMBER'];

  updateUser.addEventListener('click', () => {
    window.location.pathname = '/user/profileForm';
  });
};

export default profileFunc;

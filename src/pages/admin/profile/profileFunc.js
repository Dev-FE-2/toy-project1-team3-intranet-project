import axios from 'axios';

const profileFunc = async () => {
  const profileImg = document.getElementById('profileImg');
  const name = document.getElementById('name');
  const grade = document.getElementById('grade');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const updateUser = document.getElementById('updateUser');
  const userSn = window.location.pathname.split('/').pop();

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

  const defaultImage = '/src/img/default_user.svg';
  if (userData['USER_IMAGE']) {
    profileImg.src = userData['USER_IMAGE'];
  } else {
    profileImg.src = defaultImage;
  }

  name.textContent = userData['USER_NAME'];
  grade.textContent = userData['USER_GRADE'];
  email.textContent = userData['USER_EMAIL'];
  phone.textContent = userData['USER_PHONE_NUMBER'];

  updateUser.addEventListener('click', () => {
    window.location.pathname = `/admin/user/profileForm/${userSn}`;
  });
};

export default profileFunc;

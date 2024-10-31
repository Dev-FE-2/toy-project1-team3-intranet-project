import axios from 'axios';

// 기능 추가
const profileFormFunc = async () => {
  const profileImg = document.getElementById('profileImg');
  const fileInput = document.getElementById('file');
  const name = document.getElementById('name');
  const grade = document.getElementById('grade');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const updateUser = document.getElementById('updateUser');
  const cancel = document.getElementById('cancel');
  const userSn = window.localStorage.getItem('userSn');
  let base64Image;

  const fileChange = () => {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onloadend = async (e) => {
      base64Image = e.target.result;
      profileImg.src = e.target.result;
    };

    reader.readAsDataURL(file);
  };

  const getUserData = async () => {
    try {
      const query = `?userSn=${userSn}`;
      const { data } = await axios.get(`/api/user/userUpdate${query}`);
      const response = await data['data'];
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const postUserData = async () => {
    const params = {
      userSn: userSn,
      grade: grade.value,
      name: name.value,
      phone: phone.value,
      email: email.value,
      profileImage: base64Image,
    };

    try {
      const response = await axios.put('/api/user/userUpdate', params);
      console.log('업로드 성공:', response.data);
    } catch (error) {
      console.error('업로드 실패:', error);
    }
    history.back();
  };

  const userData = await getUserData();

  const defaultImage = '/public/vite.svg';
  if (userData['USER_IMAGE']) {
    profileImg.src = userData['USER_IMAGE'];
    base64Image = userData['USER_IMAGE'];
  } else {
    profileImg.src = defaultImage;
    base64Image = null;
  }

  name.value = userData['USER_NAME'];
  grade.value = userData['USER_GRADE'];
  email.value = userData['USER_EMAIL'];
  phone.value = userData['USER_PHONE_NUMBER'];

  fileInput.addEventListener('change', fileChange);
  updateUser.addEventListener('click', postUserData);
  cancel.addEventListener('click', () => history.back());
};

export default profileFormFunc;

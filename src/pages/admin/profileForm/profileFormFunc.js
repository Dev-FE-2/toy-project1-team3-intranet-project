import axios from 'axios';

// 기능 추가
const profileFormFunc = async () => {
  const profileImg = document.getElementById('profileImg');
  const fileInput = document.getElementById('file');
  const name = document.getElementById('name');
  const rank = document.getElementById('rank');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const updateUser = document.getElementById('updateUser');
  const closeButton = document.getElementById('closeButton');
  const cancel = document.getElementById('cancel');
  const userSn = window.location.pathname.split('/').pop();
  let base64Image;

  const fileChange = () => {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onloadend = async (e) => {
      if (file) {
        base64Image = e.target.result;
        profileImg.src = e.target.result;
        closeButton.classList.remove('hidden');
        console.log(closeButton);
      } else {
        profileImg.src = defaultImage;
        base64Image = null;
      }
    };

    reader.readAsDataURL(file);
    fileInput.value = '';
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
      rank: rank.value,
      name: name.value,
      phone: phone.value,
      email: email.value,
      profileImage: base64Image,
    };

    try {
      const response = await axios.put('/api/user/userUpdate', params);
      console.log('업로드 성공:', response.data);
      return window.location.replace(`/admin/user/${userSn}`);
    } catch (error) {
      console.error('업로드 실패:', error);
    }
  };

  const deleteImage = async () => {
    console.log('a');
    profileImg.src = defaultImage;
    base64Image = null;
    closeButton.classList.add('hidden');
  };

  const userData = await getUserData();

  const defaultImage = '/src/img/default_user.svg';
  if (userData['USER_IMAGE']) {
    profileImg.src = userData['USER_IMAGE'];
    base64Image = userData['USER_IMAGE'];
    closeButton.classList.remove('hidden');
  } else {
    profileImg.src = defaultImage;
    base64Image = null;
    closeButton.classList.add('hidden');
  }

  name.value = userData['USER_NAME'];
  rank.value = userData['USER_RANK'];
  email.value = userData['USER_EMAIL'];
  phone.value = userData['USER_PHONE_NUMBER'];

  fileInput.addEventListener('change', fileChange);
  updateUser.addEventListener('click', postUserData);
  closeButton.addEventListener('click', deleteImage);
  cancel.addEventListener('click', () =>
    window.location.replace(`/admin/user/${userSn}`)
  );
};

export default profileFormFunc;

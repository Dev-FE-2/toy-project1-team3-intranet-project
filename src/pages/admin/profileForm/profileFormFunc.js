import axios from 'axios';
import { apiRequest } from '../../../utils/apiUtils';

const DEFAULT_IMAGE = '/src/assets/img/default_user.svg';
let base64Image;

// 사용자 정보 가져오기
const getUserData = async (userSn) => {
  try {
    const query = `?userSn=${userSn}`;
    const { data } = await apiRequest(`/api/user/userUpdate${query}`, {
      method: 'GET',
    });

    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

// 사용자 프로필 업데이트
const updateProfile = (profileImg, userData) => {
  const name = document.getElementById('name');
  const rank = document.getElementById('rank');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const closeButton = document.getElementById('closeButton');

  profileImg.src = userData['USER_IMAGE'] || DEFAULT_IMAGE;
  base64Image = userData['USER_IMAGE'] || null;
  if (userData['USER_IMAGE']) {
    closeButton.classList.remove('hidden');
  } else {
    closeButton.classList.add('hidden');
  }

  name.value = userData['USER_NAME'];
  rank.value = userData['USER_RANK'];
  email.value = userData['USER_EMAIL'];
  phone.value = userData['USER_PHONE_NUMBER'];
};

// 파일 변경 처리
const handleFileChange = (fileInput, profileImg, closeButton) => {
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onloadend = (e) => {
    if (file) {
      profileImg.src = e.target.result;
      base64Image = e.target.result;
      closeButton.classList.remove('hidden');
    } else {
      profileImg.src = DEFAULT_IMAGE;
      base64Image = null;
      closeButton.classList.add('hidden');
    }
  };

  reader.readAsDataURL(file);
  fileInput.value = '';
};

// 사용자 정보 전송
const postUserData = async (userSn, userData) => {
  const params = {
    userSn,
    ...userData,
  };

  try {
    const response = await axios.put('/api/user/userUpdate', params);
    console.log('업로드 성공:', response.data);
    window.location.replace(`/admin/user/${userSn}`);
  } catch (error) {
    console.error('업로드 실패:', error);
  }
};

// 이미지 삭제
const deleteImage = (profileImg, closeButton) => {
  profileImg.src = DEFAULT_IMAGE;
  base64Image = null;
  closeButton.classList.add('hidden');
};

// 이벤트 리스너 추가
const updateData = (fileInput, profileImg, closeButton, userSn) => {
  const updateUser = document.getElementById('updateUser');
  const cancel = document.getElementById('cancel');
  const name = document.getElementById('name');
  const rank = document.getElementById('rank');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');

  fileInput.addEventListener('change', () => {
    handleFileChange(fileInput, profileImg, closeButton);
  });

  updateUser.addEventListener('click', () => {
    const userData = {
      rank: rank.value,
      name: name.value,
      phone: phone.value,
      email: email.value,
      profileImage: base64Image,
    };

    postUserData(userSn, userData);
  });

  closeButton.addEventListener('click', () => {
    deleteImage(profileImg, closeButton);
  });

  cancel.addEventListener('click', () => {
    window.location.replace(`/admin/user/${userSn}`);
  });
};

// 메인 함수
const profileFormFunc = async () => {
  const userSn = window.location.pathname.split('/').pop();
  const profileImg = document.getElementById('profileImg');

  // 사용자 정보를 불러와서 렌더링
  const userData = await getUserData(userSn);
  updateProfile(profileImg, userData);

  // 이벤트 리스너 추가 및 사용자 정보 수정
  const fileInput = document.getElementById('file');
  const closeButton = document.getElementById('closeButton');

  updateData(fileInput, profileImg, closeButton, userSn);
};

export default profileFormFunc;

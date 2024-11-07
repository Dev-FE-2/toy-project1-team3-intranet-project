import axios from 'axios';
import style from './attendanceModal.module.css';
import { apiRequest } from '../../../utils/apiUtils';

const userSn = window.localStorage.getItem('userSn');
const DEFAULT_IMAGE = '/src/assets/img/default_user.svg';
let workData;

// 사용자 정보 가져오기
const getUserData = async () => {
  const query = `?userSn=${userSn}`;
  try {
    // const { data } = await axios.get(`/api/user/attendance${query}`);
    const { data } = await apiRequest(`/api/user/attendance${query}`, {
      method: 'GET',
    });
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

// 사용자 출결 정보 가져오기
const getWorkData = async () => {
  const query = `?userSn=${userSn}`;
  try {
    const { data } = await apiRequest(`/api/user/attendance/working${query}`, {
      method: 'GET',
    });
    workData = data;
    return data;
  } catch (error) {
    console.error('Error fetching work data:', error);
  }
};

// 사용자 프로필 및 출결 정보 업데이트
const fetchAttendanceData = (userData, workData) => {
  const profileImg = document.getElementById('profileImg');
  const name = document.getElementById('name');
  const workTime = document.getElementById('workTime');
  const attendTime = document.getElementById('attendTime');
  const isWork = document.getElementById('isWork');
  const button = document.getElementById('attendButton');

  profileImg.src = userData['USER_IMAGE'] || DEFAULT_IMAGE;
  name.innerText = userData['USER_NAME'];

  workTime.innerText = workData.isWork ? workData.WORK_START_DATE_TIME : '-';
  attendTime.innerText =
    workData.isWork == 2 ? workData.WORK_END_DATE_TIME : '-';

  if (workData['isWork'] == 2) {
    isWork.innerHTML = '퇴근';
    button.innerHTML = '확인';
  } else if (workData['isWork']) {
    isWork.innerHTML = '출근';
    button.innerHTML = '퇴근하기';
  } else {
    isWork.innerHTML = '출근전';
    button.innerHTML = '출근하기';
  }
};

const updateData = async () => {
  const [userData, workData] = await Promise.all([
    getUserData(),
    getWorkData(),
  ]);
  fetchAttendanceData(userData, workData);
  console.log(workData);
  return { userData: userData, workData: workData };
};

// 출근 처리
const itWork = async () => {
  try {
    const params = { userSn };
    // const { data } = await axios.post('/api/user/attendance', params);
    const { data } = await apiRequest('/api/user/attendance', {
      method: 'POST',
      body: params,
    });
    return data;
  } catch (error) {
    console.error('Error working:', error);
  }
};

// 퇴근 처리
const itLeave = async () => {
  try {
    const params = { userSn };
    // const { data } = await axios.put('/api/user/attendance', params);
    const { data } = await apiRequest('/api/user/attendance', {
      method: 'PUT',
      body: params,
    });
    return data;
  } catch (error) {
    console.error('Error leaving work:', error);
  }
};

// 모달 닫기 함수
const closeModal = () => {
  const modal = document.getElementById('modal');
  modal.innerHTML = null;
};

// 확인 버튼 클릭 시 동작
const handleConfirmClick = async (workData) => {
  if (workData['isWork']) {
    closeModal();
    await itLeave(userSn);
  } else {
    closeModal();
    await itWork(userSn);
  }
  updateData();
};

// 모달 표시
const showModal = (workData) => {
  const modal = document.getElementById('modal');
  const date = new Date();
  if (workData['isWork'] === 0 || workData['isWork'] === 1) {
    modal.innerHTML = `<div class="${style.modal}">
    <div class="${style.checkWork}">
      <h2>${workData['isWork'] ? '퇴근' : '출근'} 확인</h2>
      <h3>${workData['isWork'] ? '퇴근' : '출근'}을 처리 하시겠습니까?</h3>
      <div>
        <span>
          현재 시각 - ${String(date.getHours()).padStart(2, '0')} : 
          ${String(date.getMinutes()).padStart(2, '0')}
        </span>
        ${
          workData['isWork']
            ? `<span>
              출근 시각 - ${workData['WORK_START_DATE_TIME']}
            </span>`
            : ''
        }
      </div>
      <button id="confirm" type="button" class="${style.confirmButton}">
        확인
      </button>
      <button id="cancel" type="button" class="cancelButton">
        취소
      </button>
    </div>
  </div>`;

    const confirm = document.getElementById('confirm');
    confirm.addEventListener('click', () => {
      handleConfirmClick(workData);
    });
    const cancel = document.getElementById('cancel');
    cancel.addEventListener('click', closeModal);
  }
};

// 메인 함수
const attendanceFunc = async () => {
  await updateData();

  const button = document.getElementById('attendButton');
  button.addEventListener('click', () => {
    showModal(workData);
  });
};

export default attendanceFunc;

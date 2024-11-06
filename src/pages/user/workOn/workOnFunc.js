import axios from 'axios';
import style from './workonModal.module.css';

const workOnFunc = async () => {
  const date = new Date();
  const userSn = window.localStorage.getItem('userSn');
  let userData; // 사용자 정보 객체
  let workData; // 출결 정보 객체

  const name = document.getElementById('name');
  const button = document.getElementById('attendButton');
  const modal = document.getElementById('modal');
  const workTime = document.getElementById('workTime');
  const attendTime = document.getElementById('attendTime');
  const isWork = document.getElementById('isWork');
  const profileImg = document.getElementById('profileImg');
  let cancel; // 모달 확인 버튼
  let confirm; // 모달 취소 버튼

  const getUserData = async () => {
    const query = `?userSn=${userSn}`;
    try {
      const { data } = await axios.get(`/api/user/workOn${query}`);
      userData = data['data'];
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    name.innerText = userData['USER_NAME'];
    if (userData['USER_IMAGE']) {
      profileImg.src = userData['USER_IMAGE'];
    } else {
      profileImg.src = '/src/img/default_user.svg';
    }
  };

  const getWorkData = async () => {
    const userSn = window.localStorage.getItem('userSn');
    const query = `?userSn=${userSn}`;

    try {
      const { data } = await axios.get(`/api/user/workOn/working${query}`);
      workData = data['data'];

      workTime.innerText = workData.isWork
        ? workData.WORK_START_DATE_TIME
        : '-';
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
    } catch (error) {
      console.log(error);
    }
  };

  const itWork = async () => {
    try {
      const params = {
        userSn: userSn,
      };
      const { data } = await axios.post('/api/user/workOn', params);
      getWorkData();
    } catch (error) {
      console.log(error);
    }
  };

  const itLeave = async () => {
    try {
      const params = {
        userSn: userSn,
      };
      const { data } = await axios.put('/api/user/workOn', params);
      getWorkData();
    } catch (error) {
      console.log(error);
    }
  };

  const onModal = () => {
    if (workData['isWork'] != 2) {
      modal.innerHTML = `
      <article class="${style.modal}">
        <section class="${style.checkWork}">
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
        </section>
      </article>`;

      confirm = document.getElementById('confirm');
      confirm.addEventListener('click', () => {
        workData['isWork'] ? itLeave() : itWork();
        modal.innerHTML = null;
      });

      cancel = document.getElementById('cancel');
      cancel.addEventListener('click', () => {
        modal.innerHTML = null;
      });

      return () =>
        cancel.removeEventListener('click', () => {
          modal.innerHTML = null;
        });
    }
  };

  await Promise.all([getUserData(), getWorkData()]);

  button.addEventListener('click', () => {
    onModal();
  });
};

export default workOnFunc;

import styles from './userAbsence.module.css';
import { renderUserAbsenceList } from './absenceRender';

// const userSn = localStorage.getItem('userSn');
const userSn = 'USER_00000001';
let currentSearchType = '';
let currentSearchTerm = '';

export const fetchUserAbsence = async (page = 1, searchType = '', searchTerm = '', userInfo = userSn) => {
  const url = `/api/user/absence?userSn=${encodeURIComponent(userInfo)}&page=${page}&searchType=${encodeURIComponent(searchType)}&searchTerm=${encodeURIComponent(searchTerm)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch items');
    return await response.json();
  } catch (error) {
    console.error('Error fetching items:', error);
    return { data: [], page, size: 10, totalCount: 0, totalPage: 1 };
  }
}

const absenceFunc = async () => {
  const modal = document.querySelector('.modal');
  const modalBack = document.querySelector('.modalBack');
  const modalOpen = document.getElementById('absenceBtn');
  const modalClose = document.querySelector('.closeBtn');

  modalOpen.addEventListener('click',function(){
    //display 속성을 block로 변경
    modal.style.display = 'block';
  });
  //닫기 버튼을 눌렀을 때 모달팝업이 닫힘
  modalClose.addEventListener('click',function(){
    //display 속성을 none으로 변경
      modal.style.display = 'none';
  });
  modalBack.addEventListener('click',function(){
    //display 속성을 none으로 변경
      modal.style.display = 'none';
  });
};



export default absenceFunc;

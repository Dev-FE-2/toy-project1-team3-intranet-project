import styles from './userAbsence.module.css';
import { renderUserAbsenceList } from './absenceRender';

// const userSn = localStorage.getItem('userSn');
const userSn = 'USER_00000001'; // 테스트 데이터
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

const pagination = (currentPage, totalPages) => {
  const pageButtons = [];
  const startPage = Math.max(currentPage - 5, 1);
  const endPage = Math.min(startPage + 9, totalPages);

  for (let i = startPage; i <= endPage; i++) {
    pageButtons.push(
      `<li class="${styles.pageBtn}">
         <button class="${i === currentPage ? `${styles.active} currentPage` : ''}">
           ${i}
         </button>
       </li>`
    );
  }

  return /* HTML */ `
    <ul class="${styles.pagination}">
      <li class="${styles.pageBtn}">
        <button class="prev" ${currentPage === 1 ? 'disabled' : ''}>
          &lt;
        </button>
      </li>
      ${pageButtons.join('')}
      <li class="${styles.pageBtn}">
        <button class="next" ${currentPage === totalPages ? 'disabled' : ''}>
          &gt;
        </button>
      </li>
    </ul>
  `;
};

/**
 * 페이징 처리를 위한 함수
 * @param {number} totalPage 데이터의 총 페이지 수
 * @param {number} currentPage 현재 페이지
 */
const setupPagination = (totalPage, currentPage = 1) => {
  const paginationContainer = document.getElementById('pagination');
  paginationContainer.innerHTML = pagination(currentPage, totalPage);
};

/**
 * 페이지네이션 버튼 이벤트 핸들러
 * @param {number} totalPage 데이터의 총 페이지 수
 */
const handlePagination = async (event, totalPage) => {
  const target = event.target;
  if (target.tagName !== 'BUTTON') return;

  let currentPage = parseInt(document.querySelector('.currentPage').innerText);

  let newPage = currentPage;

  if (target.classList.contains('prev') && currentPage > 1) {
    newPage = currentPage - 1;
  } else if (target.classList.contains('next') && currentPage < totalPage) {
    newPage = currentPage + 1;
  } else {
    newPage = parseInt(target.innerText, 10);
  }

  if (newPage !== currentPage) {
    currentPage = newPage;
    await updateUserAbsenceList(newPage);
  }
};

/**
 * 출근관리 리스트 업데이트 함수
 * @param {number} page 현재 페이지
 */
const updateUserAbsenceList = async (page = 1) => {
  const { data, totalPage } = await fetchUserAbsence(page, currentSearchType, currentSearchTerm);

  // 출근관리 리스트 렌더링
  document.getElementById('absenceList').innerHTML = renderUserAbsenceList(data);

  // 페이지네이션 갱신
  setupPagination(totalPage, page);
};

const absenceFunc = async () => {
  const modal = document.querySelector('.modal');
  const modalBack = document.querySelector('.modalBack');
  const modalOpen = document.getElementById('absenceBtn');
  const modalClose = document.querySelector('.closeBtn');
  const { totalPage } = await fetchUserAbsence();
  const searchTerm = document.getElementById('searchTerm');
  const searchType = document.getElementById('searchType');
  const searchBtn = document.getElementById('searchBtn');
  const paginationContainer = document.getElementById('pagination');

  const searchWorks = async () => {
    currentSearchTerm = searchTerm.value.toLowerCase(); // 전역 변수에 검색어 저장
    currentSearchType = searchType.value;

    // 검색어에 맞는 데이터를 받아와 렌더링
    await updateUserAbsenceList();
  };

  // 첫 번째 페이지로 초기화
  setupPagination(totalPage, 1);

  // 페이지네이션 버튼 이벤트 리스너 추가
  paginationContainer.addEventListener('click', (event) =>
    handlePagination(event, totalPage)
  );

  // 검색 이벤트 리스너
  searchBtn.addEventListener('click', searchWorks);

  searchTerm.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      searchWorks();
    }
  });

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

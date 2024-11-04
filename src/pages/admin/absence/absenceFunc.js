import styles from './adminAbsence.module.css';
import { renderAdminAbsenceList } from './absenceRender';

let currentSearchType = '';
let currentSearchTerm = '';

/**
 * 부재 리스트 데이터 호출
 * @param {number} page 현재 페이지 번호
 * @param {string} searchType 부재 항목
 * @param {string} searchTerm 검색어
 */ 
export const fetchAdminAbsence = async (page = 1, searchType = '', searchTerm = '') => {
  const url = `/api/admin/absence?page=${page}&searchType=${encodeURIComponent(searchType)}&searchTerm=${encodeURIComponent(searchTerm)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch items');
    return await response.json();
  } catch (error) {
    console.error('Error fetching items:', error);
    return { data: [], page, size: 10, totalCount: 0, totalPage: 1 };
  }
}

// 페이지네이션 버튼 생성
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
        <button class="first" ${currentPage === 1 ? 'disabled' : ''}>
          &lt;&lt;
        </button>
      </li>
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
      <li class="${styles.pageBtn}">
        <button class="last" ${currentPage === totalPages ? 'disabled' : ''}>
          &gt;&gt;
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
  } else if (target.classList.contains('first') && currentPage > 1) {
    newPage = 1;
  } else if (target.classList.contains('last') && currentPage < totalPage) {
    newPage = totalPage;
  } else {
    newPage = parseInt(target.innerText, 10);
  }

  if (newPage !== currentPage) {
    currentPage = newPage;
    await updateAdminAbsenceList(newPage);
  }
};

/**
 * 출근관리 리스트 업데이트 함수
 * @param {number} page 현재 페이지
 */
const updateAdminAbsenceList = async (page = 1) => {
  const { data, totalPage } = await fetchAdminAbsence(page, currentSearchType, currentSearchTerm);

  // 출근관리 리스트 렌더링
  document.getElementById('absenceList').innerHTML = renderAdminAbsenceList(data);

  // 페이지네이션 갱신
  setupPagination(totalPage, page);
};

const absenceFunc = async () => {
  const { totalPage } = await fetchAdminAbsence();
  const searchTerm = document.getElementById('searchTerm');
  const searchType = document.getElementById('searchType');
  const searchBtn = document.getElementById('searchBtn');
  const paginationContainer = document.getElementById('pagination');

  const searchWorks = async () => {
    // 전역 변수에 검색어 저장
    currentSearchTerm = searchTerm.value.toLowerCase();
    currentSearchType = searchType.value;

    // 검색어에 맞는 데이터를 받아와 렌더링
    await updateAdminAbsenceList();
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
};



export default absenceFunc;

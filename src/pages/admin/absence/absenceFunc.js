import styles from './adminAbsence.module.css';
import { renderAdminAbsenceList } from './absenceRender';
import { apiRequest } from '../../../utils/apiUtils';

// 상수 정의
const DEFAULT_PAGE = 1;
const PAGE_SIZE = 10;

// 상태 관리 객체
const state = {
  currentSearchType : '',
  currentSearchTerm : '',
  currentPage : DEFAULT_PAGE,
}


/**
 * 부재 리스트 데이터 호출
 * @param {number} [page=DEFAULT_PAGE] - 현재 페이지 번호
 * @param {string} [searchType=''] - 부재 항목(선택사항)
 * @param {string} [searchTerm =''] - 검색어(선택사항)
 * @returns {object} page, size, totalCount, totalPage, data 반환
 */ 
export const fetchAdminAbsence = async (page = DEFAULT_PAGE, searchType = '', searchTerm = '') => {
  const url = `/api/admin/absence?page=${page}&searchType=${encodeURIComponent(searchType)}&searchTerm=${encodeURIComponent(searchTerm)}`;

  try {
    return await apiRequest(url, {method:'GET'});
  } catch (error) {
    console.error('Error fetching items:', error);
    return { data: [], page, size: PAGE_SIZE, totalCount: 0, totalPage: 1 };
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
         <button class="${i === currentPage ? `${styles.active} currentPage` : 'unSelectBtn'}">
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
 */
const setupPagination = (totalPage) => {
  const paginationContainer = document.getElementById('pagination');
  paginationContainer.innerHTML = pagination(state.currentPage, totalPage);
};

/**
 * 페이지네이션 버튼 이벤트 핸들러
 * @param {event} event - 이벤트 객체
 * @param {number} totalPage - 데이터의 총 페이지 수
 */
const handlePagination = async (event, totalPage) => {
  const target = event.target;
  if (target.tagName !== 'BUTTON') return;

  let currentPage = state.currentPage;
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
    state.currentPage = newPage;
    await updateAdminAbsenceList(newPage);
  }
};

/**
 * 출근관리 리스트 업데이트 함수
 * @param {number} [page=DEFAULT_PAGE] - 페이지 번호
 */
const updateAdminAbsenceList = async (page = DEFAULT_PAGE) => {
  const { data, totalPage } = await fetchAdminAbsence(page, state.currentSearchType, state.currentSearchTerm);

  // 출근관리 리스트 렌더링
  document.getElementById('absenceList').innerHTML = renderAdminAbsenceList(data);

  // 페이지네이션 갱신
  setupPagination(totalPage, page);
};

/**
 * 검색 처리 함수
 */
const searchAbsences = async () => {
  state.currentSearchTerm = document.getElementById('searchTerm').value.toLowerCase();
  state.currentSearchType = document.getElementById('searchType').value;

  // 검색어에 맞는 데이터를 받아와 렌더링
  await updateAdminAbsenceList();
};

/**
 * 이벤트 초기화 함수
 */
const initEventListeners = (totalPage) => {
  document.getElementById('pagination').addEventListener('click', (event) =>
    handlePagination(event, totalPage)
  );

  const searchBtn = document.getElementById('searchBtn');
  searchBtn.addEventListener('click', searchAbsences);

  document.getElementById('searchTerm').addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      searchAbsences();
    }
  });
}

const absenceFunc = async () => {
  const { totalPage } = await fetchAdminAbsence();
  setupPagination(totalPage);
  initEventListeners(totalPage);
};



export default absenceFunc;

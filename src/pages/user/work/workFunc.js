import '../../../assets/css/buttons.css';
import styles from './work.module.css';
import { renderWorkList } from "./workRender";
import { apiRequest } from '../../../utils/apiUtils';

// 상수 정의
const DEFAULT_PAGE = 1;
const PAGE_SIZE = 10;

// 상태 관리 객체
const state = {
  userSn : localStorage.getItem('userSn'),
  currentSearchTerm : '',
  currentPage : DEFAULT_PAGE,
}

/**
 * 출근 리스트 데이터 호출
 * @param {number} [page=DEFAULT_PAGE] - 페이지 번호
 * @param {string} [searchTerm=''] - 검색어(선택사항)
 * @returns {object} page, size, totalCount, totalPage, data 반환
 */
export const fetchWorks = async (page = 1, searchTerm = '') => {
  const url = `/api/user/work?userSn=${encodeURIComponent(state.userSn)}&page=${page}&search=${encodeURIComponent(searchTerm)}`;

  try {
    return await apiRequest(url, {method: 'GET'});
  } catch (error) {
    console.error('Error fetching items:', error);
    return { data: [], page, size: PAGE_SIZE, totalCount: 0, totalPage: 1 };
  }
}

/**
 * 페이지네이션 버튼 생성
 * @param {number} currentPage - 현재 페이지
 * @param {number} totalPages - 전체 페이지 수
 */
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
 * @param {number} totalPage - 데이터의 총 페이지 수
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
    await updateWorkList(newPage);
  }
};

/**
 * 출근관리 리스트 업데이트 함수
 * @param {number} [page=DEFAULT_PAGE] 현재 페이지
 */
const updateWorkList = async (page = DEFAULT_PAGE) => {
  const { data, totalPage } = await fetchWorks(page, state.currentSearchTerm);

  // 출근관리 리스트 렌더링
  document.getElementById('workList').innerHTML = renderWorkList(data);

  // 페이지네이션 갱신
  setupPagination(totalPage, page);
};

/**
 * 검색 처리 함수
 */
const searchWorks = async () => {
  state.currentSearchTerm = searchInput.value.toLowerCase(); // 전역 변수에 검색어 저장

  // 검색어에 맞는 데이터를 받아와 렌더링
  await updateWorkList();
};

/**
 * 이벤트 초기화 함수
 */
const initEventListeners = (totalPage) => {
  // 페이지네이션 버튼 이벤트 리스너 추가
  document.getElementById('pagination').addEventListener('click', (event) =>
    handlePagination(event, totalPage)
  );

  // 검색 이벤트 리스너
  document.getElementById('searchBtn').addEventListener('click', searchWorks);

  document.getElementById('searchInput').addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      searchWorks();
    }
  });
}

const workFunc = async () => {
  const { totalPage } = await fetchWorks(); 
  setupPagination(totalPage);
  initEventListeners(totalPage);  
};

export default workFunc;

import { apiRequest } from '../../../../utils/apiUtils';
import { renderNotices } from './listRender';
import pagination from './pagination';

const DEFAULT_PAGE = 1; // 기본 노출 페이지
const PAGE_SIZE = 8; // 리스트의 기본 아이템 개수

// 상태 관리 객체
const state = {
  cache: {}, // 캐시 데이터
  currentSearchTerm: '', // 현재 검색어
  currentPage: DEFAULT_PAGE, // 현재 페이지
};

/**
 * 공지 리스트 데이터 API 호출 함수
 * @param {number} [page=DEFAULT_PAGE] - 요청할 페이지 번호
 * @param {string} [searchTerm=''] - 검색어 (선택사항)
 * @returns {Object} page, size, totalCount, totalPage, data 반환
 */
const fetchNotices = async (page = DEFAULT_PAGE, searchTerm = '') => {
  const url = `/api/common/notice?page=${page}&search=${encodeURIComponent(searchTerm)}`;
  try {
    return await apiRequest(url);
  } catch (error) {
    console.error('Error fetching items:', error);
    return { data: [], page, size: PAGE_SIZE, totalCount: 0, totalPage: 1 };
  }
};

/**
 * 캐시 확인 및 데이터 반환 함수
 * @param {number} page - 요청할 페이지 번호
 * @returns {Object} page, size, totalCount, totalPage, data 반환
 */
export const getNotices = async (page = DEFAULT_PAGE) => {
  // 검색어가 있을 때 캐시 사용하지 않음
  if (state.currentSearchTerm) {
    return await fetchNotices(page, state.currentSearchTerm);
  }

  // 캐시에 데이터가 없으면 API 호출 후 캐시에 저장
  if (!state.cache[page]) {
    state.cache[page] = await fetchNotices(page);
  }
  return state.cache[page];
};

/**
 * 페이지네이션 버튼 이벤트 핸들러
 * @param {Event} event - 이벤트 객체
 * @param {number} totalPage - 데이터의 총 페이지 수
 */
const handlePaginationClick = async (event, totalPage) => {
  const target = event.target;
  if (target.tagName !== 'BUTTON') return;

  const currentPage = state.currentPage;
  let newPage = currentPage;

  if (target.classList.contains('prev') && currentPage > 1) {
    newPage = currentPage - 1;
  } else if (target.classList.contains('first') && currentPage > 1) {
    newPage = 1;
  } else if (target.classList.contains('next') && currentPage < totalPage) {
    newPage = currentPage + 1;
  } else if (target.classList.contains('last') && currentPage < totalPage) {
    newPage = totalPage;
  } else {
    newPage = parseInt(target.innerText, 10);
  }

  if (newPage !== currentPage) {
    state.currentPage = newPage;
    await updateNoticeList(newPage);
  }
};

/**
 * 페이지네이션 UI 설정 함수
 * @param {number} totalPage - 데이터의 총 페이지 수
 */
const setupPagination = (totalPage) => {
  const paginationContainer = document.querySelector('#pagingContainer');
  paginationContainer.innerHTML = pagination(state.currentPage, totalPage);
};

/**
 * 공지 리스트 업데이트 함수
 * @param {number} [page=DEFAULT_PAGE] - 페이지 번호
 */
const updateNoticeList = async (page = DEFAULT_PAGE) => {
  const { data, totalCount, totalPage } = await getNotices(page);

  // 공지 리스트 렌더링
  document.querySelector('#noticeList').innerHTML = renderNotices(data);

  document.querySelector('#noticeCnt').textContent = totalCount;

  setupPagination(totalPage);
};

/**
 * 검색 처리 함수
 */
const searchNotices = async () => {
  state.currentSearchTerm = document
    .querySelector('#searchInput')
    .value.trim()
    .toLowerCase();
  state.currentPage = DEFAULT_PAGE;
  await updateNoticeList();
};

/**
 * 이벤트 초기화 함수
 */
const initEventListeners = (totalPage) => {
  document
    .querySelector('#pagingContainer')
    .addEventListener('click', (event) =>
      handlePaginationClick(event, totalPage)
    );

  document.querySelector('#noticeList').addEventListener('click', (event) => {
    const currentItem = event.target.closest('[data-item-id]');
    if (currentItem) {
      window.location.href = `${window.location.pathname}/view/${currentItem.dataset.itemId}`;
    }
  });

  const searchInput = document.querySelector('#searchInput');
  document.querySelector('#searchBtn').addEventListener('click', searchNotices);
  searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') searchNotices();
  });
};

/**
 * 초기화 함수
 */
const init = async () => {
  const { totalPage } = await getNotices();
  setupPagination(totalPage);
  initEventListeners(totalPage);
};

// 초기화 함수 호출
export default init;

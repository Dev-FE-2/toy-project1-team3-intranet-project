import { renderNotices } from './listRender';
import pagination from './pagination';

// 전역변수로 처리하면 메모리 누수 위험있어 추후 방식 변경 필요
let noticeCache = []; // 캐시를 위한 전역 변수 설정
let currentSearchTerm = ''; // 현재 검색어 전역 변수

/**
 * 공지 리스트 데이터 API 호출 함수
 * @param {number} [page] - 요청할 페이지 번호
 * @param {string} [searchTerm] - 검색어 (선택사항)
 * @returns {Object} page, size, totalCount, totalPage, data 반환
 */
const fetchNotices = async (page = 1, searchTerm = '') => {
  const url = `/api/common/notice?page=${page}&search=${encodeURIComponent(searchTerm)}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch items');
    return await response.json();
  } catch (error) {
    console.error('Error fetching items:', error);
    return { data: [], page, size: 8, totalCount: 0, totalPage: 1 };
  }
};

/**
 * 캐시에 저장된 공지 리스트 데이터 반환 함수
 * @param {number} page - 요청할 페이지 번호
 * @returns {Object} page, size, totalCount, totalPage, data 반환
 */
export const getNotices = async (page = 1) => {
  // 검색어가 있을 때 캐시를 사용하지 않고 매번 API 호출
  if (currentSearchTerm) {
    return await fetchNotices(page, currentSearchTerm);
  }

  // 검색어가 없고 캐시가 존재할 때 캐시 사용
  if (!noticeCache[page]) {
    noticeCache[page] = await fetchNotices(page);
  }
  return noticeCache[page];
};

/**
 * 페이지네이션 버튼 이벤트 핸들러
 * @param {number} totalPage 데이터의 총 페이지 수
 */
const handlePagination = async (event, totalPage) => {
  const target = event.target;
  if (target.tagName !== 'BUTTON') return;

  let currentPage = parseInt(document.querySelector('.current-page').innerText);

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
    await updateNoticeList(newPage);
  }
};

/**
 * 페이징 처리를 위한 함수
 * @param {number} totalPage 데이터의 총 페이지 수
 * @param {number} currentPage 현재 페이지
 */
const setupPagination = (totalPage, currentPage = 1) => {
  const paginationContainer = document.getElementById('pagingContainer');
  paginationContainer.innerHTML = pagination(currentPage, totalPage);
};

/**
 * 공지 리스트 업데이트 함수
 * @param {number} page 현재 페이지
 */
const updateNoticeList = async (page = 1) => {
  const { data, totalCount, totalPage } = await getNotices(page);

  // 공지 리스트 렌더링
  document.getElementById('noticeList').innerHTML = renderNotices(data);

  document.getElementById('noticeCnt').textContent = totalCount;

  // 페이지네이션 갱신
  setupPagination(totalPage, page);
};

const listFunc = async () => {
  const { totalPage } = await getNotices(); // 총 페이지 수를 불러오기
  const currentPath = window.location.pathname;
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const noticeList = document.getElementById('noticeList');
  const paginationContainer = document.getElementById('pagingContainer');

  const searchNotices = async () => {
    currentSearchTerm = searchInput.value.toLowerCase(); // 전역 변수에 검색어 저장

    // 검색어에 맞는 공지 데이터를 받아와 렌더링
    await updateNoticeList();
  };

  // 첫 번째 페이지로 초기화
  setupPagination(totalPage, 1);

  // 페이지네이션 버튼 이벤트 리스너 추가
  paginationContainer.addEventListener('click', (event) =>
    handlePagination(event, totalPage)
  );

  // 리스트 클릭 시 각 상세페이지로 이동
  noticeList.addEventListener('click', (e) => {
    const currentItem = e.target.closest('[data-item-id]');
    if (currentItem) {
      window.location.href = `${currentPath}/view/${currentItem.dataset.itemId}`;
    }
  });

  // 검색 이벤트 리스너
  searchBtn.addEventListener('click', searchNotices);

  searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      searchNotices();
    }
  });
};

export default listFunc;

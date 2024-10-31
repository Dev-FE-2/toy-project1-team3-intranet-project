import styles from './work.module.css';

import { renderWorkList } from "./workRender";
// const userSn = localStorage.getItem('userSn');
const userSn = 'USER_00000001'; // 테스트용

export const fetchWorks = async (page = 1, userInfo = userSn, searchTerm = '') => {
  const url = `/api/user/work?userSn=${encodeURIComponent(userInfo)}&page=${page}&search=${encodeURIComponent(searchTerm)}`;

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
    await updateWorkList(newPage);
  }
};

/**
 * 부재 리스트 업데이트 함수
 * @param {number} page 현재 페이지
 */
const updateWorkList = async (page = 1) => {
  const { data, totalPage } = await fetchWorks(page);

  // 부재 리스트 렌더링
  document.getElementById('workList').innerHTML = renderWorkList(data);

  // 페이지네이션 갱신
  setupPagination(totalPage, page);
};

const workFunc = async () => {
  const { totalPage } = await fetchWorks(); // 총 페이지 수를 불러오기
  const currentPath = window.location.pathname;
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const paginationContainer = document.getElementById('pagination');

  const searchWorks = async () => {
    currentSearchTerm = searchInput.value.toLowerCase(); // 전역 변수에 검색어 저장

    // 검색어에 맞는 데이터를 받아와 렌더링
    await updateWorkList();
  };

  // 첫 번째 페이지로 초기화
  setupPagination(totalPage, 1);

  // 페이지네이션 버튼 이벤트 리스너 추가
  paginationContainer.addEventListener('click', (event) =>
    handlePagination(event, totalPage)
  );

  // 검색 이벤트 리스너
  searchBtn.addEventListener('click', searchWorks);

  // searchInput.addEventListener('keyup', (e) => {
  //   if (e.key === 'Enter') {
  //     searchWorks();
  //   }
  // });
};

export default workFunc;

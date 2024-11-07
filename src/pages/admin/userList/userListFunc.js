import { pagination } from './userListRender';
import { renderTableRows } from './userListRender';

const DEFAULT_PAGE = 1; //기본 페이지
const PAGE_SIZE = 5; //출력 데이터 수

const state = {
  currentSearchTerm: '', //검색어
  currentPage: DEFAULT_PAGE //현재 페이지
};

// 임직원 리스트 API 호출 함수
export const fetchUsers = async (page = 1, searchTerm = '') => {
  const url = `/api/admin/userList?page=${page}&search=${encodeURIComponent(searchTerm)}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch items');
    return await response.json();
  } catch (error) {
    console.error('Error fetching items:', error);
  }
};

//검색어 포함 api 호출 함수
export const getUsers = async (page = DEFAULT_PAGE) => {
  if (state.currentSearchTerm) {
    return await fetchUsers(page, state.currentSearchTerm);
  } else if(!state.currentSearchTerm){
    return await fetchUsers(page)
  }
}

// 페이지네이션 버튼 핸들러
const handlePagination = async (event, totalPage) => {
  const target = event.target;
  if(target.tagName !== 'BUTTON') return;

  const currentPage = state.currentPage;
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
    await updateUserList(newPage);
  }
};

//페이지네이션
const setupPagination = (totalPage) => {
  if(totalPage > 0){
    const paginationButtons = document.getElementById('paginationButtons');
    paginationButtons.innerHTML = pagination(state.currentPage, totalPage);
  }
};

// 임직원 리스트 업데이트 함수
const updateUserList = async (page = DEFAULT_PAGE) => {
  const { data, totalCount, totalPage } = await getUsers(page);
  document.getElementById('userTableBody').innerHTML = renderTableRows(data);

  document.getElementById('userCount').textContent =
    `총 ${totalCount}명의 임직원`;

  setupPagination(totalPage);
};

//검색어 처리 함수
const searchUsers = async () =>{
  state.currentSearchTerm = document.getElementById('searchInput').value.toLowerCase(); // 전역 변수에 검색어 저장
  state.currentPage = DEFAULT_PAGE
  await updateUserList();
}

//이벤트 초기화 함수
const initEventLister = (totalPage) => {
  //페이지네이션 이벤트리스너 추가
  document.getElementById('paginationButtons').addEventListener('click', (event) =>{
    handlePagination(event, totalPage)
  })

  //검색 이벤트 리스너 추가
  document.getElementById('searchInput').addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
      searchUsers()
    }
  })
  document.getElementById('searchBtn').addEventListener('click',searchUsers)
}

//최초 초기화 함수
const userListFunc = async () => {
  const { totalPage } = await fetchUsers();  
  setupPagination(totalPage);
  initEventLister(totalPage);
};

export default userListFunc;

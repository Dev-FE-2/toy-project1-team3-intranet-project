import {pagination} from './userListRender';
import {renderTableRows} from './userListRender';

// 임직원 리스트 API 호출 함수
export const fetchUsers = async (page = 1) => {
  const url = `/api/admin/userList?page=${page}`
  try{
    const response = await fetch(url);
    if(!response.ok) throw new Error('Failed to fetch items');
    return await response.json();
  }catch(error){
    console.error('Error fetching items:', error);
  }
}



// 페이지네이션 버튼 핸들러
const handlePagination = async (event, totalPage) => {
  const target = event.target;
  let currentPage = parseInt(document.querySelector(".pageBtn").innerText);
  let newPage= currentPage;
  if(target.classList.contains('prev') && currentPage > 1){
    newPage = currentPage - 1;
  }else if(target.classList.contains('next') && currentPage < totalPage){
    newPage = currentPage + 1;
  } else {
    newPage = parseInt(target.innerText, 10);
  }
  if (newPage !== currentPage){
    currentPage = newPage;
    await updateUserList(newPage);
  }
};

//페이지네이션
const setupPagination = (totalPage, currentPage = 1) => {
  const paginationButtons = document.getElementById('paginationButtons');
  paginationButtons.innerHTML = pagination(currentPage, totalPage);
};
// 임직원 리스트 업데이트 함수
const updateUserList = async (page = 1) =>{
  const {data, totalCount, totalPage} = await fetchUsers(page);
  
  document.getElementById('userTableBody').innerHTML = renderTableRows(data)
  
  document.getElementById('userCount').textContent = `총 ${totalCount}명의 임직원`

  setupPagination(totalPage, page);
};


const userListFunc = async () => {
  
  const { totalPage } = await fetchUsers();
  const paginationButtons = document.getElementById('paginationButtons');
  //첫 번째 페이지로 초기화
  setupPagination(totalPage, 1);

  // 페이지네이션 버튼 이벤트 리스너 추가
  paginationButtons.addEventListener('click', (event) => {
   handlePagination(event, totalPage) 
  });


};

export default userListFunc;

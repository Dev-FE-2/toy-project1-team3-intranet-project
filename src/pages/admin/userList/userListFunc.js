import {pagination} from './userListRender';
import {renderTableRows} from './userListRender';
import style from './userList.module.css'

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
//검색
// const search = async (searchTerm) => {
//   const data = await fetchUsers()
//   const userData = data.data
//   // searchTerm을 포함하는 항목만 필터링
//   const filteredUsers = userData.filter(user =>
//     user.name.includes(searchTerm) || user.email.includes(searchTerm)
//   );
//   console.log(filteredUsers)
//   return filteredUsers
// }
//검색 결과 렌더링
const filterTableRows= (data) =>{
  const curPath = window.location.pathname;
  return `
    <tr onclick="location.href='${curPath}/profile:${data.id}'">
      <td class="${style.td} checkbox"><input type="checkbox" onclick="event.stopPropagation()"></td>
      <td class="${style.td} ${style.profileImg}"><img src="${data.image}" alt="${data.name} 프로필사진" class="${style.image}"></td>
      <td class="${style.td} ${style.name}">${data.name}</td>
      <td class="${style.td} ${style.email}">${data.email}</td>
      <td class="${style.td} ${style.phoneNumber}">${data.phoneNumber}</td>
      <td class="${style.td} ${style.division}">${data.grade ? "관리자": "임직원"}</td>
   </tr>
    `
}
const filterRender = async(searchTerm) => {
  const data = await fetchUsers()
  const userData = data.data
  const filteredUsers = userData.filter(user =>
    user.name.includes(searchTerm) || user.email.includes(searchTerm)
  );
  const tableRowsHTML = filteredUsers.map(filterTableRows).join('');
  document.getElementById('userTableBody').innerHTML = tableRowsHTML

  document.getElementById('userCount').textContent = `총 ${filteredUsers.length}명의 임직원`

  setupPagination(1, filteredUsers.length);


}

let currentSearchTerm = '';
const userListFunc = async () => {
  
  const { totalPage } = await fetchUsers();
  const paginationButtons = document.getElementById('paginationButtons');
  const searchInput = document.getElementById('searchInput');
  //첫 번째 페이지로 초기화
  setupPagination(totalPage, 1);
  const searchUsers = async () => {
    currentSearchTerm = searchInput.value.toLowerCase(); // 전역 변수에 검색어 저장

    filterRender(currentSearchTerm)
  };
  // 페이지네이션 버튼 이벤트 리스너 추가
  paginationButtons.addEventListener('click', (event) => {
   handlePagination(event, totalPage) 
  });
  // 검색 이벤트 리스너
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      searchUsers();
    }
  });
  
};

export default userListFunc;

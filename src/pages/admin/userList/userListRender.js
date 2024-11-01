import style from './userList.module.css';
import {fetchUsers} from './userListFunc';

  // 테이블의 행을 렌더링하는 함수
  export const renderTableRows = (data) => {
    const curPath = window.location.pathname;
    return data.map((item) => `
      <tr onclick="location.href='${curPath}/profile:${item.id}'">
        <td class="${style.td} checkbox"><input type="checkbox" onclick="event.stopPropagation()"></td>
        <td class="${style.td} ${style.name}">${item.name}</td>
        <td class="${style.td} ${style.email}">${item.email}</td>
        <td class="${style.td} ${style.phoneNumber}">${item.phoneNumber}</td>
        <td class="${style.td} ${style.division}">${item.grade ? "관리자": "임직원"}</td>
      </tr>
    `).join('');
  };


// 페이지네이션 버튼을 렌더링하는 함수
export const pagination = (currentPage, totalPage) => {
    const pageButton = [];
    const startPage = Math.max(currentPage - 5, 1);

    const endPage = Math.min(startPage + 9, totalPage);
    
    for(let i = startPage; i <= endPage; i++) {
      pageButton.push(
      `<button class="${i === currentPage ? `${style.selectBtn} pageBtn` : `${style.unSelectBtn}`}">
      ${i}
      </button>
    `)};
    
    return ` 
    <ul>
      <button class="${style.unSelectBtn} prev"
      ${currentPage === 1 ? 'disabled' : ''}>
        <
      </button>
      ${pageButton.join('')}
      <button class="${style.unSelectBtn} next"
      ${currentPage === totalPage ? 'disabled' : ''}>
        >
      </button>
    </ul>`
  };



const userListRender = async () => {
  const  userData  = await fetchUsers(); // 패치함수 실행
  const totalCount = userData.totalCount // 총 임직원
  const data = userData.data // 임직원 데이터
  console.log(userData)



  return `
    <div class="${style.userListWrapper}">
      <div class="${style.userListheader}">
        <div class="${style.headerLeft}">
          <div class="${style.title}">임직원 관리</div>
          <div id="userCount" class="${style.subTitle}">총 ${totalCount}명의 임직원</div>
        </div>
        <div class="${style.headerRight}">
          
            <input type="text" id="searchInput"class="${style.input}" placeholder="이름 또는 이메일로 검색하기">
          
        </div>
      </div>

      <section class="${style.tableSection}">
        <table class="${style.table}">
          <thead>
            <tr>
              <th class="${style.th} checkbox"></th>
              <th class="${style.th} name">이름</th>
              <th class="${style.th} ${style.email}">이메일</th>
              <th class="${style.th} ${style.phoneNumber}">휴대폰번호</th>
              <th class="${style.th} ${style.division}">구분</th>
            </tr>
          </thead>
          <tbody id="userTableBody">
            ${renderTableRows(data)}
          </tbody>
        </table>
        <div class="${style.pagination}">
          <div id="paginationButtons" class="${style.paginationBtn}">           

          </div>
        </div>
        </section>
        </div>
        `;
}




export default userListRender;
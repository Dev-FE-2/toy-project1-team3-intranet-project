import '../../../assets/css/buttons.css'
import style from './userList.module.css';
import { fetchUsers } from './userListFunc';

// 테이블의 행을 렌더링하는 함수
export const renderTableRows = (data) => {
  return data
    .map(
      (item) => `
      <tr onclick="location.href='/admin/user/${item.userSn}'">
        <td class="${style.td} ${style.name}">${item.name}</td>
        <td class="${style.td} ${style.email}">${item.email}</td>
        <td class="${style.td} ${style.phoneNumber}">${item.phoneNumber}</td>
        <td class="${style.td} ${style.division}">${item.grade ? '임직원' : '관리자'}</td>
      </tr>
    `
    )
    .join('');
};

// 페이지네이션 버튼을 렌더링하는 함수
export const pagination = (currentPage, totalPage) => {
  const pageButton = [];

  const startPage = Math.max(currentPage - 5, 1);
  const endPage = Math.min(startPage + 9, totalPage);

  for (let i = startPage; i <= endPage; i++) {
    pageButton.push(`
      <li>
        <button class="${i === currentPage ? `${style.selectBtn} pageBtn` : `unSelectBtn`}">
        ${i}
        </button>
      </li>
    `);
  }

  return ` 
    <ul class="${style.paginationBtn}">
      <li>
        <button class="${style.unSelectBtn} prev"
        ${currentPage === 1 ? 'disabled' : ''}>
          <
        </button>
      </li>
        ${pageButton.join('')}
      <li>
        <button class="${style.unSelectBtn} next"
        ${currentPage === totalPage ? 'disabled' : ''}>
          >
        </button>
      </li>
    </ul>`;
};

const userListRender = async () => {
  const userData = await fetchUsers(); // 패치함수 실행
  const totalCount = userData.totalCount; // 총 임직원
  const data = userData.data; // 임직원 데이터

  return `
      <div class="${style.userListheader}">
        <div class="${style.headerLeft}">
          <div class="${style.title}">임직원 관리</div>
          <div id="userCount" class="${style.subTitle}">총 ${totalCount}명의 임직원</div>
        </div>
        <div class="${style.headerRight}">
          <input type="text" id="searchInput"class="${style.input}" placeholder="이름 또는 이메일로 검색하기" />
        </div>
      </div>

      <article class="${style.tableSection}">
        <table class="${style.table}">
          <thead>
            <tr>
              <th scope="col" class="${style.th} name">이름</th>
              <th scope="col" class="${style.th} ${style.email}">이메일</th>
              <th scope="col" class="${style.th} ${style.phoneNumber}">휴대폰번호</th>
              <th scope="col" class="${style.th} ${style.division}">구분</th>
            </tr>
          </thead>
          <tbody id="userTableBody">
            ${renderTableRows(data)}
          </tbody>
        </table>
        <nav class="${style.pagination}">
          <div id="paginationButtons">
          </div>
        </nav>
      </article>
  `;
};

export default userListRender;

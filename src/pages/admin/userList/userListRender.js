import style from './userList.module.css';

// 페이지 렌더링
const userListRender = () => {
  const curPath = window.location.pathname;
  const itemsPerPage = 5; // 페이지당 항목 수
  let currentPage = 1; // 초기 페이지

  // 페이지에 해당하는 항목들을 가져오는 함수
  const getPaginatedItems = (page, items) => {
    const startIndex = (page - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  // 페이지네이션 버튼을 렌더링하는 함수
  const renderPaginationButtons = (totalItems) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
      let buttonsHtml = `
      <button class="${style.unSelectBtn}" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
        <
      </button>
    `;

    for (let i = 1; i <= totalPages; i++) {
      buttonsHtml += `
        <button class="${i === currentPage ? style.selectBtn : style.unSelectBtn}" onclick="changePage(${i})">
          ${i}
        </button>
      `;
    }

    buttonsHtml += `
      <button class="${style.unSelectBtn}" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
        >
      </button>
    `;
    
    return buttonsHtml;
  };

  // 페이지 변경 함수
  window.changePage = (page) => {
    currentPage = page;
    document.getElementById("userTableBody").innerHTML = renderTableRows(getPaginatedItems(currentPage, items));
    document.getElementById("paginationButtons").innerHTML = renderPaginationButtons(items.length);
  };

  // 테이블의 행을 렌더링하는 함수
  const renderTableRows = (paginatedItems) => {
    return paginatedItems.map((item) => `
      <tr onclick="location.href='${curPath}/profile/${item.id}'">
        <td class="${style.td} checkbox"><input type="checkbox" onclick="event.stopPropagation()"></td>
        <td class="${style.td} ${style.profileImg}"><img src="${item.image}" alt="${item.name} 프로필사진" class="${style.image}"></td>
        <td class="${style.td} ${style.name}">${item.name}</td>
        <td class="${style.td} ${style.email}">${item.email}</td>
        <td class="${style.td} ${style.phoneNumber}">${item.phoneNumber}</td>
        <td class="${style.td} ${style.division}">${item.division}</td>
      </tr>
    `).join('');
  };
    //삭제 버튼
    const deleteProfile = () => {
      // 모든 체크박스를 선택
      let checks = document.querySelectorAll(".checkbox input[type='checkbox']");
      
      // 선택된 항목의 ID를 저장할 배열
      const selectedIds = [];
      checks.forEach((check, index) => {
        if (check.checked) {
          selectedIds.push(items[index].id);
        }
      });
    
      // 체크된 항목이 없으면 경고 메시지 출력 후 함수 종료
      if (selectedIds.length === 0) {
        alert("삭제할 항목을 선택해주세요.");
        return;
      }
    
      // 삭제 확인 메시지
      const confirmDelete = confirm("선택된 항목을 삭제하시겠습니까?");
      if (!confirmDelete) {
        return; // 취소를 선택하면 함수 종료
      }
    
      // 선택된 ID에 해당하는 항목을 삭제
      items = items.filter(item => !selectedIds.includes(item.id));
    
      // 테이블과 페이지네이션을 다시 렌더링
      document.getElementById("userTableBody").innerHTML = renderTableRows(getPaginatedItems(currentPage, items));
      document.getElementById("paginationButtons").innerHTML = renderPaginationButtons(items.length);
    };
    document.addEventListener("DOMContentLoaded", () => {
      const deleteButton = document.getElementById("deleteBtn");
      if (deleteButton) {
        deleteButton.addEventListener("click", deleteProfile);
      }
    });
  // 초기 렌더링
  const totalEmployees = items.length;
  return `
    <div class="${style.userListWrapper}">
      <div class="${style.userListheader}">
        <div class="${style.headerLeft}">
          <div class="${style.title}">임직원 관리</div>
          <div class="${style.subTitle}">총 ${totalEmployees}명의 임직원</div>
        </div>
        <div class="${style.headerRight}">
          <div class="${style.rightBtn}">
            <a href="/admin/profileForm" class="${style.btn} ${style.btnBlack}">임직원 등록</a>
            <button id="deleteBtn" class="${style.btn} ${style.btnRed}">임직원 삭제</button>
          </div>
          <form role="search">
            <input type="search" class="${style.input}" placeholder="이름 또는 이메일로 검색하기">
          </form>
        </div>
      </div>

      <section class="${style.tableSection}">
        <table class="${style.table}">
          <thead>
            <tr>
              <th class="${style.th} checkbox"></th>
              <th class="${style.th} ${style.profileImg}">프로필 사진</th>
              <th class="${style.th} name">이름</th>
              <th class="${style.th} ${style.email}">이메일</th>
              <th class="${style.th} ${style.phoneNumber}">휴대폰번호</th>
              <th class="${style.th} ${style.division}">구분</th>
            </tr>
          </thead>
          <tbody id="userTableBody">
            ${renderTableRows(getPaginatedItems(currentPage, items))}
          </tbody>
        </table>

        <div class="${style.pagination}">
          <div id="paginationButtons" class="${style.paginationBtn}">
            ${renderPaginationButtons(items.length)}
          </div>
        </div>
      </section>
    </div>
  `;
}

export default userListRender;
import style from './userList.module.css';

// 페이지 렌더링
const userListRender = () => //btn = button
  `
  <div class="${style.userListWrapper}">
      <header class="${style.header}>
        <div class="${style.headerLeft}">
          <div class="${style.title}">임직원 관리</div>
          <div class="${style.subTitle}">총 n명의 임직원</div>  
        </div>
        <div class="${style.headerRight}">
          <div class="${style.rightBtn}">
            <button class = "${style.btn} ${style.btnBlack}" id="create">임직원 등록</button> 
            <button class = "${style.btn} ${style.btnRed}">임직원 삭제</button>
          </div>
          <input 
          type ="text" 
          class="${style.input} "
          placeholder ="이름 또는 이메일로 검색하기">
        </div>
      </header>
      

      <section class="${style.tableSection}">
        <table class="${style.table}">
          <tr>
            <th class="${style.th} checkbox"></th>
            <th class="${style.th} ${style.profileImg}">프로필 사진</th>
            <th class="${style.th} name">이름</th>
            <th class="${style.th} ${style.email}">이메일</th>
            <th class="${style.th} ${style.phoneNumber}">휴대폰번호</th>
            <th class="${style.th} ${style.division}">구분</th>
          </tr>
          <tr>
            <td class="${style.td} checkbox"><input type="checkbox"></td>
            <td id="profile1" class="${style.td} ${style.profileImg}"><img src="/public/vite.svg" alt="홍길동 프로필사진" class=${style.image}></td>
            <td id="name1" class="${style.td} ${style.name}">홍길동</td>
            <td class="${style.td} ${style.email}">test@naver.com</td>
            <td class="${style.td} ${style.phoneNumber}">010-1234-5678</td>
            <td class="${style.td} ${style.division}">임직원</td>
          </tr>
          <tr>
            <td class="${style.td} checkbox"><input type="checkbox"></td>
            <td id="profile2" class="${style.td} ${style.profileImg}"><img src="/public/vite.svg" alt="박과장 프로필사진" class=${style.image}></td>
            <td id="name2" class="${style.td} ${style.name}">박과장</td>
            <td class="${style.td} ${style.email}">test2@naver.com</td>
            <td class="${style.td} ${style.phoneNumber}">010-7788-1234</td>
            <td class="${style.td} ${style.division}">임직원</td>
          </tr>
          <tr>
            <td class="${style.td} checkbox"><input type="checkbox"></td>
            <td id="profile3" class="${style.td} ${style.profileImg}"><img src="/public/vite.svg" alt="김철수 프로필사진" class=${style.image}></td>
            <td id="name3" class="${style.td} ${style.name}">김철수</td>
            <td class="${style.td} ${style.email}">test3@naver.com</td>
            <td class="${style.td} ${style.phoneNumber}">010-5566-5678</td>
            <td class="${style.td} ${style.division}">관리자</td>
          </tr>
          </table>
          <div class="${style.pagination}">
            <div class="${style.paginationBtn}">
              <button class="${style.unSelectBtn}"><</button>
              <button class="${style.selectBtn}">1</button>
              <button class="${style.unSelectBtn}">2</button>
              <button class="${style.unSelectBtn}">></button>
            </div>
          </div>
      </section>
    </div>
  `;

export default userListRender;

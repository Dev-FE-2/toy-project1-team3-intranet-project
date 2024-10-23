import style from './userList.module.css';

// 페이지 렌더링
const userListRender = () => //btn = button
  `
  <div class=${style.body}>
      <header class=${style.header}>
        <div class=${style.headerLeft}>
          <h3 class=${style.title}>임직원 관리</h3>
          <div class="subTitle">총 n명의 임직원</div>  
        </div>
        <div class=${style.headerRight}>
          <button class =${style.btn, style.btnBlack}>임직원 등록</button> 
          <button class =${style.btn, style.btnRed}>임직원 삭제</button>
          <input 
          type ="text" 
          class=${style.input} 
          placeholder ="이름으로 검색하기">
        </div>
      </header>
      
      <div class=${style.navigation}>
      </div>
      
      <section class=${style.table}>
        <table>
          <tr>
            <th>checkbox</th>
            <th>프로필 사진</th>
            <th>이름</th>
            <th>이메일</th>
            <th>휴대폰번호</th>
            <th>구분</th>
          </tr>
          <tr>
            <th><input type="checkbox"></th>
            <th><img src="" alt="홍길동 프로필사진"></th>
            <th>홍길동</th>
            <th>test@naver.com</th>
            <th>010-1234-5678</th>
            <th>임직원</th>
          </tr>
          <tr>
            <th><input type="checkbox"></th>
            <th><img src="" alt="박과장 프로필사진"></th>
            <th>박과장</th>
            <th>test2@naver.com</th>
            <th>010-7788-1234</th>
            <th>임직원</th>
          </tr>
          <tr>
            <th><input type="checkbox"></th>
            <th><img src="" alt="김철수 프로필사진"></th>
            <th>김철수</th>
            <th>test3@naver.com</th>
            <th>010-5566-5678</th>
            <th>관리자</th>
          </tr>
          </table>
      </section>
      <div class=${style.pagination}>
        <button class=${style.paginationBtn, style.unSelectBtn}><</button>
        <button class=${style.paginationBtn, style.btnBlack}>1</button>
        <button class=${style.paginationBtn, style.unSelectBtn}>2</button>
        <button class=${style.paginationBtn, style.unSelectBtn}>></button>
      </div>
    </div>
  `;

export default userListRender;

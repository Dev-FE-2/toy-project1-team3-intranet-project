// 페이지 렌더링
const userListRender = () => `
  <div>
      <header>
        <h3>임직원 관리</h3>
        <button class ="button">임직원 등록</button>
        <button class ="button">임직원 삭제</button>
        <p>총 n명의 임직원</p>
        <input type ="text" placeholder ="이름으로 검색하기">
      </header>
      <section id="title">
        <ul></ul>
      </section>
    </div>
  `;

export default userListRender;

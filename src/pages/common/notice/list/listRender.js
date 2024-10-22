// 페이지 렌더링
const listRender = () => `
    <div class="container">
      <div class="inner">
        <h1>기업공지 관리</h1>
        <a href="#" class="btn plus">
          <span>공지 등록</span>
        </a>
        <div class="list-wrap__top">
          <span class="count-desc">총 10개의 공지</span>
          <input type="text" placeholder="검색" />
        </div>
      </div>
    </div>
  `;

export default listRender;

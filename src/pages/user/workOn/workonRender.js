import style from './workon.module.css';
// 페이지 렌더링
const profileRender = () => `
  <div class="${style.container}">
    <div class="${style.profileBox}">
      <div class="${style.contentsBox}">
        <h1 class="${style.title}">출결신청</h1>
        <botton class="${style.btn}">프로필 수정</botton>
        <div class="${style.profileItem}">
          <div class="${style.division}">임직원</div>
          <div class="${style.profileImg}">
          <image src="/public/vite.svg" alt="프로필 사진"></image>
          </div>
          <div class="${style.name}">홍길동</div>
          <div class="${style.grade}">대리</div>
          </div>
          <div class="${style.footer}">
            <span>test@naver.com</span>
            <span>010-1234-5678</span>
        </div>
        </div>
  </div>
  `;

export default profileRender;

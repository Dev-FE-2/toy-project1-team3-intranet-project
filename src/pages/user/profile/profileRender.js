import style from './profile.module.css';
// 페이지 렌더링
const profileRender = () => `
  <div class="${style.container}">
    <div class="${style.profileBox}">
      <div class="${style.contentsBox}">
        <div class="${style.title}">마이 프로필</div>
        <button id="updateUser" class="${style.btn}">프로필 수정</button>
        <div class="${style.profileItem}">
          <div class="${style.division}">임직원</div>
          <div class="${style.profileImg}">
            <img id="profileImg" src='/src/img/default_user.svg' alt="프로필 사진" />
          </div>
          <div id="name" class="${style.name}">홍길동</div>
          <div id="grade" class="${style.grade}">대리</div>
        </div>
        <div class="${style.footer}">
          <span id="email">test@naver.com</span>
          <span id="phone">010-1234-5678</span>
        </div>
      </div>
    </div>
  </div>
`;

export default profileRender;

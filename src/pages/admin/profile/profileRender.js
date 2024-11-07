import '../../../assets/css/buttons.css';
import style from './profile.module.css';
// 페이지 렌더링
const profileRender = () => `
    <div class="${style.container}">
      <div class="${style.profileBox}">
        <article class="${style.contentsBox}">
          <button id="updateUser" class="${style.btn}">프로필 수정</button>
          <section class="${style.profileItem}">
            <div class="${style.division}">임직원</div>
            <div class="${style.profileImg}">
              <img id="profileImg" src='/src/assets/img/default_user.svg' alt="프로필 사진" />
            </div>
            <div id="name" class="${style.name}"></div>
            <div id="grade" class="${style.grade}"></div>
          </section>
          <section class="${style.footer}">
            <span id="email"></span>
            <span id="phone"></span>
          </section>
        </article>
      </div>
    </div>
`;

export default profileRender;

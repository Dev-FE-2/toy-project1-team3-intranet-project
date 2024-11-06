import style from './profileForm.module.css';
// 페이지 렌더링
const profileFormRender = () => `
    <div class="${style.profileBox}">
      <article class="${style.contentsBox}">
        <section class="${style.profileItem}">
          <div class="${style.imgForm}">
            <div>
              <button id="closeButton" class="${style.closeButton} hidden"></button>
            </div>
            <label for="file" class="${style.profileImg}">
              <img id="profileImg" src="/src/assets/img/default_user.svg" alt="" />
              <div class="${style.changeImg}">
                <img  class="${style.rotateIcon}" src="/src/assets/img/rotate_icon.svg" alt="아이콘" />
                <input id="file" type="file" class="${style.file}"/>
              </div>
            </label>
          </div>
          <input id="name" type="text" class="${style.input} ${style.name}" />
          <input id="rank" type="text" class="${style.input} ${style.grade}" />
        </section>
        <section class="${style.footer}">
          <input id="email" type="text" class="${style.input} ${style.form}" />
          <input id="phone" type="text" class="${style.input} ${style.form}" />
        </section>
      </article>
      <footer class="${style.btnWrap}">
        <button id="updateUser" class="${style.btn}">수정하기</button>
        <button id="cancel" class="${style.btn} ${style.btnGray}">취소</button>
      </footer>
    </div>
`;

export default profileFormRender;

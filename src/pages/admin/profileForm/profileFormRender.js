import style from './profileForm.module.css';
// 페이지 렌더링
const profileFormRender = () => `
  <div class="${style.container}">
    <div class="${style.profileBox}">
      <div class="${style.contentsBox}">
        <div class="${style.profileItem}">
          <input type="text" class="${style.input} ${style.division}">
          <label for="file" class="${style.imgForm}">
            <div class="${style.profileImg}">
              <img id="profileImg" src="/src/img/default_user.svg" alt="">
            </div>
            <div class="${style.changeImg}">
              <img  class="${style.rotateIcon}" src="/src/img/rotate_icon.svg" alt="아이콘">
              <input id="file" type="file" class="${style.file}" />
            </div>
          </label>
          <input id="name" type="text" class="${style.input} ${style.name}">
          <input id="grade" type="text" class="${style.input} ${style.grade}">
        </div>
        <div class="${style.footer}">
          <input id="email" type="text" class="${style.input} ${style.form}">
          <input id="phone" type="text" class="${style.input} ${style.form}">
        </div>
      </div>
      <div class="${style.btnWrap}">
        <button id="updateUser" class="${style.btn}">수정하기</button>
        <botton class="${style.btn} ${style.btnRed}">삭제하기</botton>
        <button id="cancel" class="${style.btn} ${style.btnGray}">취소</button>
      </div>
    </div>
  </div>
`;

export default profileFormRender;

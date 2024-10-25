import style from './profileForm.module.css';
// 페이지 렌더링
const profileFormRender = () => `
  <div class="${style.container}">
    <div class="${style.profileBox}">
      <div class="${style.contentsBox}">
        <div class="${style.profileItem}">
          <input type="form" class="${style.division}"></input>
          <div class="${style.imgForm}">
            <div class="${style.profileImg}">
              <image src="" alt=""></image>
            </div>
            <div class="${style.changeImg}">
              <image class="${style.rotateIcon}" src="/src/img/rotate_icon.svg" alt="아이콘"></image>
            </div>
          </div>
          <input type="form" class="${style.name}"></input>
          <input type="form" class="${style.grade}"></input>
        </div>
          <div class="${style.footer}">
            <input type="form" class="${style.form}"></input>
            <input type="form" class="${style.form}"></input>
          </div>
      </div>
      <div class="${style.btnWrap}">
        <botton class="${style.btn}">등록/수정하기</botton>
        <botton class="${style.btn} ${style.btnRed}">삭제하기</botton>
        <botton class="${style.btn} ${style.btnGray}">취소</botton>
      </div>
    </div>
  </div>
  `;

export default profileFormRender;
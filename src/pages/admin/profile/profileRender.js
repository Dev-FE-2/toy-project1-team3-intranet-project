import style from './profile.module.css';
// 페이지 렌더링
const profileRender = () => `
  <div class="${style.body}">
    <div class="${style.profileWrapper}">
      <botton class="${style.btn}">프로필 수정</botton>
    </div>
  </div>
  `;

export default profileRender;

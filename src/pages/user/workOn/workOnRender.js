import style from './workOn.module.css';
// 페이지 렌더링
const workOnRender = () => `
    <div id="container" class="${style.container}">
      <div id="modal"></div>
      <div class="${style.workOnBox}">
        <div class="${style.contentsBox}">
          <div class="${style.boxHeader}">
            <h1 class="${style.title}">마이 프로필</h1>
            <span id="isWork">출근전</span>
          </div>
          <div class="${style.workOnItem}">
            <div class="${style.division}">임직원</div>
            <div class="${style.workOnImg}">
              <image id="profileImg" src="/src/img/default_user.svg" alt="프로필 사진"></image>
            </div>
            <span id="name" class="${style.name}"></span>
          </div>
          <div class="${style.attendBox}">
            <button id="attendButton" type="button">출근하기</button>
            <div class="${style.attendFooter}">
              <div>
                <h3>출근 시각</h3>
                <span id="workTime">-</span>
              </div>
              <div>
                <h3>퇴근 시각</h3>
                <span id="attendTime">-</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

export default workOnRender;

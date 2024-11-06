import style from './workOn.module.css';
// 페이지 렌더링
const workOnRender = () => `
    <main id="container" class="${style.container}">
      <article id="modal"></article>
      <article class="${style.workOnBox}">
        <div class="${style.contentsBox}">
          <div class="${style.boxHeader}">
            <span id="isWork">출근전</span>
          </div>
          <section class="${style.workOnItem}">
            <div class="${style.division}">임직원</div>
            <div class="${style.workOnImg}">
              <img id="profileImg" src="/src/assets/img/default_user.svg" alt="프로필 사진" />
            </div>
            <span id="name" class="${style.name}"></span>
          </section>
          <section class="${style.attendBox}">
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
          </section>
        </div>
      </article>
    </main>
  `;

export default workOnRender;

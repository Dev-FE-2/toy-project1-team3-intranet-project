import styles from '../notice.module.css';
import viewStyles from './noticeView.module.css';
import { getNoticeById } from './viewFunc';

// 페이지 렌더링
const viewRender = async () => {
  const path = window.location.pathname;
  const updatePath = path.replace('view', 'update');
  const backPath = path.slice(0, path.indexOf('/view'));

  const noticeSn = path.slice(path.lastIndexOf('/') + 1);
  const viewData = await getNoticeById(noticeSn);

  // 수정/삭제 버튼 렌더링 제어
  const isShowBtn = (user_sn) => {
    // 관리자이며, 본인이 작성한 글일 때만 보임
    const userInfo = localStorage.getItem('userSn');
    const userGrade = parseInt(localStorage.getItem('userGrade'));
    return userInfo === user_sn && userGrade === 0;
  };

  return /* HTML */ `
    <main class="${styles.container}">
      <div class="${styles.inner}">
        <h1 class="${styles.h1}">기업공지 상세</h1>

        <section class="${styles['form-wrap']}">
          <input type="hidden" id="noticeSn" value="${noticeSn}" />
          <div class="${styles['form-list']}">
            <div class="${styles.label}">제목</div>
            <div class="${styles.content}">${viewData.title}</div>
          </div>
          <div class="${styles['form-list']}">
            <div class="${styles.label}">내용</div>
            <div class="${styles.content}">
              <div class="${styles['pre-white']}">${viewData.content}</div>
            </div>
          </div>
          <div class="${styles['form-list']}">
            <div class="${styles.label}">이미지</div>
            <div class="${styles.content}">
              ${viewData.image
                ? `<img src="data:image/jpeg;base64,${viewData.image}" alt="${viewData.image_name}" />`
                : '-'}
            </div>
          </div>
        </section>

        <section class="${styles['btn-wrap']} ${viewStyles['btn-wrap']}">
          ${isShowBtn(viewData.user_sn)
            ? `<a
            href="${updatePath}"
            class="${styles.btn} ${viewStyles.btn}"
          >
            수정하기
          </a>`
            : ''}
          ${isShowBtn(viewData.user_sn)
            ? `
          <button
            type="button"
            id="deleteBtn"
            class="${styles.btn} ${styles.red} ${viewStyles.btn}"
          >
            삭제하기
          </button>
          `
            : ''}
          <a
            href="${backPath}"
            class="${styles.btn} ${styles.gray} ${viewStyles.btn}"
          >
            이전으로
          </a>
        </section>
      </div>
    </main>
  `;
};

export default viewRender;

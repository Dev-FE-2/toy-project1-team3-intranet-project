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
    <div class="${styles.container}">
      <div class="${styles.inner}">
        <h1 class="${styles.h1}">기업공지 상세</h1>

        <div class="${styles['form-wrap']}">
          <input type="hidden" id="noticeSn" value="${noticeSn}" />
          <div class="${styles['form-list']}">
            <div class="${styles.label}">제목</div>
            <div class="${styles.content}">${viewData.title}</div>
          </div>
          <div class="${styles['form-list']}">
            <div class="${styles.label}">내용</div>
            <div class="${styles.content}">${viewData.content}</div>
          </div>
          <div class="${styles['form-list']}">
            <div class="${styles.label}">이미지</div>
            <div class="${styles.content}">
              <!-- 이미지 작업은 추후 예정 -->
              ${viewData.image ? `<img src="${viewData.image}" />` : '-'}
            </div>
          </div>
        </div>

        <div class="${styles['btn-wrap']} ${viewStyles['btn-wrap']}">
          ${isShowBtn(viewData.user_id)
            ? `<a
            href="${updatePath}"
            class="${styles.btn} ${viewStyles.btn}"
          >
            수정하기
          </a>`
            : ''}
          ${isShowBtn(viewData.user_id)
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
        </div>
      </div>
    </div>
  `;
};

export default viewRender;

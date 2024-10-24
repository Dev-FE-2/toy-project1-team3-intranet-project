import styles from '../notice.module.css';
import viewStyles from './noticeView.module.css';

// 페이지 렌더링
const viewRender = () => {
  return /* HTML */ `
    <div class="${styles.container}">
      <div class="${styles.inner}">
        <h1 class="${styles.h1}">기업공지 상세</h1>

        <div class="${styles['form-wrap']}">
          <div class="${styles['form-list']}">
            <div class="${styles.label}">제목</div>
            <div class="${styles.content}">
              공지 제목입니다.공지 제목입니다. 공지 제목입니다.
            </div>
          </div>
          <div class="${styles['form-list']}">
            <div class="${styles.label}">내용</div>
            <div class="${styles.content}">
              공지 내용입니다.공지 내용입니다.공지 내용입니다.공지
              내용입니다.공지 내용입니다.공지 내용입니다.<br />
              공지 내용입니다.<br />
              공지 내용입니다.<br />
              공지 내용입니다.<br />
              공지 내용입니다. 공지 내용입니다.
            </div>
          </div>
          <div class="${styles['form-list']}">
            <div class="${styles.label}">이미지</div>
            <div class="${styles.content}">
              <img src="/public/vite.svg" />
            </div>
          </div>
        </div>

        <div class="${styles['btn-wrap']} ${viewStyles['btn-wrap']}">
          <a
            href="/admin/notice/update"
            class="${styles.btn} ${viewStyles.btn}"
          >
            수정하기
          </a>
          <button
            type="button"
            class="${styles.btn} ${styles.red} ${viewStyles.btn}"
          >
            삭제하기
          </button>
          <a
            href="/admin/notice"
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

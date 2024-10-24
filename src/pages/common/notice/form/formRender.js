import styles from '../notice.module.css';
import formStyles from './noticeForm.module.css';

// 페이지 렌더링
const formRender = (id) => {
  let pageTitle = '';
  let submitText = '';
  let actionUrl = '';
  if (id) {
    pageTitle = '기업공지 수정';
    submitText = '수정하기';
    actionUrl = '/updateNotice';
  } else {
    pageTitle = '기업공지 등록';
    submitText = '등록하기';
    actionUrl = '/insertNotice';
  }

  return /* HTML */ `
    <div class="${styles.container}">
      <div class="${styles.inner}">
        <h1 class="${styles.h1}">${pageTitle}</h1>

        <form action="${actionUrl}" method="POST">
          ${id ? `<input type="hidden" name="_method" value="PUT" />` : ''}
          <div class="${styles['form-wrap']}">
            <div class="${styles['form-list']}">
              <div class="${styles.label} ${formStyles.label}">제목</div>
              <div class="${styles.content}">
                <input
                  type="text"
                  class="${styles.input}"
                  placeholder="제목을 입력하세요"
                  value=""
                />
              </div>
            </div>
            <div class="${styles['form-list']}">
              <div class="${styles.label} ${formStyles.label}">내용</div>
              <div class="${styles.content}">
                <textarea placeholder="내용을 입력하세요"></textarea>
              </div>
            </div>
            <div class="${styles['form-list']}">
              <div class="${styles.label} ${formStyles.label}">이미지</div>
              <div class="${styles.content}">
                <input
                  type="file"
                  id="noticeImg"
                  class="${styles.input}"
                  value=""
                  accept=".jpg, .png, .jpeg, .gif"
                />
                <input
                  type="text"
                  class="${styles.input}"
                  value="파일명"
                  readonly
                />
                <label for="noticeImg" class="${styles.btn} ${styles.plus}">
                  <span>이미지 첨부</span>
                </label>
                <button
                  type="button"
                  class="${styles.btn} ${styles.red} ${styles.trash}"
                >
                  <span>이미지 삭제</span>
                </button>
              </div>
            </div>
          </div>

          <div class="${styles['btn-wrap']} ${formStyles['btn-wrap']}">
            <button type="submit" class="${styles.btn} ${formStyles.btn}">
              ${submitText}
            </button>
            <a
              href="/admin/notice"
              class="${styles.btn} ${styles.gray} ${formStyles.btn}"
            >
              이전으로
            </a>
          </div>
        </form>
      </div>
    </div>
  `;
};

export default formRender;

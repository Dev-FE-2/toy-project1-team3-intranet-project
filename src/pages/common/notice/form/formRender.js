import styles from '../notice.module.css';
import formStyles from './noticeForm.module.css';
import { getNoticeById } from '../view/viewFunc';

// 페이지 렌더링
const formRender = async (id) => {
  const isUpdateMode = Boolean(id);
  const path = window.location.pathname;
  const noticeSn = isUpdateMode ? path.slice(path.lastIndexOf('/') + 1) : '';
  const data = isUpdateMode ? await getNoticeById(noticeSn) : null;

  const pageTitle = isUpdateMode ? '기업공지 수정' : '기업공지 등록';
  const submitText = isUpdateMode ? '수정하기' : '등록하기';

  return /* HTML */ `
    <div class="${styles.container}">
      <div class="${styles.inner}">
        <h1 class="${styles.h1}">${pageTitle}</h1>

        <form id="uploadForm">
          ${id
            ? `<input type="hidden" id="noticeSn" value="${noticeSn}" />`
            : ''}
          <section class="${styles['form-wrap']}">
            <p class="${formStyles.desc}">* 표시가 있는 항목은 필수입니다.</p>
            <div class="${styles['form-list']}" role="group">
              <label for="title" class="${styles.label} ${formStyles.label}"
                >* 제목</label
              >
              <div class="${styles.content}">
                <input
                  type="text"
                  name="title"
                  id="title"
                  class="${styles.input}"
                  placeholder="제목을 입력하세요"
                  value="${data?.title || ''}"
                />
              </div>
            </div>
            <div class="${styles['form-list']}" role="group">
              <label for="content" class="${styles.label} ${formStyles.label}"
                >* 내용</label
              >
              <div class="${styles.content}">
                <textarea
                  id="content"
                  name="content"
                  placeholder="내용을 입력하세요"
                >
${data?.content || ''}</textarea
                >
              </div>
            </div>
            <div class="${styles['form-list']}" role="group">
              <label for="noticeImg" class="${styles.label} ${formStyles.label}"
                >이미지</label
              >
              <div class="${styles.content}">
                <input
                  type="file"
                  name="image"
                  id="noticeImg"
                  class="${styles.input}"
                  value=""
                  accept=".jpg, .png, .jpeg, .gif"
                />
                <input
                  type="text"
                  id="fileName"
                  class="${styles.input}"
                  value="${data?.image_name || ''}"
                  placeholder="파일명"
                  readonly
                />
                <label for="noticeImg" class="${styles.btn} ${styles.plus}">
                  <span>이미지 첨부</span>
                </label>
                <button
                  type="button"
                  id="deleteBtn"
                  class="${styles.btn} ${styles.red} ${styles.trash}"
                >
                  <span>이미지 삭제</span>
                </button>
              </div>
            </div>
          </section>

          <div class="${styles['btn-wrap']} ${formStyles['btn-wrap']}">
            <button type="submit" class="${styles.btn} ${formStyles.btn}">
              ${submitText}
            </button>
            <button
              type="button"
              id="backBtn"
              class="${styles.btn} ${styles.gray} ${formStyles.btn}"
            >
              이전으로
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
};

export default formRender;

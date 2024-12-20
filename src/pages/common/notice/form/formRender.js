import '../../../../assets/css/input.css';
import '../../../../assets/css/textarea.css';
import '../../../../assets/css/buttons.css';
import styles from '../notice.module.css';
import formStyles from './noticeForm.module.css';
import { getNoticeById } from '../view/viewFunc';

// 페이지 렌더링
const formRender = async (id) => {
  const isUpdateMode = Boolean(id);
  const path = window.location.pathname;
  const noticeSn = isUpdateMode ? path.slice(path.lastIndexOf('/') + 1) : '';
  const data = isUpdateMode ? await getNoticeById(noticeSn) : null;

  // const pageTitle = isUpdateMode ? '기업공지 수정' : '기업공지 등록';
  const submitText = isUpdateMode ? '수정하기' : '등록하기';

  return /* HTML */ `
    <form id="uploadForm">
      ${id ? `<input type="hidden" id="noticeSn" value="${noticeSn}" />` : ''}
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
${data?.content || ''}
                </textarea
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
              value="${data?.image_name || ''}"
              placeholder="파일명"
              readonly
            />
            <label for="noticeImg" class="${styles.btn} ${styles.plus} plusBtn">
              <span>이미지 첨부</span>
            </label>
            <button
              type="button"
              id="deleteBtn"
              class="${styles.btn} skinBtn ${styles.trash}"
            >
              <span>이미지 삭제</span>
            </button>
          </div>
        </div>
      </section>

      <section class="${styles['btn-wrap']} ${formStyles['btn-wrap']}">
        <button type="submit" class="${formStyles.btn}">${submitText}</button>
        <button type="button" id="backBtn" class="${formStyles.btn} grayBtn">
          이전으로
        </button>
      </section>
    </form>
  `;
};

export default formRender;

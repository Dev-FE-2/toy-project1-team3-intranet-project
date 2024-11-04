import styles from '../notice.module.css';
import formStyles from './noticeForm.module.css';
import { getNoticeById } from '../view/viewFunc';

// 페이지 렌더링
const formRender = async (id) => {
  const userSn = localStorage.getItem('userSn');

  // 로그인이 안 되어있다면 화면 진입 불가하도록
  if (!userSn) {
    alert('로그인을 해주세요.');
    window.location.replace('/'); // 로그인 페이지로 리다이렉트
    return null; // 함수 종료
  }

  const path = window.location.pathname;
  let pageTitle = '';
  let submitText = '';
  let noticeSn = '';
  let data = null;
  if (id) {
    pageTitle = '기업공지 수정';
    submitText = '수정하기';
    noticeSn = path.slice(path.lastIndexOf('/') + 1);
    data = await getNoticeById(noticeSn);
  } else {
    pageTitle = '기업공지 등록';
    submitText = '등록하기';
  }

  return /* HTML */ `
    <main class="${styles.container}">
      <div class="${styles.inner}">
        <h1 class="${styles.h1}">${pageTitle}</h1>

        <form id="uploadForm">
          ${id
            ? `<input type="hidden" id="noticeSn" value="${noticeSn}" />`
            : ''}
          <section class="${styles['form-wrap']}">
            <p class="${formStyles.desc}">* 표시가 있는 항목은 필수입니다.</p>
            <div class="${styles['form-list']}">
              <div class="${styles.label} ${formStyles.label}">* 제목</div>
              <div class="${styles.content}">
                <input
                  type="text"
                  name="title"
                  class="${styles.input}"
                  placeholder="제목을 입력하세요"
                  value="${data?.title || ''}"
                />
              </div>
            </div>
            <div class="${styles['form-list']}">
              <div class="${styles.label} ${formStyles.label}">* 내용</div>
              <div class="${styles.content}">
                <textarea name="content" placeholder="내용을 입력하세요">
                  ${data?.content || ''}
                </textarea>
              </div>
            </div>
            <div class="${styles['form-list']}">
              <div class="${styles.label} ${formStyles.label}">이미지</div>
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

          <section class="${styles['btn-wrap']} ${formStyles['btn-wrap']}">
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
          </section>
        </form>
      </div>
    </main>
  `;
};

export default formRender;

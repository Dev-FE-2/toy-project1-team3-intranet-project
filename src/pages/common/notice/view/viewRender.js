import { getUserGrade, getUserSerialNumber } from '../../../../utils/userUtils';
import styles from '../notice.module.css';
import viewStyles from './noticeView.module.css';
import { getNoticeById } from './viewFunc';

// 페이지 렌더링
const viewRender = async (noticeSn) => {
  const { updatePath, backPath } = getPaths();

  const viewData = await getNoticeById(noticeSn);
  if (!viewData) {
    console.error('Notice data not found');
    return `<div class="${styles.container}">공지사항을 불러올 수 없습니다.</div>`;
  }

  const btnMarkup = isUserAuthorized(viewData.user_sn)
    ? getActionButtons(updatePath, viewData.user_sn)
    : '';

  return /* HTML */ `
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
          ${
            viewData.image
              ? `<img src="data:image/jpeg;base64,${viewData.image}" alt="${viewData.image_name}" />`
              : '-'
          }
        </div>
      </div>
    </section>

    <div class="${styles['btn-wrap']} ${viewStyles['btn-wrap']}">
      ${btnMarkup}
      <button type="button" onclick="location.href='${backPath}'"
        class="grayBtn ${viewStyles.btn}"
      >
        이전으로
      </button>
    </section>
  `;
};

// 수정 버튼 반환 함수
const getActionButtons = (updatePath) => `
  <button type="button" onclick="location.href='${updatePath}'" class="${viewStyles.btn}">수정하기</button>
  <button type="button" id="deleteBtn" class="skinBtn ${viewStyles.btn}">
    삭제하기
  </button>
`;

// 접속한 사용자의 글 수정 권한 확인 함수
const isUserAuthorized = (userSn) =>
  getUserSerialNumber() === userSn && getUserGrade() === 0;

// 관련 경로 가져오는 함수
const getPaths = () => {
  const path = window.location.pathname;
  return {
    path,
    updatePath: path.replace('view', 'update'),
    backPath: path.slice(0, path.indexOf('/view')),
  };
};

export default viewRender;

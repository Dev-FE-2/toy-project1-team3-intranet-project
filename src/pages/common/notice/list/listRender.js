import '../../../../assets/css/buttons.css';
import styles from '../notice.module.css';
import listStyles from './noticeList.module.css';
import listItem from './listItem';
import { getNotices } from './listFunc';

// 페이지 렌더링
const listRender = async () => {
  const currentPath = window.location.pathname;
  const userGrade = parseInt(localStorage.getItem('userGrade'));
  const { data, totalCount } = await getNotices();

  return /* HTML */ `
    <div class="${styles.inner}">
      <h1 class="${styles.h1}">기업공지 관리</h1>
      ${userGrade
        ? ''
        : `<div class="${styles['btn-wrap']} ${listStyles['btn-wrap']}">
          <button onclick="location.href='${currentPath}/insert'" class="${styles.btn} ${styles.plus}">
            <span>공지 등록</span>
          </button>
        </div>`}
      <section class="${listStyles['list-wrap__header']}">
        <div class="${listStyles['count-desc']}">
          총 <span id="noticeCnt">${totalCount}</span>개의 공지
        </div>
        <div class="${listStyles['search-wrap']}">
          <input
            type="search"
            id="searchInput"
            class="${styles.input}"
            placeholder="검색"
          />
          <button
            type="button"
            id="searchBtn"
            class="searchBtn ${listStyles['search-btn']}"
          >
            <img
              src="/src/assets/img/search-svgrepo-com.svg"
              alt="검색 아이콘"
            />
          </button>
        </div>
      </section>
      <section id="noticeList" class="${listStyles['list-wrap__body']}">
        ${renderNotices(data)}
      </section>
      <nav id="pagingContainer"></nav>
    </div>
  `;
};

// 공지 목록 렌더링 함수 (검색 필터링에도 사용됨)
export const renderNotices = (data) => {
  return data.length > 0
    ? data
        .map((item) => {
          return listItem(
            item.sn,
            item.title,
            item.content,
            item.date.split(' ')[0],
            item.image
          );
        })
        .join('')
    : `<div class="${listStyles.nodata}">게시글이 없습니다.</div>`;
};

export default listRender;

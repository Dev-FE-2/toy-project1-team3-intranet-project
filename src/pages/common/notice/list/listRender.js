import styles from '../notice.module.css';
import listStyles from './noticeList.module.css';
import listItem from './listItem';
import { getNotices } from './listFunc';

// 페이지 렌더링
const listRender = async () => {
  const currentPath = window.location.pathname;
  const { data, totalCount } = await getNotices(1);

  return /* HTML */ `
    <div class="${styles.container}">
      <div class="${styles.inner}">
        <h1 class="${styles.h1}">기업공지 관리</h1>
        <div class="${styles['btn-wrap']} ${listStyles['btn-wrap']}">
          <a href="${currentPath}/insert" class="${styles.btn} ${styles.plus}">
            <span>공지 등록</span>
          </a>
        </div>
        <div class="${listStyles['list-wrap__header']}">
          <span class="${listStyles['count-desc']}"
            >총 ${totalCount}개의 공지</span
          >
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
              class="${listStyles['search-btn']}"
            >
              <img src="/src/img/search-svgrepo-com.svg" alt="검색 아이콘" />
            </button>
          </div>
        </div>
        <div id="noticeList" class="${listStyles['list-wrap__body']}">
          ${renderNotices(data)}
        </div>
        <div id="pagingContainer"></div>
      </div>
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
            item.date.split(' ')[0]
          );
        })
        .join('')
    : `<div class="${listStyles.nodata}">게시글이 없습니다.</div>`;
};

export default listRender;

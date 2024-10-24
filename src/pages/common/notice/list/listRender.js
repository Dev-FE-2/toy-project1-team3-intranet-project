import styles from '../notice.module.css';
import listStyles from './noticeList.module.css';
import listItem from './listItem';
import pagination from './pagination';

// 페이지 렌더링
const listRender = () => {
  const curPath = window.location.pathname;
  const items = [
    {
      id: 1,
      title: '기업공지제목 1',
      content: '기업공지내용 1',
      date: '2024-10-22',
    },
    {
      id: 2,
      title: '기업공지제목 2',
      content: '기업공지내용 2기업공지내용 2',
      date: '2024-10-22',
    },
    {
      id: 3,
      title: '기업공지제목 3',
      content: '기업공지내용 3',
      date: '2024-10-22',
    },
    {
      id: 4,
      title: '기업공지제목 4',
      content: '기업공지내용 4',
      date: '2024-10-22',
    },
    {
      id: 5,
      title: '기업공지제목 5',
      content: '기업공지내용 5',
      date: '2024-10-22',
    },
  ];

  const numPerPage = 8;
  const totalPages = parseInt(items.length / numPerPage);

  return /* HTML */ `
    <div class="${styles.container}">
      <div class="${styles.inner}">
        <h1 class="${styles.h1}">기업공지 관리</h1>
        <div class="${styles['btn-wrap']} ${listStyles['btn-wrap']}">
          <a href="${curPath}/insert" class="${styles.btn} ${styles.plus}">
            <span>공지 등록</span>
          </a>
        </div>
        <div class="${listStyles['list-wrap__header']}">
          <span class="${listStyles['count-desc']}"
            >총 ${items.length}개의 공지</span
          >
          <input type="text" class="${styles.input}" placeholder="검색" />
        </div>
        <div class="${listStyles['list-wrap__body']}">
          ${items
            .map((item) =>
              listItem(item.id, item.title, item.content, item.date)
            )
            .join('')}
        </div>
        ${pagination(1, totalPages > 0 ? totalPages : 1)}
      </div>
    </div>
  `;
};

export default listRender;

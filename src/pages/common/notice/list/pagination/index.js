import styles from './pagination.module.css';

const pagination = (currentPage, totalPages) => {
  const pageButtons = [];
  const groupSize = 10; // 항상 10개 단위로 표시
  const currentGroup = Math.ceil(currentPage / groupSize); // 현재 페이지 그룹 계산
  const startPage = (currentGroup - 1) * groupSize + 1; // 현재 그룹의 시작 페이지
  const endPage = Math.min(startPage + groupSize - 1, totalPages); // 현재 그룹의 끝 페이지 (총 페이지 수를 초과하지 않도록)

  for (let i = startPage; i <= endPage; i++) {
    pageButtons.push(
      `<li>
         <button class="${i === currentPage ? `${styles.active} current-page` : ''}">
           ${i}
         </button>
       </li>`
    );
  }

  return /* HTML */ `
    <ul class="${styles.pagination}">
      <li>
        <button
          class="${styles.prev} first"
          ${currentPage === 1 ? 'disabled' : ''}
        >
          &lt;&lt;
        </button>
      </li>
      <li>
        <button
          class="${styles.prev} prev"
          ${currentPage === 1 ? 'disabled' : ''}
        >
          &lt;
        </button>
      </li>
      ${pageButtons.join('')}
      <li>
        <button
          class="${styles.next} next"
          ${currentPage === totalPages ? 'disabled' : ''}
        >
          &gt;
        </button>
      </li>
      <li>
        <button
          class="${styles.next} last"
          ${currentPage === totalPages ? 'disabled' : ''}
        >
          &gt;&gt;
        </button>
      </li>
    </ul>
  `;
};

export default pagination;

import styles from './pagination.module.css';

const pagination = (currentPage, totalPages) => {
  const pageButtons = [];
  const startPage = Math.max(currentPage - 5, 1);
  const endPage = Math.min(startPage + 9, totalPages);

  for (let i = startPage; i <= endPage; i++) {
    pageButtons.push(
      `<li>
         <button class="${i === currentPage ? styles.active : ''}">
           ${i}
         </button>
       </li>`
    );
  }

  return /* HTML */ `
    <ul class="${styles.pagination}">
      <li>
        <button class="${styles.prev}" ${currentPage === 1 ? 'disabled' : ''}>
          &lt;
        </button>
      </li>
      ${pageButtons.join('')}
      <li>
        <button
          class="${styles.next}"
          ${currentPage === totalPages ? 'disabled' : ''}
        >
          &gt;
        </button>
      </li>
    </ul>
  `;
};

export default pagination;

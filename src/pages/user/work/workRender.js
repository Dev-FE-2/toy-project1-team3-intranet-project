import styles from './work.module.css';

// 페이지 렌더링
const workRender = () => `
<div class="${styles.page}">
  <h1 class="${styles.title}">출근 관리</h1>

  <div class="${styles.content}">

    <div class="${styles.searchWrap}">
      <input type="search" class="${styles.searchInput}" placeholder="날짜 검색" />
      <button type="button" class="${styles.searchBtn}">
        <img src="/src/img/search-svgrepo-com.svg" alt="검색 아이콘" class="${styles.searchIcon}" />
      </button>
    </div>

    <table class="${styles.workList}">
      <tr>
        <th scope="col">출근일자</td>
        <th scope="col">출근 시각</td>
        <th scope="col">퇴근 시각</td>
      </tr>
      <tr>
        <td>2024-10-09</td>
        <td>09:00</td>
        <td>18:00</td>
      </tr>
      <tr>
        <td>2024-10-09</td>
        <td>09:00</td>
        <td>18:00</td>
      </tr>
      <tr>
        <td>2024-10-09</td>
        <td>09:00</td>
        <td>18:00</td>
      </tr>
      <tr>
        <td>2024-10-09</td>
        <td>09:00</td>
        <td>18:00</td>
      </tr>
      <tr>
        <td>2024-10-09</td>
        <td>09:00</td>
        <td>18:00</td>
      </tr>
      <tr>
        <td>2024-10-09</td>
        <td>09:00</td>
        <td>18:00</td>
      </tr>
      <tr>
        <td>2024-10-09</td>
        <td>09:00</td>
        <td>18:00</td>
      </tr>
      <tr>
        <td>2024-10-09</td>
        <td>09:00</td>
        <td>18:00</td>
      </tr>
      <tr>
        <td>2024-10-09</td>
        <td>09:00</td>
        <td>18:00</td>
      </tr>
      <tr>
        <td>2024-10-09</td>
        <td>09:00</td>
        <td>18:00</td>
      </tr>
    </table>
    
    <div class="${styles.pagination}">
      <div class="${styles.pageBtn}"><a href="#" class="${styles.prev}"><</a></div>
      <div class="${styles.pageBtn} ${styles.active}"><a href="#" class="${styles.num}">1</a></div>
      <div class="${styles.pageBtn}"><a href="#" class="${styles.num}">2</a></div>
      <div class="${styles.pageBtn}"><a href="#" class="${styles.next}">></a></div>
    </div>

  </div>
</div>
  `;

export default workRender;

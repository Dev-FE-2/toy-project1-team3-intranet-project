import styles from './work.module.css';
import { fetchWorks } from './workFunc';

// 페이지 렌더링
const workRender = async () => {

  const {data} = await fetchWorks();
  
  return `
  <main class="${styles.page}">  
    <h1 class="${styles.title}">출근 관리</h1>

    <article class="${styles.content}">

      <section class="${styles.searchWrap}">
        <input type="search" id="searchInput" class="${styles.searchInput}" placeholder="날짜 검색" />
        <button type="button" id="searchBtn" class="${styles.searchBtn}">
          <img src="/src/img/search-svgrepo-com.svg" alt="검색 아이콘" class="${styles.searchIcon}" />
        </button>
      </section>

      <table class="${styles.workList}">
        <thead>
          <tr>
            <th scope="col">출근일자</td>
            <th scope="col">출근 시각</td>
            <th scope="col">퇴근 시각</td>
          </tr>
        </thead>
        <tbody id="workList">
          ${renderWorkList(data)}
        </tbody>
      </table>
      
      <nav id="pagination" class="${styles.pagination}">
      </nav>

    </article>
  </main>
  `};

export const renderWorkList = (data) => {
  return data.length > 0 ? data.map((item) => `
    <tr>
      <td>${item.WORK_DATE.split(' ')[0]}</td>
      <td>${item.WORK_START_DATE_TIME.split(' ')[1].slice(0, 5)}</td>
      <td>${item.WORK_END_DATE_TIME.split(' ')[1].slice(0, 5)}</td>
    </tr>`
  ).join('')
  : `<tr><td colspan="3">등록된 출근 기록이 없습니다.</td></tr>`;
}

export default workRender;

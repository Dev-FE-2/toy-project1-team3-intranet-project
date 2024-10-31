import styles from './work.module.css';
import { fetchWorks } from './workFunc';

// 페이지 렌더링
const workRender = async () => {
  const currentPath = window.location.pathname;

  // // 로그인이 안 되어있다면 화면 진입 불가하도록
  // if (!userId) {
  //   alert('로그인을 해주세요.');
  //   window.location.replace('/'); // 로그인 페이지로 리다이렉트
  //   return null; // 함수 종료
  // }

  const {data} = await fetchWorks();
  
  return `
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
        ${data.length > 0 ? data.map((item) => `
          <tr>
            <td>${item.WORK_DATE}</td>
            <td>${item.WORK_START_DATE_TIME}</td>
            <td>${item.WORK_END_DATE_TIME}</td>
          </tr>`
        ).join('')
        : `<tr><td colspan="3">등록된 출근 기록이 없습니다.</td></tr>`}
      </table>
      
      <div id="pagination" class="${styles.pagination}">
        <div class="${styles.pageBtn}"><a href="#" class="${styles.prev}"><</a></div>
        <div class="${styles.pageBtn} ${styles.active}"><a href="#" class="${styles.num}">1</a></div>
        <div class="${styles.pageBtn}"><a href="#" class="${styles.num}">2</a></div>
        <div class="${styles.pageBtn}"><a href="#" class="${styles.next}">></a></div>
      </div>

    </div>
  </div>
  `};

export default workRender;

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
        <input type="search" id="searchInput" class="${styles.searchInput}" placeholder="날짜 검색" />
        <button type="button" id="searchBtn" class="${styles.searchBtn}">
          <img src="/src/img/search-svgrepo-com.svg" alt="검색 아이콘" class="${styles.searchIcon}" />
        </button>
      </div>

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
      
      <div id="pagination" class="${styles.pagination}">
      </div>

    </div>
  </div>
  `};

export const renderWorkList = (data) => {
  return data.length > 0 ? data.map((item) => `
    <tr>
      <td>${item.WORK_DATE}</td>
      <td>${item.WORK_START_DATE_TIME.split(' ')[1].slice(0, 5)}</td>
      <td>${item.WORK_END_DATE_TIME.split(' ')[1].slice(0, 5)}</td>
    </tr>`
  ).join('')
  : `<tr><td colspan="3">등록된 출근 기록이 없습니다.</td></tr>`;
}

export default workRender;

import styles from './adminAbsence.module.css';
import { fetchAdminAbsence } from './absenceFunc';

// 페이지 렌더링
const absenceRender = async () => {
  const userSn = localStorage.getItem('userSn');

  // 로그인이 안 되어있다면 화면 진입 불가하도록
  // if (!userSn) {
  //   alert('로그인을 해주세요.');
  //   window.location.replace('/'); // 로그인 페이지로 리다이렉트
  //   return null; // 함수 종료
  // }

  const {data} = await fetchAdminAbsence();

  return `
  <div class="${styles.page}">
    <h1 class="${styles.title}">부재 관리</h1>

    <div class="${styles.content}">

      <div class="${styles.searchWrap}">
        <input type="text" class="${styles.searchInput}" placeholder="검색" />
        <select name="type" class="${styles.typeSelect}">
          <option value="">부재 항목 선택</option>
          <option value="연차">연차</option>
          <option value="오전반차">오전반차</option>
          <option value="오후반차">오후반차</option>
          <option value="외출">외출</option>
          <option value="공가">공가</option> 
          <option value="병가">병가</option>
        </select>
      </div>

      <table class="${styles.absenceList}">
        <thead>
          <tr>
            <th scope="col" width="15%">신청일</td>
            <th scope="col" width="30%">부재기간</td>
            <th scope="col" width="10%">부재항목</td>
            <th scope="col" width="10%">세부내용</td>
            <th scope="col" width="10%">신청자</td>
          </tr>
        </thead>
        <tbody id="absenceList">
          ${renderAdminAbsenceList(data)}
        </tbody>
      </table>
      
      <div class="${styles.pagination}">
        <div class="${styles.pageBtn}"><a href="#" class="${styles.prev}"><</a></div>
        <div class="${styles.pageBtn} ${styles.active}"><a href="#" class="${styles.num}">1</a></div>
        <div class="${styles.pageBtn}"><a href="#" class="${styles.next}">></a></div>
      </div>
      
    </div>
  </div>
  `;
}

export const renderAdminAbsenceList = (data) => {
  return data.length > 0 ? data.map((item) => `
    <tr>
      <td>${item.ABSENCE_REQUEST_DATE_TIME.split(' ')[0].slice(0, 10)}</td>
      <td>${item.ABSENCE_START_DATE_TIME} ~ ${item.ABSENCE_END_DATE_TIME}</td>
      <td>${item.ABSENCE_TYPE}</td>
      <td>${item.ABSENCE_DETAIL_CONTENT}</td>
      <td>${item.USER_NAME}</td>
    </tr> `
  ).join('')
  : `<tr><td colspan="4">등록된 부재 기록이 없습니다.</td></tr>`;
}


export default absenceRender;

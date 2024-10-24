import styles from './userAbsence.module.css';

// 페이지 렌더링
const absenceRender = () => `
<h1>부재 관리</h1>

<div class="${styles.content}">
  
  <div class="${styles.absenceRequest}">
    <button class="${styles.absenceBtn}">+ 부재 신청</button>
  </div>

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
    <tr>
      <th scope="col" width="20%">신청일</td>
      <th scope="col" width="30%">부재기간</td>
      <th scope="col" width="20%">부재항목</td>
      <th scope="col" width="20%">세부내용</td>
    </tr>
    <tr>
      <td>2024-10-09</td>
      <td>2024-10-25 14:00 ~ 2024-10-25 18:00</td>
      <td>오후반차</td>
      <td>병원 방문</td>
    </tr>
    <tr>
      <td>2024-05-01</td>
      <td>2024-05-10 09:00 ~ 2024-05-10 18:00</td>
      <td>연차</td>
      <td>개인 휴가</td>
    </tr>
    <tr>
      <td>2024-05-01</td>
      <td>2024-05-10 09:00 ~ 2024-05-10 18:00</td>
      <td>연차</td>
      <td>개인 휴가</td>
    </tr>
    <tr>
      <td>2024-05-01</td>
      <td>2024-05-10 09:00 ~ 2024-05-10 18:00</td>
      <td>연차</td>
      <td>개인 휴가</td>
    </tr>
    <tr>
      <td>2024-05-01</td>
      <td>2024-05-10 09:00 ~ 2024-05-10 18:00</td>
      <td>연차</td>
      <td>개인 휴가</td>
    </tr>
    <tr>
      <td>2024-05-01</td>
      <td>2024-05-10 09:00 ~ 2024-05-10 18:00</td>
      <td>연차</td>
      <td>개인 휴가</td>
    </tr>
    <tr>
      <td>2024-05-01</td>
      <td>2024-05-10 09:00 ~ 2024-05-10 18:00</td>
      <td>연차</td>
      <td>개인 휴가</td>
    </tr>
    <tr>
      <td>2024-05-01</td>
      <td>2024-05-10 09:00 ~ 2024-05-10 18:00</td>
      <td>연차</td>
      <td>개인 휴가</td>
    </tr>
    <tr>
      <td>2024-05-01</td>
      <td>2024-05-10 09:00 ~ 2024-05-10 18:00</td>
      <td>연차</td>
      <td>개인 휴가</td>
    </tr>
    <tr>
      <td>2024-05-01</td>
      <td>2024-05-10 09:00 ~ 2024-05-10 18:00</td>
      <td>연차</td>
      <td>개인 휴가</td>
    </tr>
  </table>
  
  <div class="${styles.pagination}">
    <div class="${styles.pageBtn}"><a href="#" class="${styles.prev}"><</a></div>
    <div class="${styles.pageBtn} ${styles.active}"><a href="#" class="${styles.num}">1</a></div>
    <div class="${styles.pageBtn}"><a href="#" class="${styles.num}">2</a></div>
    <div class="${styles.pageBtn}"><a href="#" class="${styles.next}">></a></div>
  </div>

</div>
`;

export default absenceRender;

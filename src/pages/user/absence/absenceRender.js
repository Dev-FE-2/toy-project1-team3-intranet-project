import styles from './userAbsence.module.css';
import { fetchUserAbsence } from './absenceFunc';

// 페이지 렌더링
const absenceRender = async () => {
  const userSn = localStorage.getItem('userSn');

  // 로그인이 안 되어있다면 화면 진입 불가하도록
  // if (!userSn) {
  //   alert('로그인을 해주세요.');
  //   window.location.replace('/'); // 로그인 페이지로 리다이렉트
  //   return null; // 함수 종료
  // }

  const {data} = await fetchUserAbsence();

  return `
  <div class="${styles.page}">
    <h1 class="${styles.title}">부재 관리</h1>
  
    <div class="${styles.content}">
      
      <div class="${styles.absenceRequest}">
        <button id="absenceBtn" class="${styles.absenceBtn}">+ 부재 신청</button>
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
        <button type="button" class="${styles.searchBtn}">
          <img src="/src/img/search-svgrepo-com.svg" alt="검색 아이콘" class="${styles.searchIcon}" />
        </button>
      </div>
  
      <table class="${styles.absenceList}">
        <thead>
          <tr>
            <th scope="col" width="20%">신청일</td>
            <th scope="col" width="30%">부재기간</td>
            <th scope="col" width="20%">부재항목</td>
            <th scope="col" width="20%">세부내용</td>
          </tr>
        </thead>
        <tbody = id="absenceList">
          ${renderUserAbsenceList(data)}
        </tbody>
      </table>
      
      <div class="${styles.pagination}">
        <div class="${styles.pageBtn}"><a href="#" class="${styles.prev}"><</a></div>
        <div class="${styles.pageBtn} ${styles.active}"><a href="#" class="${styles.num}">1</a></div>
        <div class="${styles.pageBtn}"><a href="#" class="${styles.num}">2</a></div>
        <div class="${styles.pageBtn}"><a href="#" class="${styles.next}">></a></div>
      </div>
  
      <div class="${styles.modal} modal">
        <div class="${styles.modalBack} modalBack"></div>
        <div class="${styles.modalPopup}">
          <h1>부재 신청</h1>
          <button type="button" class="${styles.closeBtn} closeBtn">
            <img src="/src/img/close-x-svgrepo-com.svg" alt="닫기">
          </button>
          <form action="#" method="POST">
            <div class="${styles.formWrap}">
              <div class="${styles.formList}">
                <div class="${styles.label}">부재항목</div>
                <select name="reqType" class="${styles.reqType}">
                  <option value="">부재 항목 선택</option>
                  <option value="연차">연차</option>
                  <option value="오전반차">오전반차</option>
                  <option value="오후반차">오후반차</option>
                  <option value="외출">외출</option>
                  <option value="공가">공가</option>
                  <option value="병가">병가</option>
                </select>
              </div>
              <div class="${styles.formList}">
                <div class="${styles.label}">시작일시</div>
                <div class="${styles.dateTime}">
                  <input type="text" class="${styles.reqStartDate}" placeholder="yyyy-mm-dd">
                  <input type="text" class="${styles.reqStartTime}" placeholder="hh:mm">
                </div>
              </div>
              <div class="${styles.formList}">
                <div class="${styles.label}">종료일시</div>
                <div class="${styles.dateTime}">
                  <input type="text" class="${styles.reqEndDate}" placeholder="yyyy-mm-dd">
                  <input type="text" class="${styles.reqEndTime}" placeholder="hh:mm">
                </div>
              </div>
              <div class="${styles.formList}">
                <div class="${styles.label}">세부내용</div>
                <textarea name="reqContent" class="${styles.reqContent}"></textarea>
              </div>
            </div>
          </form>
          <button type="submit" class="${styles.submitBtn}">신청하기</button>
        </div>
      </div>
  
    </div>
  </div>
  `;
}

export const renderUserAbsenceList = (data) => {
  return data.length > 0 ? data.map((item) => `
    <tr>
      <td>${item.ABSENCE_REQUEST_DATE_TIME.split(' ')[0].slice(0, 10)}</td>
      <td>${item.ABSENCE_START_DATE_TIME} ~ ${item.ABSENCE_END_DATE_TIME}</td>
      <td>${item.ABSENCE_TYPE}</td>
      <td>${item.ABSENCE_DETAIL_CONTENT}</td>
    </tr> `
  ).join('')
  : `<tr><td colspan="4">등록된 부재 기록이 없습니다.</td></tr>`;
}

export default absenceRender;

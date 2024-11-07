import '../../../assets/css/buttons.css';
import styles from './userAbsence.module.css';
import { fetchUserAbsence } from './absenceFunc';

// 페이지 렌더링
const absenceRender = async () => {
  const { data } = await fetchUserAbsence();

  return `
    <h1 class="${styles.title}">부재 관리</h1>
  
    <div class="${styles.content}">
      
      <div class="${styles.absenceRequest}">
        <button id="absenceBtn" class="${styles.absenceBtn}">+ 부재 신청</button>
      </div>
  
      <section class="${styles.searchWrap}">
        <input type="text" id="searchTerm" class="${styles.searchInput}" placeholder="검색" />
        <select name="type" id="searchType" class="${styles.typeSelect}">
          <option value="">부재 항목 선택</option>
          <option value="연차">연차</option>
          <option value="오전반차">오전반차</option>
          <option value="오후반차">오후반차</option>
          <option value="외출">외출</option>
          <option value="공가">공가</option>
          <option value="병가">병가</option>
        </select>
        <button id="searchBtn" type="button" class="searchBtn">
          <img src="/src/assets/img/search-svgrepo-com.svg" alt="검색 아이콘" class="${styles.searchIcon}" />
        </button>
      </section>
  
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
      
      <nav id="pagination" class="${styles.pagination}">
      </nav>
  
      <section id="requestModal" class="${styles.modal}">
        <div id="modalBack" class="${styles.modalBack}"></div>
        <div class="${styles.modalPopup}">
          <h1>부재 신청</h1>
          <button type="button" id="closeBtn" class="${styles.closeBtn}">
            <img src="/src/assets/img/close-x-svgrepo-com.svg" alt="닫기" />
          </button>
          <form id="requestForm">
            <article class="${styles.formWrap}">
              <section class="${styles.formList}">
                <div class="${styles.label}">부재항목</div>
                <select name="reqType" id="reqType" class="${styles.reqType}">
                  <option value="">부재 항목 선택</option>
                  <option value="연차">연차</option>
                  <option value="오전반차">오전반차</option>
                  <option value="오후반차">오후반차</option>
                  <option value="외출">외출</option>
                  <option value="공가">공가</option>
                  <option value="병가">병가</option>
                </select>
              </section>
              <section class="${styles.formList}">
                <div class="${styles.label}">시작일시</div>
                <div class="${styles.dateTime}">
                  <input type="text" id="reqStartDate" class="${styles.reqStartDate}" placeholder="yyyy-mm-dd">
                  <input type="text" id="reqStartTime" class="${styles.reqStartTime}" placeholder="hh:mm">
                </div>
              </section>
              <section class="${styles.formList}">
                <div class="${styles.label}">종료일시</div>
                <div class="${styles.dateTime}">
                  <input type="text" id="reqEndDate" class="${styles.reqEndDate}" placeholder="yyyy-mm-dd">
                  <input type="text" id="reqEndTime" class="${styles.reqEndTime}" placeholder="hh:mm">
                </div>
              </section>
              <section class="${styles.formList}">
                <div class="${styles.label}">세부내용</div>
                <textarea name="reqContent" id="reqContent" class="${styles.reqContent}"></textarea>
              </section>
            </article>
          </form>
          <button type="submit" id="submitBtn" class="${styles.submitBtn}">신청하기</button>
        </div>
      </section>
  
    </div>
  `;
};

export const renderUserAbsenceList = (data) => {
  return data.length > 0
    ? data
        .map(
          (item) => `
    <tr>
      <td>${item.ABSENCE_REQUEST_DATE_TIME.split(' ')[0].slice(0, 10)}</td>
      <td>${item.ABSENCE_START_DATE_TIME} ~ ${item.ABSENCE_END_DATE_TIME}</td>
      <td>${item.ABSENCE_TYPE}</td>
      <td>${item.ABSENCE_DETAIL_CONTENT}</td>
    </tr> `
        )
        .join('')
    : `<tr><td colspan="4">등록된 부재 기록이 없습니다.</td></tr>`;
};

export default absenceRender;

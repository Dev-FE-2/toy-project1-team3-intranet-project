import '../../../assets/css/buttons.css'
import styles from './userAbsence.module.css';
import { renderUserAbsenceList } from './absenceRender';
import { apiRequest } from '../../../utils/apiUtils';

// 상수 정의
const DEFAULT_PAGE = 1;
const PAGE_SIZE = 10;

// 상태 관리 객체
const state = {
  userSn : localStorage.getItem('userSn'),
  currentSearchType : '',
  currentSearchTerm : '',
  currentPage : DEFAULT_PAGE,
}

/**
 * 부재 리스트 데이터 호출
 * @param {number} [page=DEFAULT_PAGE] - 현재 페이지 번호
 * @param {string} [searchType=''] - 부재 항목(선택사항)
 * @param {string} [searchTerm=''] - 검색어(선택사항)
 * @returns {object} page, size, totalCount, totalPage, data 반환
 */ 
export const fetchUserAbsence = async (page = DEFAULT_PAGE, searchType = '', searchTerm = '') => {
  const url = `/api/user/absence?userSn=${encodeURIComponent(state.userSn)}&page=${page}&searchType=${encodeURIComponent(searchType)}&searchTerm=${encodeURIComponent(searchTerm)}`;

  try {
    return await apiRequest(url, {method: 'GET'});
  } catch (error) {
    console.error('Error fetching items:', error);
    return { data: [], page, size: PAGE_SIZE, totalCount: 0, totalPage: 1 };
  }
}

/**
 * 부재 신청
 * @param {object} formData - 신청 폼에 입력된 데이터
 */ 
const requestAbsence =  async (formData) => {
  const url = `/api/user/absence/request`;

  try {
    const { message } = await apiRequest(url, {
      method: 'POST',
      body: formData
    });
      alert(message);
      window.location.href = '/user/absence';
  } catch (error) {
    console.error('Absence Request Error :', error);
    alert('부재 신청에 실패하였습니다.', error);
  }
}

/**
 * 페이지네이션 버튼 생성
 * @param {number} currentPage - 페이지 번호
 * @param {number} totalPages - 전체 페이지 수
 */ 
const pagination = (currentPage, totalPages) => {
  const pageButtons = [];
  const startPage = Math.max(currentPage - 5, 1);
  const endPage = Math.min(startPage + 9, totalPages);

  for (let i = startPage; i <= endPage; i++) {
    pageButtons.push(
      `<li class="${styles.pageBtn}">
         <button class="${i === currentPage ? `${styles.active} currentPage` : 'unSelectBtn'}">
           ${i}
         </button>
       </li>`
    );
  }

  return /* HTML */ `
    <ul class="${styles.pagination}">
      <li class="${styles.pageBtn}">
        <button class="first" ${currentPage === 1 ? 'disabled' : ''}>
          &lt;&lt;
        </button>
      </li>
      <li class="${styles.pageBtn}">
        <button class="prev" ${currentPage === 1 ? 'disabled' : ''}>
          &lt;
        </button>
      </li>
      ${pageButtons.join('')}
      <li class="${styles.pageBtn}">
        <button class="next" ${currentPage === totalPages ? 'disabled' : ''}>
          &gt;
        </button>
      </li>
      <li class="${styles.pageBtn}">
        <button class="last" ${currentPage === totalPages ? 'disabled' : ''}>
          &gt;&gt;
        </button>
      </li>
    </ul>
  `;
};

/**
 * 페이징 처리를 위한 함수
 * @param {number} totalPage - 데이터의 총 페이지 수
 */
const setupPagination = (totalPage) => {
  const paginationContainer = document.getElementById('pagination');
  paginationContainer.innerHTML = pagination(state.currentPage, totalPage);
};

/**
 * 페이지네이션 버튼 이벤트 핸들러
 * @param {event} event - 이벤트 객체
 * @param {number} totalPage - 데이터의 총 페이지 수
 */
const handlePagination = async (event, totalPage) => {
  const target = event.target;
  if (target.tagName !== 'BUTTON') return;

  let currentPage = state.currentPage;

  let newPage = currentPage;

  if (target.classList.contains('prev') && currentPage > 1) {
    newPage = currentPage - 1;
  } else if (target.classList.contains('next') && currentPage < totalPage) {
    newPage = currentPage + 1;
  } else if (target.classList.contains('first') && currentPage > 1) {
    newPage = 1;
  } else if (target.classList.contains('last') && currentPage < totalPage) {
    newPage = totalPage;
  } else {
    newPage = parseInt(target.innerText, 10);
  }

  if (newPage !== currentPage) {
    state.currentPage = newPage;
    await updateUserAbsenceList(newPage);
  }
};

/**
 * 출근관리 리스트 업데이트 함수
 * @param {number} [page=DEFAULT_PAGE] - 페이지 번호
 */
const updateUserAbsenceList = async (page = DEFAULT_PAGE) => {
  const { data, totalPage } = await fetchUserAbsence(page, state.currentSearchType, state.currentSearchTerm);

  // 출근관리 리스트 렌더링
  document.getElementById('absenceList').innerHTML = renderUserAbsenceList(data);

  // 페이지네이션 갱신
  setupPagination(totalPage, page);
};

// FormData 생성
const createFormData = () => {
  const reqStartDateTime = document.getElementById('reqStartDate').value + ' ' + document.getElementById('reqStartTime').value + ':00';
  const reqEndDateTime = document.getElementById('reqEndDate').value + ' ' + document.getElementById('reqEndTime').value + ':00';

  const formData = {
    reqType : document.getElementById('reqType').value,
    reqStartDateTime : reqStartDateTime,
    reqEndDateTime : reqEndDateTime,
    reqContent : document.getElementById('reqContent').value.trim(),
    userSn : state.userSn
  }

  return formData;
}

// 입력값 유효성 검사
const validate = () => {
  // yyyy-mm-dd 형식을 위한 정규 표현식
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  // hh:mm 형식을 위한 정규 표현식
  const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

  if (!document.getElementById('reqType').value) {
    alert('부재 항목을 선택해주세요');
    return false;
  }

  if (!datePattern.test(document.getElementById('reqStartDate').value)) {
    alert("부재 시작 날짜를 확인해주세요");
    return false;
  }

  if (!timePattern.test(document.getElementById('reqStartTime').value)) {
    alert("부재 시작 시간을 확인해주세요");
    return false;
  }

  if (!datePattern.test(document.getElementById('reqEndDate').value)) {
    alert("부재 종료 날짜를 확인해주세요");
    return false;
  }

    if (!timePattern.test(document.getElementById('reqEndTime').value)) {
    alert("부재 종료 시간을 확인해주세요");
    return false;
  }

  return true;
};

// 검색 처리 함수
const searchAbsences = async () => {
  state.currentSearchTerm = document.getElementById('searchTerm').value.toLowerCase();
  state.currentSearchType = document.getElementById('searchType').value;

  // 검색어에 맞는 데이터를 받아와 렌더링
  await updateUserAbsenceList();
};

// 신청폼 제출 처리
const handleSubmit = (event) => {
  event.preventDefault();

  const confirmMsg = '부재를 신청하시겠습니까?';

  // 입력 항목 유효성 검사
  if (validate() && confirm(confirmMsg)) {
    const formData = createFormData();
    requestAbsence(formData);
  }
}

// 이벤트 초기화
const initEventListener = (totalPage) => {
  // 신청 모달에서 신청하기 버튼
  document.getElementById('submitBtn').addEventListener('click', handleSubmit);

  // 페이지네이션 버튼
  document.getElementById('pagination').addEventListener('click', (event) => handlePagination(event, totalPage));

  // 검색 이벤트 리스너
  document.getElementById('searchBtn').addEventListener('click', searchAbsences);

  document.getElementById('searchTerm').addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      searchAbsences();
    }
  });

  const modal = document.getElementById('requestModal');

  // 부재 신청 버튼 클릭시 모달 열림
  document.getElementById('absenceBtn').addEventListener('click',function(){
    modal.style.display = 'block';
  });

  // 닫기 버튼 클릭시 모달 닫힘
  document.getElementById('closeBtn').addEventListener('click',function(){
      modal.style.display = 'none';
  });

  // 모달 바깥 배경 클릭시 모달 닫힘
  document.getElementById('modalBack').addEventListener('click',function(){
      modal.style.display = 'none';
  });

}

const absenceFunc = async () => {
  const { totalPage } = await fetchUserAbsence();
  
  // 첫 번째 페이지로 초기화
  setupPagination(totalPage);
  initEventListener(totalPage);  
};

export default absenceFunc;

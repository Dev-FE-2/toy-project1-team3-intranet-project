import styles from './userAbsence.module.css';
import { renderUserAbsenceList } from './absenceRender';

// const userSn = localStorage.getItem('userSn');
const userSn = 'USER_00000001'; // 테스트 데이터

let currentSearchType = '';
let currentSearchTerm = '';

export const fetchUserAbsence = async (page = 1, searchType = '', searchTerm = '', userInfo = userSn) => {
  const url = `/api/user/absence?userSn=${encodeURIComponent(userInfo)}&page=${page}&searchType=${encodeURIComponent(searchType)}&searchTerm=${encodeURIComponent(searchTerm)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch items');
    return await response.json();
  } catch (error) {
    console.error('Error fetching items:', error);
    return { data: [], page, size: 10, totalCount: 0, totalPage: 1 };
  }
}

const requestAbsence =  async (formData) => {
  const url = `/api/user/absence/request`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // JSON 형식으로 전송
      },
      body: JSON.stringify(Object.fromEntries(formData))
    });
    if (!response.ok) throw new Error('Failed to request absence');
    const result = await response.json();
    alert(result.message);
    window.location.href = '/user/absence';
  } catch (error) {
    console.error('Error request absence:', error);
  }
}

const pagination = (currentPage, totalPages) => {
  const pageButtons = [];
  const startPage = Math.max(currentPage - 5, 1);
  const endPage = Math.min(startPage + 9, totalPages);

  for (let i = startPage; i <= endPage; i++) {
    pageButtons.push(
      `<li class="${styles.pageBtn}">
         <button class="${i === currentPage ? `${styles.active} currentPage` : ''}">
           ${i}
         </button>
       </li>`
    );
  }

  return /* HTML */ `
    <ul class="${styles.pagination}">
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
    </ul>
  `;
};

/**
 * 페이징 처리를 위한 함수
 * @param {number} totalPage 데이터의 총 페이지 수
 * @param {number} currentPage 현재 페이지
 */
const setupPagination = (totalPage, currentPage = 1) => {
  const paginationContainer = document.getElementById('pagination');
  paginationContainer.innerHTML = pagination(currentPage, totalPage);
};

/**
 * 페이지네이션 버튼 이벤트 핸들러
 * @param {number} totalPage 데이터의 총 페이지 수
 */
const handlePagination = async (event, totalPage) => {
  const target = event.target;
  if (target.tagName !== 'BUTTON') return;

  let currentPage = parseInt(document.querySelector('.currentPage').innerText);

  let newPage = currentPage;

  if (target.classList.contains('prev') && currentPage > 1) {
    newPage = currentPage - 1;
  } else if (target.classList.contains('next') && currentPage < totalPage) {
    newPage = currentPage + 1;
  } else {
    newPage = parseInt(target.innerText, 10);
  }

  if (newPage !== currentPage) {
    currentPage = newPage;
    await updateUserAbsenceList(newPage);
  }
};

/**
 * 출근관리 리스트 업데이트 함수
 * @param {number} page 현재 페이지
 */
const updateUserAbsenceList = async (page = 1) => {
  const { data, totalPage } = await fetchUserAbsence(page, currentSearchType, currentSearchTerm);

  // 출근관리 리스트 렌더링
  document.getElementById('absenceList').innerHTML = renderUserAbsenceList(data);

  // 페이지네이션 갱신
  setupPagination(totalPage, page);
};

const absenceFunc = async () => {
  const modal = document.querySelector('.modal');
  const modalBack = document.querySelector('.modalBack');
  const modalOpen = document.getElementById('absenceBtn');
  const modalClose = document.querySelector('.closeBtn');
  const { totalPage } = await fetchUserAbsence();
  const searchTerm = document.getElementById('searchTerm');
  const searchType = document.getElementById('searchType');
  const searchBtn = document.getElementById('searchBtn');
  const paginationContainer = document.getElementById('pagination');
  const submitBtn = document.getElementById('submitBtn');
  const requestForm = document.querySelector('form');
  const reqType = document.querySelector('[name=reqType]');
  const reqStartDate = document.getElementById('reqStartDate');
  const reqStartTime = document.getElementById('reqStartTime');
  const reqEndDate = document.getElementById('reqEndDate');
  const reqEndTime = document.getElementById('reqEndTime');
  const reqContent = document.querySelector('[name=reqContent]');

  submitBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const confirmMsg = '부재를 신청하시겠습니까?';

    // 입력 항목 유효성 검사
    if (confirm(confirmMsg) && validate()) {
      const reqStartDateTime = reqStartDate.value + ' ' + reqStartTime.value + ':00';
      const reqEndDateTime = reqEndDate.value + ' ' + reqEndTime.value + ':00';

      const formData = new FormData();
      formData.append('reqType', reqType.value);
      formData.append('reqStartDateTime', reqStartDateTime);
      formData.append('reqEndDateTime', reqEndDateTime);
      formData.append('reqContent', reqContent.value.trim());
      formData.append('userSn', userSn);

      requestAbsence(formData);
    }
  })

  const validate = () => {
    // yyyy-mm-dd 형식을 위한 정규 표현식
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    // hh:mm 형식을 위한 정규 표현식
    const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (!reqType.value) {
      alert('부재 항목을 선택해주세요');
      return false;
    }

    if (!datePattern.test(reqStartDate.value)) {
      alert("부재 시작 날짜를 확인해주세요");
      return false;
    }

    if (!timePattern.test(reqStartTime.value)) {
      alert("부재 시작 시간을 확인해주세요");
      return false;
    }

    if (!datePattern.test(reqEndDate.value)) {
      alert("부재 종료 날짜를 확인해주세요");
      return false;
    }

      if (!timePattern.test(reqEndTime.value)) {
      alert("부재 종료 시간을 확인해주세요");
      return false;
    }

    // if (!reqContent.value.trim()) {
    //   alert('세부내용을 입력해주세요');
    //   return false;
    // }

    return true;
  };

  const searchWorks = async () => {
    currentSearchTerm = searchTerm.value.toLowerCase(); // 전역 변수에 검색어 저장
    currentSearchType = searchType.value;

    // 검색어에 맞는 데이터를 받아와 렌더링
    await updateUserAbsenceList();
  };

  // 첫 번째 페이지로 초기화
  setupPagination(totalPage, 1);

  // 페이지네이션 버튼 이벤트 리스너 추가
  paginationContainer.addEventListener('click', (event) =>
    handlePagination(event, totalPage)
  );

  // 검색 이벤트 리스너
  searchBtn.addEventListener('click', searchWorks);

  searchTerm.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      searchWorks();
    }
  });

  modalOpen.addEventListener('click',function(){
    //display 속성을 block로 변경
    modal.style.display = 'block';
  });
  //닫기 버튼을 눌렀을 때 모달팝업이 닫힘
  modalClose.addEventListener('click',function(){
    //display 속성을 none으로 변경
      modal.style.display = 'none';
  });
  modalBack.addEventListener('click',function(){
    //display 속성을 none으로 변경
      modal.style.display = 'none';
  });
};



export default absenceFunc;

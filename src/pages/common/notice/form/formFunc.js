import { apiRequest } from '../../../../utils/apiUtils';

const FORM_MODE = {
  INSERT: 'insert',
  UPDATE: 'update',
};

// 이미지 용량 제한
const MB = 1024 * 1024;
const maxFileSize = 2 * MB;

// 게시글 수정 시 이미지 삭제 여부 변수
let deleteImage = false;

// 파일 변경 시 처리
const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file && file.size > maxFileSize) {
    alert(`이미지 파일 크기는 ${maxFileSize / MB}MB 이하로 업로드해주세요.`);
    e.target.value = '';
    return;
  }
  document.querySelector('#fileName').value = file ? file.name : '';
  deleteImage = false;
};

// 이미지 삭제 버튼 클릭 시 처리
const handleImageDelete = () => {
  document.querySelector('[name=image]').value = '';
  document.querySelector('#fileName').value = '';
  deleteImage = true;
};

// 폼 제출 시 처리
const handleSubmit = (e) => {
  e.preventDefault();

  const mode = document.querySelector('#noticeSn')
    ? FORM_MODE.UPDATE
    : FORM_MODE.INSERT;

  const confirmMsg =
    mode === FORM_MODE.INSERT
      ? '게시글을 등록하시겠습니까?'
      : '게시글을 수정하시겠습니까?';
  if (confirm(confirmMsg) && validateForm()) {
    const formData = createFormData();
    uploadNotice(formData, mode);
  }
};

// 입력값 유효성 검사
const validateForm = () => {
  const title = document.querySelector('[name=title]');
  const content = document.querySelector('[name=content]');
  if (!title.value.trim()) {
    alert('제목을 입력해주세요');
    title.focus();
    return false;
  }
  if (!content.value.trim()) {
    alert('내용을 입력해주세요');
    content.focus();
    return false;
  }
  return true;
};

// FormData 생성
const createFormData = () => {
  const formData = new FormData();
  formData.append('title', document.querySelector('[name=title]').value);
  formData.append('content', document.querySelector('[name=content]').value);
  formData.append('userSn', localStorage.getItem('userSn'));

  if (deleteImage) {
    formData.append('deleteImage', 'true');
  } else if (document.querySelector('[name=image]').files.length > 0) {
    const file = document.querySelector('[name=image]').files[0];
    formData.append('image', file);
    formData.append('imageName', file.name);
  }
  return formData;
};

// 공지사항 업로드
const uploadNotice = async (formData, mode) => {
  const noticeSn = document.querySelector('#noticeSn')?.value || '';
  const url = `/api/admin/notice${mode === FORM_MODE.UPDATE ? `/${noticeSn}` : ''}`;
  const method = mode === FORM_MODE.INSERT ? 'POST' : 'PUT';
  const redirectUrl =
    mode === FORM_MODE.INSERT
      ? '/admin/notice'
      : `/admin/notice/view/${noticeSn}`;

  try {
    const response = await apiRequest(url, {
      method,
      body: formData,
    });
    alert(response.message);
    window.location.href = redirectUrl;
  } catch (error) {
    console.error('Error uploading notice:', error);
    alert('게시글 업로드에 실패하였습니다.', error);
  }
};

// 이벤트 초기화
const initEventListeners = () => {
  document
    .querySelector('#uploadForm')
    .addEventListener('submit', handleSubmit);
  document
    .querySelector('[name=image]')
    .addEventListener('change', handleFileChange);
  document
    .querySelector('#deleteBtn')
    .addEventListener('click', handleImageDelete);
  document
    .querySelector('#backBtn')
    .addEventListener('click', () => history.back());
};

const formFunc = async () => {
  if (!document.querySelector('#noticeSn')) {
    // insert에서 textarea 태그 내 여백 제거
    document.querySelector('[name=content]').value = '';
  }
  initEventListeners();
};

export default formFunc;

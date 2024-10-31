// 기능 추가

const formFunc = async () => {
  // 등록인지 수정인지 체크하는 상수 객체
  const FORM_MODE = {
    INSERT: 'insert',
    UPDATE: 'update',
  };

  const mode = document.getElementById('noticeSn')
    ? FORM_MODE.UPDATE
    : FORM_MODE.INSERT;

  const MB = 1024 * 1024;
  const maxFileSize = 2 * MB; // 2mb를 최대로 제한
  let deleteImage = false; // 이미지 삭제 했는지 체크하는 변수

  const title = document.querySelector('[name=title]');
  const content = document.querySelector('[name=content]');
  const fileInput = document.querySelector('[name=image]');
  const fileNameInput = document.getElementById('fileName');
  const form = document.getElementById('uploadForm');
  const deleteBtn = document.getElementById('deleteBtn');
  const backBtn = document.getElementById('backBtn');

  const validate = () => {
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

  const uploadNotice = async (formData) => {
    let url = '/api/admin/notice';
    let method = '';
    let redirectUrl = '';
    if (mode === FORM_MODE.INSERT) {
      method = 'POST';
      redirectUrl = '/admin/notice';
    } else {
      const noticeSn = document.getElementById('noticeSn').value;
      url += `/${noticeSn}`;
      method = 'PUT';
      redirectUrl = `/admin/notice/view/${noticeSn}`;
    }

    try {
      const response = await fetch(url, {
        method: method,
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to upload notice');
      const result = await response.json();
      alert(result.message);
      window.location.href = redirectUrl;
    } catch (error) {
      console.error('Error upload notice:', error);
    }
  };

  // 이미지 첨부 후 처리 함수
  const onAttachImage = (file) => {
    if (file) {
      // 파일 이름 등록
      fileNameInput.value = file.name;
    } else {
      fileNameInput.value = '';
    }
    deleteImage = false;
  };

  // 이미지 삭제 후 처리 함수
  const onDeleteImage = () => {
    fileInput.value = '';
    fileNameInput.value = '';
    deleteImage = true;
  };

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    // 파일 크기 확인
    if (file.size > maxFileSize) {
      alert(`이미지 파일 크기는 ${maxFileSize / MB}MB 이하로 업로드해주세요.`);
      fileInput.value = '';
      return;
    }

    onAttachImage(file);
  });

  // 이미지 삭제 버튼
  deleteBtn.addEventListener('click', () => {
    onDeleteImage();
  });

  backBtn.addEventListener('click', () => {
    history.back();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const confirmMsg =
      mode === FORM_MODE.INSERT
        ? '게시글을 등록하시겠습니까?'
        : '게시글을 수정하시겠습니까?';

    // 입력 항목 유효성 검사
    if (confirm(confirmMsg) && validate()) {
      const formData = new FormData();
      formData.append('title', title.value);
      formData.append('content', content.value);
      formData.append('userSn', localStorage.getItem('userSn'));

      if (deleteImage) {
        formData.append('deleteImage', 'true');
      } else if (fileInput.files.length > 0) {
        formData.append('image', fileInput.files[0]);
        formData.append('imageName', fileInput.files[0].name);
      }

      uploadNotice(formData);
    }
  });
};

export default formFunc;

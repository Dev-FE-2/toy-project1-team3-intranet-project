import { apiRequest } from '../../../../utils/apiUtils';

// 공지 상세 데이터를 가져오는 함수
export const getNoticeById = async (serialNumber) => {
  try {
    return await apiRequest(`/api/common/notice/${serialNumber}`);
  } catch (error) {
    console.error('Error fetching notice:', error);
    return null;
  }
};

// 공지 상세 데이터를 삭제하는 함수
const deleteNoticeById = async (serialNumber) => {
  try {
    return await apiRequest(`/api/admin/notice/${serialNumber}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('Error delete notice:', error);
    return { error: '게시글 삭제에 실패하였습니다.' };
  }
};

const viewFunc = () => {
  const path = window.location.pathname;
  const deleteBtn = document.querySelector('#deleteBtn');
  if (!deleteBtn) return;

  deleteBtn.addEventListener('click', async () => {
    const confirmDelete = confirm('게시글을 삭제하시겠습니까?');
    if (!confirmDelete) return;

    const noticeSn = document.querySelector('#noticeSn').value;
    const res = await deleteNoticeById(noticeSn);

    if (res && res?.status === 'OK') {
      alert(res.message);
      window.location.href = path.slice(0, path.indexOf('/view'));
    } else {
      alert(res.error);
    }
  });
};

export default viewFunc;

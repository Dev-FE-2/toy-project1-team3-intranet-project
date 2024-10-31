// 기능 추가

// 공지 상세 데이터를 가져오는 함수
export const getNoticeById = async (serialNumber) => {
  try {
    const response = await fetch(`/api/common/notice/${serialNumber}`);
    if (!response.ok) throw new Error('Failed to fetch notice');
    return await response.json();
  } catch (error) {
    console.error('Error fetching notice:', error);
    return null;
  }
};

// 공지 상세 데이터를 삭제하는 함수
const deleteNoticeById = async (serialNumber) => {
  try {
    const response = await fetch(`/api/admin/notice/${serialNumber}`, {
      method: 'DELETE',
      body: { serialNumber },
    });
    if (!response.ok) throw new Error('Failed to delete notice');
    return await response.json();
  } catch (error) {
    console.error('Error delete notice:', error);
    return null;
  }
};

const viewFunc = () => {
  const path = window.location.pathname;
  const deleteBtn = document.getElementById('deleteBtn');

  if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
      if (confirm('게시글을 삭제하시겠습니까?')) {
        deleteNoticeById(document.getElementById('noticeSn').value)
          .then((res) => {
            if (res.status === 'OK') {
              alert(res.message);
              window.location.href = path.slice(0, path.indexOf('/view'));
            }
          })
          .catch((error) => {
            console.error(error);
            alert(error.error);
          });
      }
    });
  }
};

export default viewFunc;

const userSn = localStorage.getItem('userSn');
// const userSn = 'USER_00000001'; // 테스트용

export const fetchWorks = async (userInfo = userSn, page = 1, searchTerm = '') => {
  const url = `/api/user/work?userSn=${encodeURIComponent(userInfo)}&page=${page}&search=${encodeURIComponent(searchTerm)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch items');
    return await response.json();
  } catch (error) {
    console.error('Error fetching items:', error);
    return { data: [], page, size: 10, totalCount: 0, totalPage: 1 };
  }
}

const workFunc = async () => {
  const pagination = document.getElementById('pagination');
};

export default workFunc;

// 기능 추가
const userListFunc = async () => {
  const title = document.querySelector('#title');

  const changeLink = () => (location.href = '/profile');

  title.addEventListener('click', changeLink);
};

export default userListFunc;

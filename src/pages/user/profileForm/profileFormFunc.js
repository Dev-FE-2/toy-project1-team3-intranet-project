// 기능 추가
const profileFormFunc = async () => {
  const title = document.querySelector('#title');

  const changeLink = () => (location.href = '/signUp');

  title.addEventListener('click', changeLink);
};

export default profileFormFunc;

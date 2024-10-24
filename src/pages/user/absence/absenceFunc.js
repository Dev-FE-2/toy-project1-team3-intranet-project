// 기능 추가
const absenceFunc = async () => {
  const title = document.querySelector('#title');

  const changeLink = () => (location.href = '/user/absence');

  title.addEventListener('click', changeLink);
};

export default absenceFunc;

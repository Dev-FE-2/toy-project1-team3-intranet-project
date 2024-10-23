// 기능 추가
const absenceFunc = async () => {
  const title = document.querySelector('#title');

  const changeLink = () => (location.href = '/admin/absence');

  title.addEventListener('click', changeLink);
};

export default absenceFunc;

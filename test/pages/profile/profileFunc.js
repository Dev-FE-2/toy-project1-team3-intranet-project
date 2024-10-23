// 기능 추가
const profileFunc = async () => {
  const title = document.querySelector('#title');

  const aleartTest = () => alert('테스트');

  title.addEventListener('click', aleartTest);
};

export default profileFunc;

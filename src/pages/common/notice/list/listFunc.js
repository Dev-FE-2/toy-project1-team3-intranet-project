// 기능 추가
const listFunc = async () => {
  const curPath = window.location.pathname;
  const listItems = document.querySelectorAll('[data-item-id]');

  listItems.forEach((item) => {
    item.addEventListener('click', () => {
      // window.location.href = `${curPath}/view/${item.dataset.itemId}`;
      window.location.href = `${curPath}/view`;
    });
  });
};

export default listFunc;

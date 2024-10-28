const layoutInit = () => {
  const menu = document.querySelector('#menu');
  const navigate = document.querySelector('#navigate');
  menu.addEventListener('click', () => navigate.classList.toggle('hidden'));
};

export default layoutInit;

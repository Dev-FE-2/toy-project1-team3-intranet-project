const layoutInit = () => {
  const menu = document.querySelector('#menu');
  const navigate = document.querySelector('#navigate');
  const navSignOutBtn = document.querySelector('#navSignOutBtn');
  const headSignOutBtn = document.querySelector('#headSignOutBtn');

  const openModal = () => {
    if (menu) {
      navigate.classList.remove('mobile-hidden');
    }
  };

  const closeModal = ({ target }) => {
    if (target === navigate) {
      navigate.classList.add('mobile-hidden');
    }
  };

  const signOut = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      window.localStorage.removeItem('userSn');
      window.localStorage.removeItem('userGrade');

      window.location.replace('/'); // 로그인 페이지로 리다이렉트
    }
  };

  menu.addEventListener('click', openModal);
  navigate.addEventListener('click', closeModal);
  navSignOutBtn.addEventListener('click', signOut);
  headSignOutBtn.addEventListener('click', signOut);
};

export default layoutInit;

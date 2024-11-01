const layoutInit = () => {
  const menu = document.querySelector('#menu');
  const navigate = document.querySelector('#navigate');
  const signOutBtn = document.querySelector('#signOutBtn');
  if (menu) {
    menu.addEventListener('click', () => navigate.classList.toggle('hidden'));
  }

  if (signOutBtn) {
    signOutBtn.addEventListener('click', () => {
      if (confirm('로그아웃 하시겠습니까?')) {
        window.localStorage.removeItem('userSn');
        window.localStorage.removeItem('userGrade');

        window.location.replace('/'); // 로그인 페이지로 리다이렉트
      }
    });
  }
};

export default layoutInit;

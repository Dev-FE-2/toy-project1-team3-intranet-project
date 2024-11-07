const layoutInit = () => {
  const path = window.location.pathname;
  const menu = document.querySelector('#menu');
  const navigate = document.querySelector('#navigate');
  const navSignOutBtn = document.querySelector('#navSignOutBtn');
  const headSignOutBtn = document.querySelector('#headSignOutBtn');
  const intranetTitle = document.querySelector('#intranetTitle');

  const routes = {
    '/admin/absence': '부재관리',
    '/admin/notice': '기업공지 관리',
    '/admin/notice/view/:noticeSn': '기업공지 상세',
    '/admin/notice/insert': '기업공지 등록',
    '/admin/notice/update/:noticeSn': '기업공지 수정',
    '/admin/userList': '직원관리',
    '/admin/user/:userSn': '직원 프로필 관리',
    '/admin/user/profileForm/:userSn': '직원 프로필 수정',

    //user
    '/user/absence': '부재관리',
    '/user/notice': '기업공지',
    '/user/notice/view': '기업공지 상세',
    '/user/profile': '프로필',
    '/user/profile/profileForm': '프로필 수정',
    '/user/work': '출근관리',
    '/user/attendance': '출결신청',
  };

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

  const matchRoute = (path, routes) => {
    for (const route in routes) {
      const routeRegex = new RegExp(`^${route.replace(/:\w+/g, '(\\w+)')}$`);
      const match = path.match(routeRegex);
      if (match) {
        return routes[route];
      }
    }
    return null;
  };

  if (navigate) {
    menu.addEventListener('click', openModal);
    navigate.addEventListener('click', closeModal);
    navSignOutBtn.addEventListener('click', signOut);
    headSignOutBtn.addEventListener('click', signOut);
    intranetTitle.textContent = matchRoute(path, routes);
  }
};

export default layoutInit;

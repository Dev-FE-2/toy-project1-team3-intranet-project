import style from './layout.module.css';
import './style.css';
const Layout = (children) => {
  const path = window.location.pathname;
  const userGrade = window.localStorage.getItem('userGrade');
  const styler = (url) => {
    return path.match(url) ? style.ableLink : style.disableLink;
  };
  const navigate = () => {
    if (userGrade === '0') {
      // 사용자의 권한이 관리자일 경우
      return `
    <a href="/admin/userList" class="${styler('/admin/userList')}">
      <img src="/src/assets/img/bag_icon.svg" />
      직원관리
    </a>
    <a href="/admin/absence" class="${styler('/admin/absence')}">
      <img src="/src/assets/img/clipboard_icon.svg" />
      부재관리
    </a>
    <a href="/admin/notice" class="${styler('/admin/notice')}">
      <img src="/src/assets/img/calendar_icon.svg" />
      공지사항
    </a>`;
    } else if (userGrade === '1') {
      // 사용자의 권한이 임직원일 경우
      return `
      <a href="/user/attendance" class="${styler('/user/attendance')}">
        <img src="/src/assets/img/check_icon.svg" />
        출결신청
      </a>
      <a href="/user/work" class="${styler('/user/work')}">
        <img src="/src/assets/img/package_icon.svg" />
        출근관리
      </a>
      <a href="/user/absence" class="${styler('/user/absence')}">
        <img src="/src/assets/img/clipboard_icon.svg" />
        부재관리
      </a>
      <a href="/user/notice" class="${styler('/user/notice')}">
        <img src="/src/assets/img/calendar_icon.svg" />
        공지사항
      </a>
      <a href="/user/profile" class="${styler('/user/profile')}">
        <img src="/src/assets/img/bag_icon.svg" />
        프로필
      </a>
    `;
    }
  };

  return /* HTML */ `
    <div class="${style.layout}">
      <nav id="navigate" class="${style.navigate} mobile-hidden">
        <div class="${style.navBox}">
          <h1 class="title">인트라넷</h1>
          <div class="${style.shortCut}">${navigate()}</div>
          <button
            type="button"
            class="${style.signOutBtn} ${style.navSignOut}"
            id="navSignOutBtn"
            title="로그아웃"
          >
            로그아웃
          </button>
        </div>
      </nav>
      <div class="${style.container}">
        <header class="${style.header}">
          <h2 id="intranetTitle" class="pageName"></h2>
          <button type="button" id="menu" class="${style.hamburger}"></button>
          <button
            type="button"
            class="${style.signOutBtn} ${style.headSignOut}"
            id="headSignOutBtn"
            title="로그아웃"
          >
            로그아웃
          </button>
        </header>
        <main class="${style.mainContent}">
          <div class="${style.contentBox}">${children}</div>
        </main>
      </div>
    </div>
  `;
};

export default Layout;

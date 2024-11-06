import style from './layout.module.css';
import './style.css';
const Layout = (children) => {
  const userGrade = window.localStorage.getItem('userGrade');

  const navigate = () => {
    if (userGrade === '0') {
      // 사용자의 권한이 관리자일 경우
      return `
    <a href="/admin/userList">직원관리</a>
    <a href="/admin/absence">부재관리</a>
    <a href="/admin/notice">공지사항</a>`;
    } else if (userGrade === '1') {
      // 사용자의 권한이 임직원일 경우
      return `
    <a href="/user/workOn">출결신청</a>
    <a href="/user/work">출근관리</a>
    <a href="/user/absence">부재관리</a>
    <a href="/user/notice">공지사항</a>
    <a href="/user/profile">프로필</a>`;
    }
  };

  return /* HTML */ `
    <div class="${style.layout}">
      <nav id="navigate" class="${style.navigate} mobile-hidden">
        <div class="${style.navBox}">
          <h1 class="title">인트라넷</h1>
          <div class="${style.shortCut}">
            <a>출결신청</a>
            <a>출결신청</a>
            <a>출결신청</a>
          </div>
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
          <h2 class="pageName">페이지 이름</h2>
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
        <div class="${style.mainContent}">${children}</div>
      </div>
    </div>
  `;
};

export default Layout;

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
      <header class="${style.header}">
        <button type="button" id="menu" class="${style.hamburger}"></button>
        ${navigate()}
        <div class="${style.headerRightWrap}">
          <h1>인트라넷</h1>
          <button
            type="button"
            class="${style.signOutBtn}"
            id="signOutBtn"
            title="로그아웃"
          >
            로그아웃
          </button>
        </div>
        <nav id="navigate" class="${style.navigate} hidden">
          <div class="${style.shortCut}">${navigate()}</div>
        </nav>
      </header>
      ${children}
    </div>
  `;
};

export default Layout;

import style from './layout.module.css';
import './style.css';
const Layout = (children) => {
  const path = window.location.pathname;
  const shortCut = path.includes('user')
    ? `
      <a href="#">출결신청</a>
      <a href="#">출근관리</a>
      <a href="#">부재관리</a>
      <a href="#">공지사항</a>
      <a href="#">프로필</a>`
    : `
      <a href="#">직원관리</a>
      <a href="#">부재관리</a>
      <a href="#">공지사항</a>`;

  return `
    <div class="${style.layout}">
      <header class="${style.header}">
        <button type="button" id="menu" class="${style.hamburger}"></button>
          ${shortCut}
        <h1>인트라넷</h1>
        <nav id="navigate" class="${style.navigate} hidden">
          <div class="${style.shortCut}">
            ${shortCut}
          </div>
        </nav>
      </header>
      ${children}
    </div>
    `;
};

export default Layout;

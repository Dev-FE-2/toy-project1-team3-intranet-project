import './reset.css';
import router from './router/router';
import './style.css';

const initApp = async () => {
  popState();
  router();
};

// 앞으로가기, 뒤로가기 동작시 앱 바인딩
const popState = () => {
  window.addEventListener('popstate', router());
};

// 페이지 새롭게 로드시 앱 바인딩
document.addEventListener('DOMContentLoaded', initApp);

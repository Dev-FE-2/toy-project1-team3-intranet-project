import routes from './routes';

const router = async () => {
  const app = document.querySelector('#app');
  const path = window.location.pathname;

  const { render, init } = routes[path];

  // 페이지 렌더링
  app.innerHTML = await render();

  // 이벤트 리스너 추가 실행
  init();
};

export default router;

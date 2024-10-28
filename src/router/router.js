import Layout from '../components/layout/layout';
import layoutInit from '../components/layout/layoutInit';
import routes from './routes';

const router = async () => {
  const app = document.querySelector('#app');
  const path = window.location.pathname;

  const { render, init } = routes[path];

  // 페이지 렌더링
  app.innerHTML =
    path.includes('user') || path.includes('admin')
      ? Layout(render())
      : render();

  // 이벤트 리스너 추가 실행
  init();
  layoutInit();
};

export default router;

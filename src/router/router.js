import Layout from '../components/layout/layout';
import layoutInit from '../components/layout/layoutInit';
import routes from './routes';

const router = async () => {
  const app = document.querySelector('#app');
  const path = window.location.pathname;
  const userGrade = localStorage.getItem('userGrade');

  // 경로 매칭 및 파라미터 가져오기
  const matchedRoute = matchRoute(path);

  if (!matchedRoute) {
    app.innerHTML = '<h1>Page Not Found</h1>';
    return;
  }

  const { render, init, async, grade } = matchedRoute.route || {};
  // const params = matchedRoute.params;

  if (path !== '/' && path !== '/signUp') {
    // 권한 확인 후 접근 제한
    if (Number(grade) !== Number(userGrade)) {
      alert('로그인이 필요합니다');
      window.location.replace('/');
      return;
    }
  }

  // 페이지 렌더링
  app.innerHTML =
    path.includes('user') || path.includes('admin')
      ? Layout(async ? await render() : render()) // 비동기 여부에 따라 await 사용
      : render();

  // 이벤트 리스너 추가 실행
  init();
  layoutInit();
};

// 동적 경로 매칭 함수
const matchRoute = (path) => {
  for (const route in routes) {
    const routeRegex = new RegExp(`^${route.replace(/:\w+/g, '(\\w+)')}$`);
    const match = path.match(routeRegex);

    if (match) {
      // 첫 번째 매칭 요소는 경로 전체, 이후는 매개변수
      const params =
        route.match(/:\w+/g)?.map((param, idx) => ({
          [param.slice(1)]: match[idx + 1],
        })) || [];

      return { route: routes[route], params: Object.assign({}, ...params) };
    }
  }
  return null;
};

export default router;

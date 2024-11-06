/**
 * 프로젝트 내 프론트 전역에서 쓰이는 로더(스피너)
 */
class Loader {
  constructor() {
    // 로딩 UI 요소 생성
    this.loaderElement = document.createElement('div');
    this.loaderElement.id = 'loader';

    // 로딩 UI 요소를 body에 추가
    document.body.appendChild(this.loaderElement);
  }

  // 로더 표시
  show() {
    this.loaderElement.style.display = 'block';
  }

  // 로더 숨김
  hide() {
    this.loaderElement.style.display = 'none';
  }
}

export default Loader;

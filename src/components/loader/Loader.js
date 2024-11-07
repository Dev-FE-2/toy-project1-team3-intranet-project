/**
 * 프로젝트 내 프론트 전역에서 쓰이는 로더(스피너)
 */
class Loader {
  constructor() {
    // 로딩 UI 요소 생성
    this.loaderWrapEl = document.createElement('div');
    this.loaderWrapEl.id = 'loaderWrap';
    this.loaderEl = document.createElement('div');
    this.loaderEl.id = 'loader';

    this.loaderWrapEl.appendChild(this.loaderEl);

    // 로딩 UI 요소를 body에 추가
    document.body.appendChild(this.loaderWrapEl);
  }

  // 로더 표시
  show() {
    this.loaderWrapEl.style.display = 'block';
  }

  // 로더 숨김
  hide() {
    this.loaderWrapEl.style.display = 'none';
  }
}

export default Loader;

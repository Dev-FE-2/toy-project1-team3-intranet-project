import style from './signIn.module.css';

// 페이지 렌더링
const signInRender = () => `
    <main class="${style.container}">
      <div class="${style.loginBox}">
        <h1>로그인</h1>
        <form id="loginForm" class=${style.loginForm}>
          <label for="id">
            <span>아이디</span>
            <input
              type="text"
              id="id"
              name="id"
              placeholder="아이디를 입력해주세요."
              required
            />
          </label>
          <label for="pw">
            <span>비밀번호</span>
            <input
              type="password"
              id="pw"
              name="pw"
              placeholder="비밀번호를 입력해주세요."
              required
            />
          </label>
          <div class=${style.buttonBox}>
            <button type="button" class="signUp">회원가입</button>
            <div>
              <button type="submit" class="signIn">로그인</button>
            </div>
          </div>
        </form>
      </div>
    </main>
  `;

export default signInRender;

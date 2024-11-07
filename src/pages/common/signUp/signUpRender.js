import '../../../assets/css/buttons.css';
import style from './signUp.module.css';

const signUpRender = () => `
    <div class="${style.signUpBox}">
      <h1>회원가입</h1>
      <form onsubmit="return false;">
        <!-- 아이디 입력 라벨 -->
        <label for="id">
          <span>아이디</span>
          <div>
            <input
              type="text"
              name="id"
              id="id"
              placeholder="아이디(필수)"
            />
            <button id="duplcate" type="button">중복확인</button>
          </div>
        </label>

        <!-- 비밀번호 입력 라벨 -->
        <label for="pw">
          <span>비밀번호</span>
          <input
            type="password"
            name="pw"
            id="pw"
            placeholder="비밀번호(필수)"
          />
        </label>

        <!-- 비밀번호 확인 라벨 -->
        <label for="confirmPw">
          <span>비밀번호 확인</span>
          <input
            type="password"
            name="confirmPw"
            id="confirmPw"
            placeholder="비밀번호 확인(필수)"
          />
        </label>

        <!-- 이름 라벨 -->
        <label for="name">
          <span>이름</span>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="이름(필수)"
          />
        </label>

        <!-- 연락처 라벨 -->
        <label for="phone">
          <span>연락처</span>
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="휴대폰번호 11자리"
          />
        </label>

        <!-- 이메일 라벨 -->
        <label for="email">
          <span>이메일</span>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="이메일주소(필수)"
          />
        </label>

        <!-- 권한 라벨 -->
        <label for="grade">
          <span>권한</span>
          <select name="grade" id="grade">
            <optgroup label="관리자 / 임직원">
              <option value="0">관리자</option>
              <option value="1">임직원</option>
            </optgroup>
          </select>
        </label>

        <div class="${style.submitBox}">
          <button type="submit">회원가입</button>
        </div>
      </form>
    </div>
  `;

export default signUpRender;

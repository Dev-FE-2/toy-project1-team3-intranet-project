// 기능 추가
const signUpFunc = () => {
  const id = document.getElementById('id');
  const pw = document.getElementById('pw');
  const confirmPw = document.getElementById('confirmPw');
  const name = document.getElementById('name');
  const phone = document.getElementById('phone');
  const email = document.getElementById('email');
  const grade = document.getElementById('grade');

  const idPattern = new RegExp(/^[a-zA-Z][0-9a-zA-Z]{,16}$/);
  const pwPattern = new RegExp(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{7,17}$/
  );
  const emailPattern = new RegExp(/[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/);
  const phonePattern = new RegExp(/^\d{3}-?\d{3,4}-?\d{4}$/);
  const namePattern = new RegExp(/^[ㄱ-ㅎ|가-힣]+$/);
};

export default signUpFunc;

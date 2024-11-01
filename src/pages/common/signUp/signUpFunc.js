import axios from 'axios';

const signUpFunc = () => {
  // 상태관리용 변수
  let verify = false;

  // 이벤트 동작에 필요한 돔 선택
  const id = document.getElementById('id');
  const pw = document.getElementById('pw');
  const confirmPw = document.getElementById('confirmPw');
  const name = document.getElementById('name');
  const phone = document.getElementById('phone');
  const email = document.getElementById('email');
  const grade = document.getElementById('grade');
  const button = document.querySelector('button[type="button"]');
  const submit = document.querySelector('button[type="submit"]');

  // 정규표현식
  const pattern = {
    id: new RegExp(/^[a-zA-Z][a-zA-Z0-9-_]{5,30}$/),
    pw: new RegExp(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/
    ),
    email: new RegExp(/[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/),
    phone: new RegExp(/^\d{3}-\d{3,4}-\d{4}$/),
    name: new RegExp(/^[가-힣]+$/),
  };

  const createUser = async (body) => {
    try {
      const response = await axios.post('/api/user/signup', body);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  };

  const verification = async (body) => {
    try {
      const response = await axios.post('/api/user/signup/verify', body);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  };

  const getUserSn = async () => {
    try {
      const response = await axios.get('/api/user/signup');
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  };

  const getUserList = async () => {
    try {
      const response = await axios.get('/api/user/signup/verify');
      console.log(response);
    } catch (error) {
      throw new Error(error);
    }
  };

  const inputValdation = (id, pw, confirmPw, name, phone, email) => {
    if (!pattern['id'].test(id)) {
      return '아이디는 영문자, 숫자를 포함한 5~30자여야 합니다.';
    }
    if (!verify) {
      return '아이디 중복검사가 필요합니다.';
    }
    if (!pattern['pw'].test(pw)) {
      return '비밀번호는 영문자, 숫자, 특수문자를 포함한 8~16자여야 합니다.';
    }
    if (pw !== confirmPw) {
      return '비밀번호가 일치하지 않습니다.';
    }
    if (!pattern['name'].test(name)) {
      return '이름은 한글로만 입력해야 합니다.';
    }
    if (!pattern['phone'].test(phone)) {
      return '전화번호 형식이 올바르지 않습니다.';
    }
    if (!pattern['email'].test(email)) {
      return '이메일 형식이 올바르지 않습니다.';
    }
    return null;
  };

  id.addEventListener('change', () => (verify = false));

  button.addEventListener('click', async () => {
    const params = { id: id.value };
    if (id.value) {
      const { data } = await verification(params);
      verify = data;
      alert(verify ? '사용 가능한 아이디입니다.' : '중복된 아이디입니다.');
    } else {
      alert('아이디를 입력 해주세요.');
    }
    getUserList();
  });

  submit.addEventListener('click', async (e) => {
    e.preventDefault();

    // 입력 항목 규칙 검증
    const errorMessage = inputValdation(
      id.value,
      pw.value,
      confirmPw.value,
      name.value,
      phone.value,
      email.value
    );

    if (errorMessage) {
      alert(errorMessage);
    } else {
      const USER_SERIAL_NUMBER = await getUserSn();
      const params = {
        USER_SERIAL_NUMBER: USER_SERIAL_NUMBER['data'],
        USER_ID: id.value,
        USER_PW: pw.value,
        USER_GRADE: grade.value,
        USER_NAME: name.value,
        USER_PHONE_NUMBER: phone.value,
        USER_EMAIL: email.value,
      };

      createUser(params).then((res) => {
        if (res.status === 'OK') {
          alert('회원가입이 완료되었습니다.');
          window.location.replace('/');
        }
      });
    }
  });
};

export default signUpFunc;

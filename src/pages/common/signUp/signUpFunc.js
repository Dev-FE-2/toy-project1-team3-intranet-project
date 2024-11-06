import axios from 'axios';

// 입력항목 제한을 위한 정규표현식
const PATTERN = {
  id: /^[a-zA-Z][a-zA-Z0-9-_]{5,30}$/,
  pw: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/,
  email: /[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/,
  phone: /^\d{3}-\d{3,4}-\d{4}$/,
  name: /^[가-힣]+$/,
};

// 사용자 동작에 따른 알림 메시지 객체
const MESSAGE = {
  invalidId: '아이디는 영문자, 숫자를 포함한 5~30자여야 합니다.',
  idCheckNeeded: '아이디 중복검사가 필요합니다.',
  invalidPw: '비밀번호는 영문자, 숫자, 특수문자를 포함한 8~16자여야 합니다.',
  pwMismatch: '비밀번호가 일치하지 않습니다.',
  invalidName: '이름은 한글로만 입력해야 합니다.',
  invalidPhone: '전화번호 형식이 올바르지 않습니다.',
  invalidEmail: '이메일 형식이 올바르지 않습니다.',
  idAvailable: '사용 가능한 아이디입니다.',
  idDuplicate: '중복된 아이디입니다.',
  idRequired: '아이디를 입력 해주세요.',
  signUpComplete: '회원가입이 완료되었습니다.',
};

// 회원가입 진행 시, 입력값 검사
const validateInput = ({ id, pw, confirmPw, name, phone, email }, verify) => {
  if (!PATTERN.id.test(id)) return MESSAGE.invalidId;
  if (!verify) return MESSAGE.idCheckNeeded;
  if (!PATTERN.pw.test(pw)) return MESSAGE.invalidPw;
  if (pw !== confirmPw) return MESSAGE.pwMismatch;
  if (!PATTERN.name.test(name)) return MESSAGE.invalidName;
  if (!PATTERN.phone.test(phone)) return MESSAGE.invalidPhone;
  if (!PATTERN.email.test(email)) return MESSAGE.invalidEmail;
  return null;
};

// 입력한 아이디 변경시 중복검사 결과 false로 변경,
// verify값이 false일 경우 아이디 중복검사 재실행 요청
const handleIdVerify = (verify) => {
  return () => (verify = false);
};

// 휴대폰 번호 하이픈(-) 자동완성 기능 함수
const setPhoneNumber = ({ target }) => {
  target.value = target.value
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
    .replace(/(\-{1,2})$/g, '');
};

// 사용자 회원가입 API
const createUser = async (body) => {
  try {
    const response = await axios.post('/api/user/signup', body);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// 사용자 아이디 중복 유효성 검사 API
const verification = async (body) => {
  try {
    const response = await axios.post('/api/user/signup/verify', body);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// 새로운 사용자 식별번호 생성 API
const getUserSn = async () => {
  try {
    const response = await axios.get('/api/user/signup');
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// 아이디 중복검사 실행 및 조건 처리 함수
const handleButtonClick = async (id) => {
  const params = { id: id.value };
  if (id.value) {
    const { data } = await verification(params);
    alert(data ? MESSAGE.idAvailable : MESSAGE.idDuplicate);
    return data;
  } else {
    alert(MESSAGE.idRequired);
  }
};

// 회원가입 실행 및 입력항목 제한 검사, 조건 처리함수
const handleSubmitClick = async (event, elements, verify) => {
  event.preventDefault();

  const errorMessage = validateInput(
    {
      id: elements.id.value,
      pw: elements.pw.value,
      confirmPw: elements.confirmPw.value,
      name: elements.name.value,
      phone: elements.phone.value,
      email: elements.email.value,
    },
    verify
  );

  if (errorMessage) {
    alert(errorMessage);
  } else {
    const USER_SERIAL_NUMBER = await getUserSn();
    const params = {
      USER_SERIAL_NUMBER: USER_SERIAL_NUMBER?.data,
      USER_ID: elements.id.value,
      USER_PW: elements.pw.value,
      USER_GRADE: elements.grade.value,
      USER_NAME: elements.name.value,
      USER_PHONE_NUMBER: elements.phone.value,
      USER_EMAIL: elements.email.value,
    };

    const { status } = await createUser(params);
    if (status === 'OK') {
      alert(MESSAGE.signUpComplete);
      window.location.replace('/');
    }
  }
};

const signUpFunc = () => {
  let verify = false;
  const elements = {
    id: document.getElementById('id'),
    pw: document.getElementById('pw'),
    confirmPw: document.getElementById('confirmPw'),
    name: document.getElementById('name'),
    phone: document.getElementById('phone'),
    email: document.getElementById('email'),
    grade: document.getElementById('grade'),
    button: document.querySelector('button[type="button"]'),
    submit: document.querySelector('button[type="submit"]'),
  };

  elements.id.addEventListener('change', () => handleIdVerify(verify));
  elements.phone.addEventListener('input', setPhoneNumber);
  elements.button.addEventListener(
    'click',
    async () => (verify = await handleButtonClick(elements.id))
  );
  elements.submit.addEventListener('click', (event) =>
    handleSubmitClick(event, elements, verify)
  );
};

export default signUpFunc;

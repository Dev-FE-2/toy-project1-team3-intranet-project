// 페이지 렌더링
const formRender = (id) => {
  if (id) {
    return `
      <h1 id="title">기업공지 수정</h1>
    `;
  } else {
    return `
        <h1 id="title">기업공지 등록</h1>
    `;
  }
};

export default formRender;

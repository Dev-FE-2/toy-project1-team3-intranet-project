// 기능 추가
const absenceFunc = async () => {
  const modal = document.querySelector('.modal');
  const modalBack = document.querySelector('.modalBack');
  const modalOpen = document.querySelector('.absenceBtn');
  const modalClose = document.querySelector('.closeBtn');

  modalOpen.addEventListener('click',function(){
    //display 속성을 block로 변경
    modal.style.display = 'block';
  });
  //닫기 버튼을 눌렀을 때 모달팝업이 닫힘
  modalClose.addEventListener('click',function(){
    //display 속성을 none으로 변경
      modal.style.display = 'none';
  });
  modalBack.addEventListener('click',function(){
    //display 속성을 none으로 변경
      modal.style.display = 'none';
  });
};

export default absenceFunc;

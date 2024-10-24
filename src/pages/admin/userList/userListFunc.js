// 기능 추가
//등록, 프로필 페이지 이동기능 페이지네이션,삭제 미구현
const userListFunc = async () => {
  const create = document.querySelector('#create');
  // const delete = document.querySelector('#delete');
  const profile1 = document.querySelector('#profile1');
  const profile2 = document.querySelector('#profile2');
  const profile3 = document.querySelector('#profile3');
  const name1 = document.querySelector('#name1');
  const name2 = document.querySelector('#name2');
  const name3 = document.querySelector('#name3');
  

  const createLink = () => (location.href = '/admin/userList/usercreate');
  // const deleteBtn = () => (구현예정);
  const profile1Link = () => (location.href = '/admin/userList/profile1');
  const profile2Link = () => (location.href = '/admin/userList/profile2');
  const profile3Link = () => (location.href = '/admin/userList/profile3');
  const name1Link = () => (location.href = '/admin/userList/profile1');
  const name2Link = () => (location.href = '/admin/userList/profile2');
  const name3Link = () => (location.href = '/admin/userList/profile3');

  create.addEventListener('click', createLink);
  profile1.addEventListener('click', profile1Link);
  profile2.addEventListener('click', profile2Link);
  profile3.addEventListener('click', profile3Link);
  name1.addEventListener('click', name1Link);
  name2.addEventListener('click', name2Link);
  name3.addEventListener('click', name3Link);
};

export default userListFunc;

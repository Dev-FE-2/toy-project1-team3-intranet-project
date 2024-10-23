// 기능 추가
const userListFunc = async () => {
  const create = document.querySelector('#create');
  // const delete = document.querySelector('#delete');
  const profile1 = document.querySelector('#profile1');
  const profile2 = document.querySelector('#profile2');
  const profile3 = document.querySelector('#profile3');

  const createLink = () => (location.href = '/admin/userList/usercreate');
  // const deleteBtn = () => (구현예정);
  const profile1Link = () => (location.href = '/admin/userList/profile1');
  const profile2Link = () => (location.href = '/admin/userList/profile2');
  const profile3Link = () => (location.href = '/admin/userList/profile3');

  create.addEventListener('click', createLink);
  profile1.addEventListener('click', profile1Link);
  profile2.addEventListener('click', profile2Link);
  profile3.addEventListener('click', profile3Link);
};

export default userListFunc;

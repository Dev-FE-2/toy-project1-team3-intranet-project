/**
 * localStorage에서 특정 키의 값을 가져오는 함수
 * @param {string} key - 가져올 키 이름
 * @returns {string | null}
 */
const getLocalStorageItem = (key) => {
  const value = localStorage.getItem(key);
  if (!value) return null;
  return value;
};

export { getLocalStorageItem };

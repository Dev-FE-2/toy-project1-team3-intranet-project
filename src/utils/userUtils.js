import { getLocalStorageItem } from './storageUtils';

/**
 * 로그인한 사용자의 시리얼 넘버 조회 함수
 * @returns {string | null}
 */
const getUserSerialNumber = () => getLocalStorageItem('userSn');

/**
 * 로그인한 사용자의 권한 조회 함수
 * @returns
 */
const getUserGrade = () => {
  const grade = getLocalStorageItem('userGrade');
  if (!grade) return null;
  return parseInt(grade);
};

export { getUserSerialNumber, getUserGrade };

import express from 'express';
import db from '../../../database.js';

const router = express.Router();

//임직원 수 조회 함수
export const getTotalUsersCount = (search) => {
  return new Promise((resolve, reject) => {
    let query = 'SELECT COUNT(*) as totalCount FROM USER';
    query += search
      ? ' WHERE USER_NAME LIKE ? OR USER_EMAIL LIKE ?'
      : '';
    const params = search ? [`%${search}%`, `%${search}%`] : [];

    db.get(query, params, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result.totalCount);
    });
  });
};


 //USERLIST 데이터 조회

router.get('/', async (req, res) => {
  let { page, size, search } = req.query;
  page = parseInt(page) || 1; // 기본값 1페이지
  size = parseInt(size) || 5; // 출력되는 데이터 수
  const offset = (page - 1) * size;

  // 총 개수 가져오기
  const totalCount = await getTotalUsersCount(search);
  const totalPage = Math.ceil(totalCount / size);

  //임직원 정보 및 페이지네이션 쿼리
  let query = `SELECT USER_IMAGE AS image, USER_NAME AS name, USER_EMAIL AS email, USER_PHONE_NUMBER AS phoneNumber, USER_GRADE AS grade, USER_SERIAL_NUMBER AS userSn FROM USER `;
  const pagination = [];

  //검색어 처리
  if(search){
    query += 'WHERE name LIKE ? OR email LIKE ?';
    const searchParam = `%${search}%`
    pagination.push(searchParam,searchParam);
  }

  //페이지네이션
  query += ' LIMIT ? OFFSET ?';
  pagination.push(size, offset);

  //임직원 리스트 데이터 조회
  db.all(query, pagination, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        status: 'Error',
        error: 'userList 데이터 조회 실패',
      });
    }

    const userList = rows;

    res.json({
      status: 'OK',
      page,
      size,
      totalPage,
      totalCount,
      data: userList,
    });
  });
});
export default router;

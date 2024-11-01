import express from 'express';
import db from '../../../database.js';

const router = express.Router();

/**
 * USERLIST 데이터 조회
 */
router.get('/', async (req, res) => {
  let { page, size } = req.query;
  page = parseInt(page) || 1; // 기본값 1페이지
  size = parseInt(size) || 5; // 출력되는 데이터 수

  const offset = (page - 1) * size;
  //임직원 정보 및 페이지네이션 쿼리
  let query = `SELECT (SELECT COUNT(*) FROM USER) AS USER_COUNT, USER_IMAGE AS image, USER_NAME AS name, USER_EMAIL AS email, USER_PHONE_NUMBER AS phoneNumber, USER_GRADE AS grade, USER_SERIAL_NUMBER AS userSn FROM USER LIMIT ? OFFSET ?`;
  //페이지네이션
  const pagination = [size, offset];
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
    const totalCount = rows[0].USER_COUNT;
    const totalPage = Math.ceil(totalCount / size);
    console.log(totalCount);
    console.log(userList);
    console.log(totalPage);
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

import express from 'express';
import db from '../../../database.js';

const router = express.Router();

//총 임직원 수 조회
const getTotalUserListCount = () => {
  return new Promise((resolve, reject) => {
    let query = 'SELECT COUNT(*) as totalCount FROM USER';
    db.get(query, [], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result.totalCount);
    });
  });
};

/**
 * USERLIST 데이터 조회
 */
router.get('/', async (req, res) => {
  let {page, size} = req.query;
    page = parseInt(page) || 1; // 기본값 1페이지
    size = parseInt(size) || 5; // 출력되는 데이터 수
    const offset = (page - 1) * size; 
 
  const totalCount = await getTotalUserListCount();
  const totalPage = Math.ceil(totalCount/size);

  //임직원 정보 및 페이지네이션 쿼리
  let query = 
  `SELECT USER_IMAGE AS image, USER_NAME AS name, USER_EMAIL AS email, USER_PHONE_NUMBER AS phoneNumber, USER_GRADE AS grage, USER_ID AS userID FROM USER LIMIT ? OFFSET ?`
  //페이지네이션
  const pagination = [size, offset];
  //임직원 리스트 데이터 조회
  db.all(query, pagination, (err, rows) => {
    if(err){
      return res.status(500).json({
        status: 'Error',
        error: err.message,
      });
    }
    const userList = rows
    res.json({
      status: 'OK',
      page,
      size,
      totalPage,
      totalCount,
      data: userList
    })
  })
  
});
export default router;
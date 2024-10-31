import express from 'express';
import db from '../../../database.js';

const router = express.Router();

/**
 * 총 개수 조회하는 함수
 * @param {string} search - 검색어
 * @returns 총 공지 개수 반환
 */
const getTotalWorkCount = (userSn, search) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT COUNT(*) as totalCount FROM WORK WHERE USER_SERIAL_NUMBER = '${userSn}'`;
    query += search
      ? ' AND WORK_DATE LIKE ?'
      : '';
    const params = search ? [`%${search}%`] : [];

    db.get(query, params, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result.totalCount);
    });
  });
};

router.get('/', async (req, res) => {

  console.log("=== req : " + JSON.stringify(req.query));
  let { page, size, userSn, search } = req.query;
  page = parseInt(page) || 1; // 기본 페이지 = 1
  size = parseInt(size) || 10; // 기본 개수 = 10
  const offset = (page - 1) * size; // 몇번째 데이터부터 가져올건지

  try {
    // 총 개수 가져오기
    const totalCount = await getTotalWorkCount(userSn, search);
    const totalPage = Math.ceil(totalCount / size);

    // SQL 쿼리 생성
    let query = `SELECT * FROM WORK WHERE USER_SERIAL_NUMBER = '${userSn}'`;
    const params = [];

    // 검색어 처리
    if (search) {
      query += ` AND WORK_DATE LIKE ?`;
      const searchParam = `%${search}%`;
      params.push(searchParam);
    }

    // 정렬
    query += ' ORDER BY WORK_DATE DESC LIMIT ? OFFSET ?';
    params.push(size, offset);

    // 특정 페이지의 work 데이터 조회
    db.all(query, params, (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'work 데이터 조회 실패' });
        return;
      }

      res.json({
        status: 'OK',
        page,
        size,
        totalPage,
        totalCount,
        data: rows,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '총 개수 조회 실패' });
  }
});

export default router;
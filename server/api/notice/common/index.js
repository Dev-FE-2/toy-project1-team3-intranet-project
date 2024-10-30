import express from 'express';
import db from '../../../database.js';

const router = express.Router();

/**
 * 총 공지 개수 조회하는 함수
 * @param {string} search - 검색어
 * @returns 총 공지 개수 반환
 */
const getTotalNoticeCount = (search) => {
  return new Promise((resolve, reject) => {
    let query = 'SELECT COUNT(*) as totalCount FROM NOTICE';
    query += search
      ? ' WHERE NOTICE_TITLE LIKE ? OR NOTICE_CONTENT LIKE ?'
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

/**
 * NOTICE 데이터 조회
 */
router.get('/', async (req, res) => {
  let { page, size, search } = req.query;
  page = parseInt(page) || 1; // 기본 페이지 = 1
  size = parseInt(size) || 8; // 기본 개수 = 8
  const offset = (page - 1) * size; // 몇번째 데이터부터 가져올건지

  try {
    // 총 개수 가져오기
    const totalCount = await getTotalNoticeCount(search);
    const totalPage = Math.ceil(totalCount / size);

    // SQL 쿼리 생성
    let query =
      'SELECT NOTICE_SERIAL_NUMBER AS sn, NOTICE_TITLE AS title, NOTICE_CONTENT AS content, NOTICE_IMAGE AS image, NOTICE_DATE_TIME AS date, USER_SERIAL_NUMBER AS user_id FROM NOTICE';
    const params = [];

    // 검색어 처리
    if (search) {
      query += ' WHERE NOTICE_TITLE LIKE ? OR NOTICE_CONTENT LIKE ?';
      const searchParam = `%${search}%`;
      params.push(searchParam, searchParam);
    }

    // 정렬 및 페이지네이션
    query += ' ORDER BY datetime(NOTICE_DATE_TIME) DESC LIMIT ? OFFSET ?';
    params.push(size, offset);

    // 특정 페이지의 notice 데이터 조회
    db.all(query, params, (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'notice 데이터 조회 실패' });
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
    res.status(500).json({ error: '총 공지 개수 조회 실패' });
  }
});

export default router;

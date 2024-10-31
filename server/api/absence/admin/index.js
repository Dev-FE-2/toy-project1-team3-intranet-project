import express from 'express';
import db from '../../../database.js';

const router = express.Router();

/**
 * 총 개수 조회하는 함수
 * @param {string} searchType - 부재항목 검색
 * @param {string} searchTerm - 세부내용 검색
 * @returns 총 공지 개수 반환
 */
const getTotalAbsenceCount = (searchType, searchTerm) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT COUNT(*) as totalCount FROM ABSENCE`;
    const params = [];
    if (searchType) {
      query += ` AND ABSENCE_TYPE = ?`;
      params.push([`${searchType}`]);
    }
    if (searchTerm) {
      query += ` AND ABSENCE_DETAIL_CONTENT LIKE ?`;
      params.push([`%${searchTerm}%`]);
    }

    db.get(query, params, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result.totalCount);
    });
  });
};

router.get('/', async (req, res) => {
  let { page, size, searchType, searchTerm } = req.query;
  page = parseInt(page) || 1; // 기본 페이지 = 1
  size = parseInt(size) || 10; // 기본 개수 = 10
  const offset = (page - 1) * size; // 몇번째 데이터부터 가져올건지

  try {
    // 총 개수 가져오기
    const totalCount = await getTotalAbsenceCount(searchType, searchTerm);
    const totalPage = Math.ceil(totalCount / size);

    // SQL 쿼리 생성
    let query = `SELECT ab.*, u.USER_NAME FROM ABSENCE AS ab
                LEFT OUTER JOIN "USER" AS u
                ON u.USER_SERIAL_NUMBER = ab.USER_SERIAL_NUMBER
                WHERE 1=1`;
    const params = [];

    // 검색어 처리
    if (searchType) {
      query += ` AND ABSENCE_TYPE = '${searchType}'`;
    }
    if (searchTerm) {
      query += ` AND ABSENCE_DETAIL_CONTENT LIKE '%${searchTerm}%'`;
    }
    // 정렬
    query += ' ORDER BY ABSENCE_REQUEST_DATE_TIME DESC LIMIT ? OFFSET ?';
    params.push(size, offset);

    // 특정 페이지의 absence 데이터 조회
    db.all(query, params, (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'absence 데이터 조회 실패' });
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
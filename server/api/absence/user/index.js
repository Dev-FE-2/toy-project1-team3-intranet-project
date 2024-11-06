import express from 'express';
import db from '../../../database.js';

const router = express.Router();

/**
 * 총 개수 조회하는 함수
 * @param {string} userSn - 회원ID
 * @param {string} searchType - 부재항목 검색
 * @param {string} searchTerm - 세부내용 검색
 * @returns 총 공지 개수 반환
 */
const getTotalAbsenceCount = (userSn = '', searchType = '', searchTerm = '') => {
  return new Promise((resolve, reject) => {
    let query = `SELECT COUNT(*) as totalCount FROM ABSENCE WHERE 1=1`;

    if (userSn) {
      query += ` AND USER_SERIAL_NUMBER = '${userSn}'`
    }
    if (searchType) {
      query += ` AND ABSENCE_TYPE = '${searchType}'`;
    }
    if (searchTerm) {
      query += ` AND ABSENCE_DETAIL_CONTENT LIKE '%${searchTerm}%'`;
    }

    db.get(query, [], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result.totalCount);
    });
  });
};

// 부재 리스트 데이터 받아오기
router.get('/', async (req, res) => {
  let { page, size, userSn, searchType, searchTerm } = req.query;
  page = parseInt(page) || 1; // 기본 페이지 = 1
  size = parseInt(size) || 10; // 기본 개수 = 10
  const offset = (page - 1) * size; // 몇번째 데이터부터 가져올건지

  try {
    // 총 개수 가져오기
    const totalCount = await getTotalAbsenceCount(userSn, searchType, searchTerm);
    const totalPage = Math.ceil(totalCount / size);

    // SQL 쿼리 생성
    let query = `SELECT * FROM ABSENCE WHERE USER_SERIAL_NUMBER = '${userSn}'`;
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

// 부재 신청하기
router.post('/request', async (req, res) => {
  console.log("=== req : " + JSON.stringify(req.body));
  let { reqType, reqStartDateTime, reqEndDateTime, reqContent, userSn } = req.body;

  const count = await getTotalAbsenceCount() + 1;
  const absenceSn = `ABSENCE_${String(count).padStart(8, 0)}`;

  const sql = `
  INSERT INTO ABSENCE (ABSENCE_SERIAL_NUMBER, ABSENCE_TYPE, ABSENCE_REQUEST_DATE_TIME, USER_SERIAL_NUMBER, ABSENCE_START_DATE_TIME, ABSENCE_END_DATE_TIME, ABSENCE_DETAIL_CONTENT)
    VALUES ('${absenceSn}', '${reqType}', datetime('now', 'localtime'), '${userSn}', '${reqStartDateTime}', '${reqEndDateTime}', '${reqContent}')
  `;
  console.log("=== QUERY : " + sql);

  db.run(sql, [], (err) => { 
    if (err) {
      return res.status(500)
      .json({ message: '부재 신청 실패', error: err });
    }

    res.json({ message: '부재가 신청되었습니다.'});
  });
});

export default router;
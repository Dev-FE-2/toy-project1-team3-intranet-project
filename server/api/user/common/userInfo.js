import express from 'express';
import db from '../../../database.js';

const router = express.Router();

router.get('/', async (req, res) => {
  let USER_SERIAL_NUMBER = '';
  const sql = `SELECT COUNT(*) as count FROM USER`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: 'Error',
        error: err.message,
      });
    }
    // 사용자 시리얼 넘버 생성
    USER_SERIAL_NUMBER = `USER_${String(rows[0]['count'] + 1).padStart(8, 0)}`;
    res.json({
      status: 'OK',
      data: USER_SERIAL_NUMBER,
    });
  });
});

router.post('/', async (req, res) => {
  const {
    USER_SERIAL_NUMBER,
    USER_ID,
    USER_PW,
    USER_GRADE,
    USER_NAME,
    USER_PHONE_NUMBER,
    USER_EMAIL,
  } = req.body;

  const sql = `
    INSERT INTO USER( USER_SERIAL_NUMBER, USER_ID, USER_PW, USER_GRADE, USER_NAME, USER_PHONE_NUMBER, USER_EMAIL)
    VALUES( ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    USER_SERIAL_NUMBER,
    USER_ID,
    USER_PW,
    USER_GRADE,
    USER_NAME,
    USER_PHONE_NUMBER,
    USER_EMAIL,
  ];

  db.all(sql, params, (err) => {
    if (err) {
      return res.status(500).json({
        status: 'Error',
        error: err.message,
      });
    }

    res.json({
      status: 'OK',
    });
  });
});

router.post('/verify', async (req, res) => {
  const { id } = req.body;
  const sql = `SELECT COUNT(USER_ID) as count, USER_ID FROM USER WHERE USER_ID LIKE "${id}"`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: 'Error',
        error: err.message,
      });
    }
    let verify = !Boolean(rows[0]['count']);
    res.json({
      status: 'OK',
      data: verify,
    });
  });
});

router.get('/verify', async (req, res) => {
  const sql = `SELECT * FROM USER`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: 'Error',
        error: err.message,
      });
    }

    res.json({
      status: 'OK',
      data: rows,
    });
  });
});

export default router;

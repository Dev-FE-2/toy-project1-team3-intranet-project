import express from 'express';
import db from '../../../database.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { userSn } = req.query;

  const sql = `SELECT * FROM USER WHERE USER_SERIAL_NUMBER = ?`;

  const params = [userSn];

  db.all(sql, params, (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: 'Error',
        error: err.message,
      });
    }

    res.json({
      status: 'OK',
      data: rows[0],
    });
  });
});

router.put('/', (req, res) => {
  const { userSn, grade, name, phone, email, profileImage } = req.body;

  const query = `
   UPDATE USER SET USER_GRADE = ?, USER_NAME = ?, USER_PHONE_NUMBER = ?, USER_EMAIL = ?, USER_IMAGE = ? 
   WHERE USER_SERIAL_NUMBER = ?
  `;
  const params = [grade, name, phone, email, profileImage, userSn];

  db.all(query, params, (err) => {
    if (err) {
      return res.status(500).json({
        status: 'Error',
        error: err.message,
      });
    }

    res.status(200).send('사용자 데이터 저장 완료');
  });
});

export default router;

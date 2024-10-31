import express from 'express';
import db from '../../../database.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { USER_ID, USER_PW } = req.body;

  const sql = `
    SELECT USER_SERIAL_NUMBER, USER_GRADE FROM USER
    WHERE USER_ID = ? AND USER_PW = ?
  `;

  const params = [USER_ID, USER_PW];

  db.all(sql, params, (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: 'Error',
        error: err.message,
      });
    }
    const data = rows[0] ? { ...rows[0], isLogin: true } : { isLogin: false };
    console.log(data);
    res.json({
      status: 'OK',
      data: data,
    });
  });
});

export default router;

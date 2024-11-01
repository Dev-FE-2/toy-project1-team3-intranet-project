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
    console.log(rows);
    res.json({
      status: 'OK',
      data: rows[0],
    });
  });
});

export default router;

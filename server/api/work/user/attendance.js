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
    const data = rows[0];
    res.json({
      status: 'OK',
      data: data,
    });
  });
});

router.get('/working', async (req, res) => {
  const { userSn } = req.query;

  const sql = `
  SELECT WORK_SERIAL_NUMBER, date(WORK_DATE) as WORK_DATE, 
  strftime('%H : %M', WORK_START_DATE_TIME) as WORK_START_DATE_TIME, 
  strftime('%H : %M', WORK_END_DATE_TIME) as WORK_END_DATE_TIME 
  FROM WORK WHERE USER_SERIAL_NUMBER = ? and date(WORK_DATE) = date('now','localtime')
  `;

  const params = [userSn];

  db.all(sql, params, (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: 'Error',
        error: err.message,
      });
    }

    const data = rows[0]?.WORK_END_DATE_TIME
      ? { ...rows[0], isWork: 2 }
      : rows[0]
        ? { ...rows[0], isWork: 1 }
        : { isWork: 0 };
    res.json({
      status: 'OK',
      data: data,
    });
  });
});

router.post('/', async (req, res) => {
  const { userSn } = req.body;

  const sql = `
  INSERT INTO WORK ( WORK_SERIAL_NUMBER, WORK_DATE, WORK_START_DATE_TIME, USER_SERIAL_NUMBER ) 
    VALUES ( (SELECT 'WORK_' || printf('%08d', IFNULL(MAX(CAST(SUBSTR(WORK_SERIAL_NUMBER, 6) AS INTEGER)) + 1, 1)) FROM WORK), 
    datetime('now', 'localtime'), 
    datetime('now', 'localtime'), 
    ? )
  `;

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
    });
  });
});

router.put('/', async (req, res) => {
  const { userSn } = req.body;

  const sql = `
  UPDATE WORK
  SET WORK_END_DATE_TIME = datetime('now', 'localtime')
  WHERE USER_SERIAL_NUMBER = ? and date(WORK_DATE) = date('now','localtime')
  `;

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
    });
  });
});

export default router;

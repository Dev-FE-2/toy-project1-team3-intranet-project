import express from 'express';
import multer from 'multer';
import db from '../../../database.js';
import { getTotalNoticeCount } from '../common/index.js';

const router = express.Router();

// Multer 설정 (이미지 업로드를 위한 미들웨어)
const storage = multer.memoryStorage(); // 메모리에 파일을 저장
const upload = multer({ storage });

/**
 * 게시글 등록 API
 */
router.post('/', upload.single('image'), async (req, res) => {
  const { title, content, userSn } = req.body;
  const imageBuffer = req.file ? req.file.buffer : null;

  // 총 개수 조회
  const count = await getTotalNoticeCount();

  // 공지 시리얼 넘버 생성
  const newNoticeSn = `NOTICE_${String(count).padStart(8, 0)}`;

  db.run(
    'INSERT INTO NOTICE (NOTICE_SERIAL_NUMBER, NOTICE_TITLE, NOTICE_CONTENT, NOTICE_IMAGE, USER_SERIAL_NUMBER) VALUES (?, ?, ?, ?, ?)',
    [newNoticeSn, title, content, imageBuffer, userSn],
    (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: '게시글 등록 실패', error: err });
      }
      res.json({ message: '게시글이 등록되었습니다.' });
    }
  );
});

/**
 * 게시글 수정 API
 */
router.put('/:noticeSn', upload.single('image'), (req, res) => {
  const noticeSn = req.params.noticeSn;
  const { title, content, userSn } = req.body;
  const imageBuffer = req.file ? req.file.buffer : null;

  // 이미지가 새로 업로드되었는지에 따라 쿼리를 다르게 작성
  const query = imageBuffer
    ? 'UPDATE NOTICE SET NOTICE_TITLE = ?, NOTICE_CONTENT = ?, NOTICE_IMAGE = ?, USER_SERIAL_NUMBER = ? WHERE NOTICE_SERIAL_NUMBER = ?'
    : 'UPDATE NOTICE SET NOTICE_TITLE = ?, NOTICE_CONTENT = ?, USER_SERIAL_NUMBER = ? WHERE NOTICE_SERIAL_NUMBER = ?';

  const params = imageBuffer
    ? [title, content, imageBuffer, userSn, noticeSn]
    : [title, content, userSn, noticeSn];

  db.run(query, params, (err) => {
    if (err) {
      return res.status(500).json({ message: '게시글 수정 실패', error: err });
    }
    res.json({ message: '게시글이 수정되었습니다.' });
  });
});

/**
 * 게시글 삭제 API
 */
router.delete('/:noticeSn', (req, res) => {
  const noticeSn = req.params.noticeSn;
  const errorMsg = '공지 삭제 실패';

  const query = `
    DELETE FROM NOTICE WHERE NOTICE_SERIAL_NUMBER = ?
  `;

  db.run(query, [noticeSn], function (err) {
    if (err) {
      console.error('Error deleting notice:', err);
      res.status(500).json({ error: errorMsg });
      return;
    }

    // 삭제된 행이 있는지 확인
    if (this.changes === 0) {
      res.status(404).json({ error: errorMsg });
    } else {
      res
        .status(200)
        .json({ message: '공지 게시글이 삭제되었습니다.', status: 'OK' });
    }
  });
});

export default router;

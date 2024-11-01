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
  const { title, content, userSn, imageName } = req.body;
  const imageBuffer = req.file ? req.file.buffer : null;

  // 총 개수 조회
  const count = await getTotalNoticeCount();

  // 공지 시리얼 넘버 생성
  const newNoticeSn = `NOTICE_${String(count + 1).padStart(8, 0)}`;

  db.run(
    'INSERT INTO NOTICE (NOTICE_SERIAL_NUMBER, NOTICE_TITLE, NOTICE_CONTENT, NOTICE_IMAGE, NOTICE_IMAGE_NAME, USER_SERIAL_NUMBER) VALUES (?, ?, ?, ?, ?, ?)',
    [newNoticeSn, title, content, imageBuffer, imageName, userSn],
    (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: '게시글 등록 실패', error: err });
      } else {
        res.json({ message: '게시글이 등록되었습니다.' });
      }
    }
  );
});

/**
 * 게시글 수정 API
 */
router.put('/:noticeSn', upload.single('image'), (req, res) => {
  const noticeSn = req.params.noticeSn;
  const { title, content, userSn, imageName, deleteImage } = req.body;
  const imageBuffer = req.file ? req.file.buffer : null;

  let query = '';
  const params = [];

  if (deleteImage === 'true') {
    // 이미지 삭제 요청이 있을 경우
    query =
      'UPDATE NOTICE SET NOTICE_TITLE = ?, NOTICE_CONTENT = ?, NOTICE_IMAGE = NULL, NOTICE_IMAGE_NAME = NULL, USER_SERIAL_NUMBER = ? WHERE NOTICE_SERIAL_NUMBER = ?';
    params.push(title, content, userSn, noticeSn);
  } else if (imageBuffer) {
    // 새로운 이미지가 업로드된 경우
    query =
      'UPDATE NOTICE SET NOTICE_TITLE = ?, NOTICE_CONTENT = ?, NOTICE_IMAGE = ?, NOTICE_IMAGE_NAME = ?, USER_SERIAL_NUMBER = ? WHERE NOTICE_SERIAL_NUMBER = ?';
    params.push(title, content, imageBuffer, imageName, userSn, noticeSn);
  } else {
    // 이미지가 변경되지 않은 경우
    query =
      'UPDATE NOTICE SET NOTICE_TITLE = ?, NOTICE_CONTENT = ?, USER_SERIAL_NUMBER = ? WHERE NOTICE_SERIAL_NUMBER = ?';
    params.push(title, content, userSn, noticeSn);
  }

  db.run(query, params, (err) => {
    if (err) {
      res.status(500).json({ message: '게시글 수정 실패', error: err });
    } else {
      res.json({ message: '게시글이 수정되었습니다.' });
    }
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
    } else {
      // 삭제된 행이 있는지 확인
      if (this.changes === 0) {
        res.status(404).json({ error: errorMsg });
      } else {
        res
          .status(200)
          .json({ message: '공지 게시글이 삭제되었습니다.', status: 'OK' });
      }
    }
  });
});

export default router;

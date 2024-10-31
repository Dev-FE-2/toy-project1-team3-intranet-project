import express from 'express';
import db from '../../../database.js';

const router = express.Router();

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

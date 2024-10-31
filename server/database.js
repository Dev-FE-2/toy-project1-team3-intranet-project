import sqlite3 from 'sqlite3';

const databaseName = 'toyprj1';
const database = new sqlite3.Database(`./${databaseName}.db`);

database.serialize(() => {
  database.run(`
    CREATE TABLE IF NOT EXISTS USER(
      USER_SERIAL_NUMBER TEXT PRIMARY KEY,
      USER_ID TEXT NOT NULL,
      USER_PW TEXT NOT NULL,
      USER_GRADE INTEGER NOT NULL,
      USER_NAME TEXT,
      USER_PHONE_NUMBER TEXT,
      USER_EMAIL TEXT,
      USER_RANK TEXT,
      USER_IMAGE BLOB
    )`).run(`
    CREATE TABLE IF NOT EXISTS WORK(
      WORK_SERIAL_NUMBER TEXT PRIMARY KEY,
      WORK_DATE TEXT NOT NULL,
      WORK_START_DATE_TIME TEXT,
      WORK_END_DATE_TIME TEXT,
      USER_SERIAL_NUMBER TEXT NOT NULL,
      FOREIGN KEY(USER_SERIAL_NUMBER) REFERENCES USER(USER_SERIAL_NUMBER)
    )`).run(`
    CREATE TABLE IF NOT EXISTS ABSENCE(
      ABSENCE_SERIAL_NUMBER TEXT PRIMARY KEY,
      ABSENCE_TYPE TEXT NOT NULL,
      ABSENCE_START_DATE_TIME TEXT NOT NULL,
      ABSENCE_END_DATE_TIME TEXT NOT NULL,
      ABSENCE_DETAIL_CONTENT TEXT,
      USER_SERIAL_NUMBER TEXT NOT NULL,
      FOREIGN KEY(USER_SERIAL_NUMBER) REFERENCES USER(USER_SERIAL_NUMBER)
    )`).run(`
    CREATE TABLE IF NOT EXISTS NOTICE(
      NOTICE_SERIAL_NUMBER TEXT PRIMARY KEY,
      NOTICE_TITLE TEXT NOT NULL,
      NOTICE_CONTENT TEXT NOT NULL,
      NOTICE_IMAGE BLOB,
      NOTICE_DATE_TIME TEXT DEFAULT (datetime('now', 'localtime')),
      USER_SERIAL_NUMBER TEXT NOT NULL,
      FOREIGN KEY(USER_SERIAL_NUMBER) REFERENCES USER(USER_SERIAL_NUMBER)
    )`);
  /*
   * .run(`
   * INSERT INTO USER( USER_SERIAL_NUMBER, USER_ID, USER_PW, USER_GRADE, USER_NAME, USER_PHONE_NUMBER, USER_EMAIL)
   * VALUES( "USER_00000000", "testid", "testpw1!", 0, "홍길동", "010-0000-0000", "test@test.com")
   * `);
   * 아이디 중복 검사 쿼리 동작시 데이터가 없을 경우, 에러 반환하기에 테스트 데이터 로우 1개 추가함으로써 해소함.
   */
});

export default database;

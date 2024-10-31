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
    )`)
    // .run(`
    //   INSERT INTO USER (
    //     USER_SERIAL_NUMBER,
    //     USER_ID,
    //     USER_PW,
    //     USER_GRADE,
    //     USER_NAME,
    //     USER_PHONE_NUMBER,
    //     USER_EMAIL,
    //     USER_RANK,
    //     USER_IMAGE
    // ) VALUES 
    // ('USR001', 'john_doe', 'password123', 1, '조던', '010-1234-5678', 'john@example.com', '과장', NULL),
    // ('USR002', 'jane_smith', 'securepass456', 0, '스미스', '010-2345-6789', 'jane@example.com', '팀장', NULL),
    // ('USR003', 'bob_johnson', 'bobpass789', 1, '밥', '010-3456-7890', 'bob@example.com', '과장', NULL),
    // ('USR004', 'alice_williams', 'alicepass321', 0, '엘리스', '010-4567-8901', 'alice@example.com', '사원', NULL),
    // ('USR005', 'charlie_brown', 'charliepwd654', 0, '브라운', '010-5678-9012', 'charlie@example.com', '인턴', NULL),
    // ('USR006', 'start_devleop', 'charliepwd612', 1, '찰리', '010-5678-5222', 'charlie@example.com', '사원', NULL),
    // ('USR007', 'hello_world', 'charliepwd642', 1, '철수', '010-5338-5222', 'cha8lie@example.com', '사원', NULL),
    // ('USR008', '1234asdf', 'charli12612', 1, '엘리자베스', '010-3333-5222', 'c4arlie@example.com', '사원', NULL),
    // ('USR009', 'qwe123', 'charliepwd612', 1, '브라보', '010-5678-5442', 'char1e@example.com', '사원', NULL),
    // ('USR010', 'dave_dive', 'charl32pwd612', 1, '다이브', '010-5678-4422', 'chalie@example.com', '사원', NULL),
    //   `);
  /*
   * .run(`
   * INSERT INTO USER( USER_SERIAL_NUMBER, USER_ID, USER_PW, USER_GRADE, USER_NAME, USER_PHONE_NUMBER, USER_EMAIL)
   * VALUES( "USER_00000000", "testid", "testpw1!", 0, "홍길동", "010-0000-0000", "test@test.com")
   * `);
   * 아이디 중복 검사 쿼리 동작시 데이터가 없을 경우, 에러 반환하기에 테스트 데이터 로우 1개 추가함으로써 해소함.
   */
});

export default database;

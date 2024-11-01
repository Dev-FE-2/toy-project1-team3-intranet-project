# toy-project1-team3-Pull_Up-project

서로 당겨주고 발전해 앞으로 나아가는
TEAM3 풀업의 레포지토리입니다.
## 프로젝트 소개
 효과적인 임직원 관리와 모두의 출퇴근이 편안해 질 수 있도록 도와주는 풀업의 인트라넷 서비스입니다.


## 💁 구성원

<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/laivastia"><img src="https://avatars.githubusercontent.com/u/92559779?v=4"width="100px;" alt=""/><br /><sub><b> 이민태</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/park-chan-hui"><img src="https://avatars.githubusercontent.com/u/176368439?v=4" width="100px;" alt=""/><br /><sub><b>박찬희 </b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/mgYang53"><img src="https://avatars.githubusercontent.com/u/50770004?v=4" width="100px;" alt=""/><br /><sub><b>양명규 </b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/choiyoungae"><img src="https://avatars.githubusercontent.com/u/109134495?v=4" width="100px;" alt=""/><br /><sub><b>최영애 </b></sub></a><br /></td>
    </tr>
  </tbody>
</table>

&nbsp;

## 🔩 프로젝트 실행 방법

## 설치
깃허브를 통해 해당 프로젝트를 클론 한 후 npm 설치를 진행해야합니다.
```
git clone https://github.com/Dev-FE-2/toy-project1-team3-intranet-project.git
npm install
```

## 실행

### 서버 실행
DB 활용을 위해 서버를 실행해 주어야 합니다.
```
npm run server 
```

### 클라이언트 실행
클라이언트를 실행하여 해당 프로젝트를 테스트 할 수 있습니다.
```
npm run dev 
```

## 프로젝트 컨벤션
### 서버 폴더 구조

```
└ server
 	├── api
	│ 	├── absence
	│ 	│	  ├── admin
	│		│ 	├── common
	│		│		└── user
	│		├── notice
	│		├── user
	│		└── work
	└── database.js
```

### API URL 구조

```jsx
1. /api/admin
2. /api/user
3. /api/common

//e.g. 
//1. /api/admin/profile/getUser
```

### 로그인 정보

- 저장 공간 : localStorage
    - 저장 형식
        - key : userSn
        - value : user_12345678

### Naming

- 파일명 : 카멜 케이스, 주된 객체에 따라 Naming (user, item, 기타등등)
- 변수명 : 카멜 케이스, 약어를 써도 되는데 꼭 주석해서 설명 풀기
- 함수명 : 카멜 케이스, 동사+명사 형태 (e.g. createUser)
- 클래스명 : 파스칼 케이스 (e.g. UserService)

### Github

- Issue와 PR, Commit 생성 시 템플릿 사용
- 깃 issue, pr 관련 approve 2인 이상 설정 및 policy 구성

### Git

- Branch 전략 : Main | develop | Feature(Topic) 브랜치 활용

## Commit Message
```
# 본문은 선택 사항입니다.
################
# <타입> : <제목>의 형식으로 제목을 아래 공백줄에 작성
# 제목은 50자 이내 / 변경사항이 "무엇"인지 명확히 작성 / 끝에 마침표 금지
# 예) feat : 로그인 기능 추가

# 바로 아래 공백은 지우지 마세요 (제목과 본문의 분리를 위함)

################
# 본문(구체적인 내용)을 아랫줄에 작성 (필수 아님)
# 여러 줄의 메시지를 작성할 땐 "-"로 구분 (한 줄은 72자 이내)
# - 왜 이 변경이 필요한지 설명합니다.
# - 주요 변경 사항이 무엇인지 설명합니다.

################
# 타입 종류
# feat : 새로운 기능 추가
# fix : 버그 수정
# docs : 문서 수정
# test : 테스트 코드 추가
# refact : 코드 리팩토링
# style : 코드 포맷팅, 세미콜론 누락 등 코드 의미에 영향을 주지 않는 변경사항
# chore : 빌드 부분 혹은 패키지 매니저 수정사항
# comment: 주석 추가 및 변경
# remove: 파일, 폴더 삭제
# rename: 파일, 폴더명 수정
################
```

## 프로젝트 진행 과정

### 프로그램 기획 10월 16일 ~ 18일
프로젝트 컨벤션 정의 및 템플릿 파악 요구사항, 프로젝트 정의서 등 전반적인 기획을 진행했습니다

### 와이어프레임 및 스토리보드 작성 10월 18일
피그마를 통해 와이어 프레임 작성하여 구체적으로 필요한 기능을 확인했습니다

### DB 설계 및 API 정의 10월 18일 ~ 21일
DB설계 및 그에 따른 api를 정의 했습니다.

### HTML/CSS 퍼블리시 10월 21일 ~ 25일
각각 역할 분담한 페이지별 HTML/CSS 마크업을 진행 했습니다.

### 기능 구현 10월 25일 ~ 11월 1일
마크업한 HTML/CSS와 기획한 내용을 바탕으로 기능 개발을 진행했습니다.


## 주요 기능
---

### 사용자 페이지

**마이페이지**

- 근태 > 시간관리
    - 직원은 자신의 근무상태를 시작/종료 버튼으로 설정할 수 있습니다.
    - 직원은 자신의 근무시간을 확인할 수 있습니다.
- 근태 > 부재관리
    - 직원은 부재 항목 필터링에 따른 자신의 부재 신청 내역 목록을 확인할 수 있습니다.
    - 직원은 연차/ 반차/시간 조정 등 자신의 부재 상황을 신청할 수 있습니다.
    - 직원은 자신의 부재 신청 내역에 대한 상세 내용을 확인할 수 있습니다.
    - 직원은 자신의 부재 신청 내역에 대한 상세 내용을 수정할 수 있습니다.
    - 직원은 자신의 부재 신청 내역을 삭제할 수 있습니다.
    - 직원은 부재 신청 시 사유를 기재할 수 있습니다. (선택)
- 프로필
    - 직원은 자신의 프로필 이미지, 직무, 이름을 확인할 수 있습니다.
    - 직원은 자신의 프로필 이미지(선택), 직무, 이름을 수정할 수 있습니다.
- 기업 공지
    - 직원은 기업이 등록한 공지사항을 확인할 수 있습니다.

**회원 시스템**

- 직원은 회원으로서 가입이 가능합니다.
- 직원은 로그인/로그아웃을 할 수 있습니다.

### 관리자 페이지

**직원관리**

관리자는 등록된 직원 목록을 확인할 수 있습니다.

- 프로필
    - 관리자는 직원들의 프로필 목록을 확인할 수 있습니다.
    - 관리자는 직원의 프로필 상세 내용을 확인할 수 있습니다.
    - 관리자는 직원의 프로필 이미지를 등록, 수정, 삭제할 수 있습니다.
- 기업 공지
    - 관리자는 기업 공지사항을 등록할 수 있습니다. (이미지 업로드는 선택)

## 🔧 기술 스택

<div align="center">

|      Type       |                                                                                                             Tool                                                                                                             |
| :-------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|     Library     |                                                               ![VITE](https://img.shields.io/badge/VITE-646CFF?style=for-the-badge&logo=Vite&logoColor=white)                                                                |
|    Language     | ![HTML5](https://img.shields.io/badge/HTML5-E34F26.svg?style=for-the-badge&logo=HTML5&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black) |
|     Styling     |                                                               ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white)                                                                |
|     BaaS     |                                                               <svg role="img" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">SQLite<path d="M21.678.521c-1.032-.92-2.28-.55-3.513.544a8.71 8.71 0 0 0-.547.535c-2.109 2.237-4.066 6.38-4.674 9.544.237.48.422 1.093.544 1.561a13.044 13.044 0 0 1 .164.703s-.019-.071-.096-.296l-.05-.146a1.689 1.689 0 0 0-.033-.08c-.138-.32-.518-.995-.686-1.289-.143.423-.27.818-.376 1.176.484.884.778 2.4.778 2.4s-.025-.099-.147-.442c-.107-.303-.644-1.244-.772-1.464-.217.804-.304 1.346-.226 1.478.152.256.296.698.422 1.186.286 1.1.485 2.44.485 2.44l.017.224a22.41 22.41 0 0 0 .056 2.748c.095 1.146.273 2.13.5 2.657l.155-.084c-.334-1.038-.47-2.399-.41-3.967.09-2.398.642-5.29 1.661-8.304 1.723-4.55 4.113-8.201 6.3-9.945-1.993 1.8-4.692 7.63-5.5 9.788-.904 2.416-1.545 4.684-1.931 6.857.666-2.037 2.821-2.912 2.821-2.912s1.057-1.304 2.292-3.166c-.74.169-1.955.458-2.362.629-.6.251-.762.337-.762.337s1.945-1.184 3.613-1.72C21.695 7.9 24.195 2.767 21.678.521m-18.573.543A1.842 1.842 0 0 0 1.27 2.9v16.608a1.84 1.84 0 0 0 1.835 1.834h9.418a22.953 22.953 0 0 1-.052-2.707c-.006-.062-.011-.141-.016-.2a27.01 27.01 0 0 0-.473-2.378c-.121-.47-.275-.898-.369-1.057-.116-.197-.098-.31-.097-.432 0-.12.015-.245.037-.386a9.98 9.98 0 0 1 .234-1.045l.217-.028c-.017-.035-.014-.065-.031-.097l-.041-.381a32.8 32.8 0 0 1 .382-1.194l.2-.019c-.008-.016-.01-.038-.018-.053l-.043-.316c.63-3.28 2.587-7.443 4.8-9.791.066-.069.133-.128.198-.194Z"/></svg>                                                                |
|   Formatting    |      ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)      |
| Package Manager |                                                                 ![Npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)                                                                 |
| Version Control |       ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)       |
|  Collaboration  |           ![Slack](https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white) ![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)           |

</div>

&nbsp;

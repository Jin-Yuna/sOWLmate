## 1. SowlMate 프로젝트

![그림1 1](../images/.README/그림1 1.png)



![full_logo](../images/.README/full_logo.svg)서비스의 상징인 부엉이와 영혼의 단짝이라는 뜻의 soulmate를 결합하여 네이밍

사용자간 장기적인 만남을 이뤄갈 수 있도록 해주는 화상 채팅 서비스

처음 만났을 때 상대의 생김새만 보고  판단하지 않고, 마음이 맞는지를 알아갈 수 있게 하기 위해 얼굴에 마스크를 쓰고 만남을 가짐

 글로벌 친구를 사귈 수 있도록 번역서비스를 제공하며, 만남을 이어가고 싶은 친구와 시간이 맞지 않아도 친분을 이어갈 수 있게 편지 서비스를 제공



## 2. 개발환경

### 2-1 환경설정

- node  v16.16.0

- npm   8.11.0

- vue/cli 5.0.8

- Intellij, Spring Boot 2.7.1

- Spring Boot JPA

- Java 8, AWS EC2

- mysql

- Jenkins

- Docker

- Docker-compose

- Azure

- kurento



### 2-2 서비스 아키텍쳐

![image 1686](../images/.README/image 1686.png)

## 3. 주요 기능

- 메인

  ![메인](../images/.README/메인.gif)

- 화상채팅 + 채팅

- 마스킹

- 번역

- 편지쓰기

- 편지받기

- 룸

- 마스킹

- 회원가입 + 이메일 인증

- 소셜로그인 + 회원가입

## 4. 배포

- 도커와 젠킨스를 이용한 배포, 배포시 3분 가량의 서버 중단이 생김



## 5. 협업 툴

- Git

- Jira

- Notion

- Mattermost

- Webex

- Discord

## 6. 화면 설계서

- ![image-20220819113450747](../images/.README/image-20220819113450747.png)

## 7. Git 커밋 컨벤션

- `Feat` : 새로운 기능을 추가할 경우

- `Fix` : 버그를 고친 경우

- `Docs` : 문서를 수정한 경우

- `Design` : CSS 등 사용자 UI 디자인 변경

- `Style` : 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우

- `Refac` : 프로덕션 코드 리팩토링 (코드 최적화)

- `Test` : 테스트 추가, 테스트 리팩토링(프로덕션 코드 변경 X)

- `Build` : 빌드 관련 파일 수정

- `Rename` : 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우

- `Merge` : PR을 요청하는 경우

- `Perf` : 성능 개선

- `Chore` : 패키지 매니저 등 그 외 자잘한 수정
  
  ```textile
  제목 끝에 마침표 금지, 명령문, 현재 시제로 작성, 대문자 사용 금지
  
  ex) Feat : add login validation function
  ```

  // Merge Commit

   Merge : #4 from sowl/branch_name

```
## 8. Git Flow 브렌치 전략

- `master` : deploy branch

`dev` : develop branch

`feat-fe-contents` : frontend feature branch

→ ex) feat-fe-loginView

`feat-be-contents` : backend feature branch

→ ex) feat-be-signupAPI

`fix-fe-contents` : frontend fix branch

`fix-be-contents` : backend fix branch

`refactor-fe-contents` : frontend refactoring branch

`refactor-be-contents` : backend refactoring branch



## 9. Jira

- 프로젝트 일정 및 업무 분담을 위해 사용.  일주일 단위의 스프린트를 사용하며 월요일마다 새로운 스프린트를 시작

- Epic :  회원관리, 화상미팅관리, 

- Story:  FE와 BE로 나눔

- Work : 가장 작은 단위, 스토리 포인트를 주어 몇 시간동안 할 일인지를 표시 



## 10. Notion

- 공부한 내용, 도움이 될 링크, 데일리스크럼 및 회의록, 피드백 내용, 깃 컨벤션, 팀원간 연락처, ERD등 설계문서와 설계문서에 대한 링크를 통합적으로 관리



## 11. ERD



## 12. 팀원소개

[발표에 쓴 팀원 소개 이미지]
```

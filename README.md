# B308-PJT2

22.07.18

### 라이브러리 살펴보기

> Gradle은 의존관계가 있는 라이브러리를 함께 다운로드 한다.
> 

***스프링 부트 라이브러리***

- spring-boot-starter-web
    - spring-boot-starter-tomcat: 톰캣(웹서버)
    - spring-webmvc: 스프링 웹 MVC
- spring-boot-starter(공통): 스프링 부트 + 스프링 코어 + 로깅
    - spring-boot
        - spring-core
    - spring-boot-starter-logging
        - logback, slf4j
        

***테스트 라이브러리***

- spring-boot-starter-test
    - junit: 테스트 프레임워크
    - mockito: 목 라이브러리
    - assertj: 테스트 코드를 좀 더 편하게 작성하게 도와주는 라이브러ㅣ
    <<<<<<< HEAD
    - spring-test: 스프링 통합 테스트 지원
    =======
    - spring-test: 스프링 통합 테스트 지원
    

---

22.07.19

- Springboot JPA 라이브 강의 코드 리뷰
- 기획 & 설계 작성한 것들 종합 정리
- 관계형 모델 작성

---

22.07.20

### View 환경설정

**Welcome Page 만들기**

- springboot가 제공하는 Welcome Page 기능
    - `static/index.html`을 올려두면 Welcome page 기능을 제공
    - [https://docs.spring.io/spring-boot/docs/2.3.1.RELEASE/reference/html/spring-boot-features.html#boot-features-spring-mvc-welcome-page](https://docs.spring.io/spring-boot/docs/2.3.1.RELEASE/reference/html/spring-boot-features.html#boot-features-spring-mvc-welcome-page)

- thymeleaf 템플릿 엔진
    - thymeleaf 공식 사이트: [https://www.thymeleaf.org/](https://www.thymeleaf.org/)
    - spring 공식 튜토리얼: [https://spring.io/guides/gs/serving-web-content/](https://spring.io/guides/gs/serving-web-content/)
    - springboot 메뉴얼: [https://docs.spring.io/spring-boot/docs/2.3.1.RELEASE/reference/html/spring-boot-features.html#boot-features-spring-mvc-template-engines](https://docs.spring.io/spring-boot/docs/2.3.1.RELEASE/reference/html/spring-boot-features.html#boot-features-spring-mvc-template-engines)
    

**thymeleaf 템플릿엔진 동작 확인**

![Untitled](B308-PJT2%20ff23d3ebd70d414fa9c3244e89ee1bc4/Untitled.png)

- Controller에서 리턴 값으로 문자를 반환하면 `viewResolver` 가 화면을 찾아서 처리
    - springboot 템플릿엔진 기본 viewName 매핑
    - `resources:templates/` +{ViewName}+ `.html`
    

> ※ `spring-boot-devtools` 라이브러리를 추가하면, `html` 파일을 컴파일만 해주면 서버 재시작 없이 View 파일 변경이 가능                                                                                                         IntelliJ 컴파일 방법: 메뉴 build → Recompile
> 

![Untitled](B308-PJT2%20ff23d3ebd70d414fa9c3244e89ee1bc4/Untitled%201.png)

---

22.07.21

### JPA

- JPA는 기존의 반복 코드는 물론이고, 기본적인 SQL도 JPA가 직접 만들어서 실행해준다.
- JPA를 사용하면, SQL과 데이터 중심의 설계에서 객체 중심의 설계로 패러다임을 전환할 수 있다.
- JPA를 사용하면 개발 생산성을 크게 높일 수 있다.

**build.gradle파일에 JPA, h2 데이터베이스 관련 라이브러리 추가**

![Untitled](B308-PJT2%20ff23d3ebd70d414fa9c3244e89ee1bc4/Untitled%202.png)

`spring-boot-starter-data-jpa` 는 내부에 jdbc 관련 라이브러리를 포함한다. 따라서 jdbc는 제거해도 된다.

**스프링 부트에 JPA 설정 추가**

`resources/application.properties`

![Untitled](B308-PJT2%20ff23d3ebd70d414fa9c3244e89ee1bc4/Untitled%203.png)

> **주의!**: springboot 2.4부터는 `spring.datasource.username=sa` 를 꼭 추가해주어야 한다. 그렇지 않으면 오류가 발생한다.
> 
- `show-sql` : JPA가 생성하는 SQL을 출력한다.
- `ddl-auto` : JPA는 테이블을 자동으로 생성하는 기능을 제공하는데 `none` 를 사용하면 해당 기능을 끈다.
    - `create` 를 사용하면 entity 정보를 바탕으로 table도 직접 생성해준다.
    

**JPA entity 매핑**

![Untitled](B308-PJT2%20ff23d3ebd70d414fa9c3244e89ee1bc4/Untitled%204.png)

![Untitled](B308-PJT2%20ff23d3ebd70d414fa9c3244e89ee1bc4/Untitled%205.png)

**JPA 회원 repository**

![Untitled](B308-PJT2%20ff23d3ebd70d414fa9c3244e89ee1bc4/Untitled%206.png)

![Untitled](B308-PJT2%20ff23d3ebd70d414fa9c3244e89ee1bc4/Untitled%207.png)

**서비스 계층에 transaction 추가**

![Untitled](B308-PJT2%20ff23d3ebd70d414fa9c3244e89ee1bc4/Untitled%208.png)

- `org.springframework.transaction.annotation.Transactional` 를 사용하자.
- spring은 해당 클래스의 메서드를 실행할 때 transaction을 시작하고, 메서드가 정상 종료되면 transaction을 commit한다. 만약 런타임 예외가 발생하면 rollback한다.
- **JPA를 통한 모든 데이터 변경은 트랜잭션 안에서 실행해야 한다**

**JPA를 사용하도록  spring 설정 변경**

![Untitled](B308-PJT2%20ff23d3ebd70d414fa9c3244e89ee1bc4/Untitled%209.png)

![Untitled](B308-PJT2%20ff23d3ebd70d414fa9c3244e89ee1bc4/Untitled%2010.png)
>>>>>>> b86ced2720269b5338ed538aa86473bb0abf556b





# Chat Server

- openvidu
- https setting

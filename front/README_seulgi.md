# S07P12B308

1. npm i
2. npm run serve

---

## 1. [vuex] unknown action type 오류(22.07.19)

- store/index.js에서 store/modules/accounts안의 action을 불러오지 못하는 것 같았다.
  vue3의 vuex 사용이 미숙했다.
- 아래의 블로그를 보며 해결할 수 있었다.(thanks 영환)
  https://kyounghwan01.github.io/blog/Vue/vue3/composition-api-vuex/#vuex-%E1%84%89%E1%85%A6%E1%84%90%E1%85%B5%E1%86%BC-%E1%84%86%E1%85%B5%E1%86%BE-store-module-1%E1%84%80%E1%85%A2%E1%84%85%E1%85%A9-%E1%84%89%E1%85%B5%E1%86%AF%E1%84%92%E1%85%A2%E1%86%BC

=> 의외로 store/index.js에서는 별 문제가 없었고, store/modules/accouts안의 문법이 문제였다.
store/index.js와 마찬가지로 `export default createStore({})`로 되어있던 부분을
`export const accounts = ({})`로 바꾸니 해결되었다.

## 2. router 동작 오류

- 네비게이션바를 추가하면서 App.vue의 template부분에서 `<router-view />`를 제거했더니 라우터가 제대로 작동하지 않는 오류가 발생하였다.

- 주소창의 url은 변경되었지만 해당 라우터에 연결된 LoginView.vue 등의 페이지가 랜더링 되지 않았었다.

- 이제 네비게이션 바에서 메뉴를 클릭할 때 마다 페이지가 잘 바뀌지만 url에 알수없는 #이 중간에 들어가 있다
  
  ```tex
  http://localhost:8080/#/auth/login
  ```

## 3. mysql Data수정

- 회원 가입 기능을 테스트 하면서, 같은 메일을 사용하는 계정이 두개 생기게 되었다. 

- 위의 중복 문제 때문에 로그인을 테스트 할 때 백 서버에 중복 값이 있다는 오류가 뜨면서 로그인이 되지 않는 오류가 발생하였다.

- mySQL 워크브랜치에서 중복이 허용되지 않은 값에 중복 값을 사용하는 계정들(row)를 삭제하여 오류를 해결하였다.
  
  ![](C:\Users\multicampus\AppData\Roaming\marktext\images\2022-07-22-00-23-16-image.png)
  
  - 스키마에서 user에 커서를 가져다 대면 차트 같은 아이콘이 나타난다.
  
  - 그 아이콘을 클릭하면 오른쪽 화면서 사진과 같이 테이블에 기록된 데이터가 나타난다.
  
  - row 삭제를 위해서는 row를 선택하고 우클릭을 하면 Delete row 메뉴가 나온다.
  
  - 삭제 후 Apply를 눌러야 적용이 된다.



## 4. 회원가입 폼을 만들 때의 고민

- 폼의 유효성 체크를 어떻게 했는지 기억이 나지 않는다.

- 지금 코드로는 userid하나만 입력하고 제출을 눌러도 회원가입이 된다.

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
  
  => router를 히스토리 모드로 변경하면 #를 없앨 수 있다.
  
  ```js
  // router/index.js
  import { createRouter, createWebHistory } from 'vue-router'
  ...
  const router = createRouter({
    history: createWebHistory(),
    routes: routes
  })
  ```

## 

## 3. mysql Data수정

- 회원 가입 기능을 테스트 하면서, 같은 메일을 사용하는 계정이 두개 생기게 되었다. 

- 위의 중복 문제 때문에 로그인을 테스트 할 때 백 서버에 중복 값이 있다는 오류가 뜨면서 로그인이 되지 않는 오류가 발생하였다.

- mySQL 워크브랜치에서 중복이 허용되지 않은 값에 중복 값을 사용하는 계정들(row)를 삭제하여 오류를 해결하였다.
  
  ![](C:\Users\multicampus\AppData\Roaming\marktext\images\2022-07-22-00-23-16-image.png)
  
  - 스키마에서 user에 커서를 가져다 대면 차트 같은 아이콘이 나타난다.
  
  - 그 아이콘을 클릭하면 오른쪽 화면서 사진과 같이 테이블에 기록된 데이터가 나타난다.
  
  - row 삭제를 위해서는 row를 선택하고 우클릭을 하면 Delete row 메뉴가 나온다.
  
  - 삭제 후 Apply를 눌러야 적용이 된다.

## 

## 4. 회원가입 폼을 만들 때의 고민

- 폼의 유효성 체크를 어떻게 했는지 기억이 나지 않는다.

- 지금 코드로는 userid하나만 입력하고 제출을 눌러도 회원가입이 된다.

- 이메일 중복검사 기능을 추가하였지만, 한번 중복검사를 하고 다른 이메일을 다시 입력하면 중복된 이메일로 회원가입을 할 수 있다. => keyup등의 이벤트를 이용하여 이벤트가 감지되면 중복확인 결과를 다시 false로 바꿀 수 는 있을 것 같은데, 이게 효율적인 방법인지에 대한 의문이 있다.

## 

## 5. 비밀번호확인 함수와 관련된 고민

- password를 두번 입력해 비밀번호를 잘 확인했는지 확인하는 작업을 회원 가입 할 때만 하면 된다고 생각하고, 처음에는 회원가입폼 컴포넌트에 함수를 구현했었다.

- 하지만 이 작업을 회원가입, 비밀번호를 알 때의 비밀번호 변경, 비밀번호를 모를 떄의 비밀번호 변경 총 3개의 컴포넌트에서 해야한다는 것을 깨닫고 vuex store 안에다가 이 함수를 넣어야 하나, 그럼 state에는 뭘 넣어야 하나 굉장히 고민이 되었다.

- 사실 복사 붙여넣기를 두번 하는 것이 편하지만, 유지보수를 위해 vuex store의 account모듈 안에다가 이 기능을 구현하기로 했다.

- `@keyup="passwordCheck(userData.password, userData.password2 })` passwordCheck이라는 action 함수로 데이터 입력된 두개의 비밀번호를 넘겨주고, 두개가 일치하면 state에 passwordCheck를 false에서 true로 바꿔주는 로직을 작성했지만, password2가 account모듈로 넘어오지 않았다. 
  
  - 데이터를 묶어 하나의 데이터로 보내 해결할 수 있었다.
  
  - `@keyup="passwordCheck( { password : userData.password, password2 : userData.password2 })`

## 

## 6. vuex 고민

- 새로고침하면 store.state에 넣어뒀던 데이터들이 사라진다.
  
  - localstorage등에 저장하면 새로고침에도 문제가 없겠지만, 그런식으로 활용해도 보안상 괜찮을지 걱정이다.
  
  - 또 어느 정보까지 localstorage에 저장해둬도 될까 싶은 고민이 있다.

- store에 대부분의 정보를 저장해 두는 것이 맞나 의문이 든다.
  
  - 닉네임 중복 체크가 필요한 컴포넌트가 2개인데, 함수를 store에 만들고 state에 체크를 했는지를 저장하여 또 컴포넌트에서 이를 불러와서 사용하는게 맞나?



## 7. eslint 설치

- --save :   package.json의 dependency 항목에 모듈을 추가하는 옵션

## 

## 8. vue3 router children

- 마이페이지에 속하는 컴포넌트들이 MyPageBasicView 안에서 랜더링 될 수 있도록 vue router에 children 속성을 주었다.
  
  그 후 MyPageBasicView의 템플릿에 router-view를 달아주었다.
  
  ```javascript
    // src/router/index.js
    { 
      path: '/auth/mypage/basic-info/', 
      name: 'MyPageBasicView', 
      component: MyPageBasicView,
      children : [
        { path: '/auth/mypage/change-password/', name: 'MyPageEditPasswordView', component: MyPageEditPasswordView },
        { path: '/auth/mypage/change-interest/', name: 'MypageEditInterestView', component: MyPageEditInterestView },
        { path: '/auth/mypage/change-language/', name: 'MyPageEditLanguageView', component: MyPageEditLanguageView },
      ],
    },
  ```
  
  ```html
  views/Account/MyPageBasicView
  <template>
    <div>
      <h1>MyPageBasicView.vue</h1>
      <MyPageNavigation/>
      <button @click="withdrawal">탈퇴</button>
      <router-view/>
    </div>
  </template>
  ```



## 9. v-chip

- vuetify에는 v-chip이라는 컴포넌트가 있는데, 누르면 선택되고 다시 누르면 비선택 상태로 바뀌는 버튼이다. 
  
  ```html
  <template>
  <v-chip-group v-model="userInterest" column multiple>
  	<v-chip v-for="interest in InterestList" :key="interest">
  		{{ interest }}
      </v-chip>
  </v-chip-group>
  </template>
  ```
  
  ```javascript
  export default {
      name: 'InterestEditForm',
      data() {
  	    return {
  		    userInterest: [],
  	    }
      }
  }
  ```

- 위 코드만으로도 interest를 누르면 data에 interestList의 클릭한 interest 인덱스가 추가되고, 선택한 것을 다시 클릭하면 해당 인덱스가 userInterest 배열에서 빠지게 된다.

- 위 코드에서 userInterest안에 들어 있는 값이면 선택 상태(진한색) 으로 랜더링되고, userInterest안에 없는 값이면 비 선택 상태(연한색)으로 보이게 된다.

- 만약 userInterest를 수정하는 상황이라면, 이전에 유저가 선택했던 interest 정보를 불러와 userInterest안에 키값(InterestList 인덱스)을 넣어두면, 이번에 유저가 선택하지 않았더라도 선택된 상태로 보이게 된다.

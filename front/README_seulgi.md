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

- 이메일 중복검사 기능을 추가하였지만, 한번 중복검사를 하고 다른 이메일을 다시 입력하면 중복된 이메일로 회원가입을 할 수 있다. => keyup등의 이벤트를 이용하여 이벤트가 감지되면 중복확인 결과를 다시 false로 바꿀 수 는 있을 것 같은데, 이게 효율적인 방법인지에 대한 의문이 있다.

## 

## 5. 비밀번호확인 함수와 관련된 고민

- password를 두번 입력해 비밀번호를 잘 확인했는지 확인하는 작업을 회원 가입 할 때만 하면 된다고 생각하고, 처음에는 회원가입폼 컴포넌트에 함수를 구현했었다.

- 하지만 이 작업을 회원가입, 비밀번호를 알 때의 비밀번호 변경, 비밀번호를 모를 떄의 비밀번호 변경 총 3개의 컴포넌트에서 해야한다는 것을 깨닫고 vuex store 안에다가 이 함수를 넣어야 하나, 그럼 state에는 뭘 넣어야 하나 굉장히 고민이 되었다.

- 사실 복사 붙여넣기를 두번 하는 것이 편하지만, 유지보수를 위해 vuex store의 account모듈 안에다가 이 기능을 구현하기로 했다.

- `@keyup="passwordCheck(userData.password, userData.password2 })` passwordCheck이라는 action 함수로 데이터 입력된 두개의 비밀번호를 넘겨주고, 두개가 일치하면 state에 passwordCheck를 false에서 true로 바꿔주는 로직을 작성했지만, password2가 account모듈로 넘어오지 않았다. 
  
  - 데이터를 묶어 하나의 데이터로 보내 해결할 수 있었다.
  
  - `@keyup="passwordCheck( { password : userData.password, password2 : userData.password2 })`
    
    

## 6. vuex 고민

- 새로고침하면 store.state에 넣어뒀던 데이터들이 사라진다.
  
  - localstorage등에 저장하면 새로고침에도 문제가 없겠지만, 그런식으로 활용해도 보안상 괜찮을지 걱정이다.
  
  - 또 어느 정보까지 localstorage에 저장해둬도 될까 싶은 고민이 있다.

- store에 대부분의 정보를 저장해 두는 것이 맞나 의문이 든다.
  
  - 닉네임 중복 체크가 필요한 컴포넌트가 2개인데, 함수를 store에 만들고 state에 체크를 했는지를 저장하여 또 컴포넌트에서 이를 불러와서 사용하는게 맞나?
    
    

## 7. eslint 설치

- --save :   package.json의 dependency 항목에 모듈을 추가하는 옵션
  
  

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

 

## 9. vue & firebase

- 파이어베이스 버전별 문법이 상이하여 도대체 vue 컴포넌트에서 firebase를 어떻게 import 해야 하는지를 모르겠다.

- [시도 1. 코딩애플 firebase로 당근마켓 만들기](https://www.youtube.com/watch?v=bJ-33ANIScE&list=PLfLgtT94nNq3PzZinqs9Afuiai--r5NB_&index=2)
  
  - 이 강의를 따라 index.html에 스크립트 등을 넣었을 때 vue컴포넌트에서 firebase를 import할 수 없었다.

- 시도 2.  [FIREBASE STORAGE – UPLOAD, DOWNLOAD, AND DELETE(September 29, 2021](https://adnan-tech.com/upload-download-and-delete-in-firebase-storage-vue-js/))
  
  - 업로드 로직이 필요한 프로필 컴포넌트에서 진행했지만 
    
    `ERROR in external "https://www.gstatic.com/firebasejs/9.9.1/firebase-storage.js"
    The target environment doesn't support dynamic import() syntax so it's not possible to use external type 'module' within a script`
    
    라는 에러가 발생한다
  
  - 찾아보니 누군가 "Dynamic imports only works since ES2020"라고 하는 것을 봤다.
  
  - 자바스크립트 버전 확인을 어떻게 하는지 검색해 봤더니 브라우저마다 버전이 다르다고 하는 것 같다. 
  
  - 혹시나 해서 script테그에서 type="module"을 지워봤지만 해결되지 않았다.
    
    ```js
    <template>
    <div>
      <form id="upload-form">
        <input type="file" name="file">
        <input type="submit" value="Upload">
      </form>
    </div>
    </template>
    
    <script type="module">
      import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
      import { getStorage, ref as stRef, uploadBytes } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-storage.js"
      import { getDatabase, ref as dbRef, push, set } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-database.js"
      const firebaseConfig = {
        apiKey: "",
        authDomain: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: "",
        measurementId: ""
      };
      const app = initializeApp(firebaseConfig);
      const storage = getStorage(app)
      const database = getDatabase()
      const databaseReference = dbRef(database, "files")
      window.addEventListener("load", function() {
        document.getElementById("upload-form").addEventListener("submit", function() {
          event.preventDefault()
          var form = event.target
          var file = form.file.files[0]
          const storageRef = stRef(storage, "files/" + file.name)
          uploadBytes(storageRef, file).then(function (snapshot) {
            var newFileRef = push(databaseReference)
            set(newFileRef, {
              "name": file.name
            })
            console.log(snapshot)
          })
        })
      })
    </script>
    <style></style>
    ```

- [시도3 Firebase공식문서 _ web version 8 ](https://firebase.google.com/docs/storage/web/start?authuser=0)
  
  - `export 'default' (imported as 'firebase') was not found in 'firebase/app' (possible exports: FirebaseError, SDK_VERSION, _DEFAULT_ENTRY_NAME, _addComponent, _addOrOverwriteComponent, _apps, _clearComponents, _components, _getProvider, _registerComponent, _removeServiceInstance, deleteApp, getApp, getApps, initializeApp, onLog, registerVersion, setLogLevel)` 이라는 노란색 오류가 떴다. 
  
  - 웹 콘솔창에는 `Uncaught TypeError: Cannot read properties of undefined (reading 'initializeApp')`오류가 출력되고 아무것도 랜더링 되지 았았다.
    
    ```javascript
    // main.js
    import { createApp } from 'vue'
    import App from './App.vue'
    import router from './router'
    import store from './store'
    import vuetify from './plugins/vuetify'
    import { loadFonts } from './plugins/webfontloader'
    import firebase from 'firebase/app'
    
    const firebaseConfig = {
        // 생략
    }
    firebase.initializeApp(firebaseConfig)
    
    loadFonts()
    
    createApp(App)
      .use(router)
      .use(store)
      .use(vuetify)
      .mount('#app')
    ```
    
    ```js
    <template>
      <div>
        <input type="file" id="image">
      </div>
    </template>
    
    <script>
    import firebase from 'firebase/app'
    import 'firebse/storage'
    export default {
      methods: {
        upload() {
          const storage = firebase.storage();
          var file = document.querySelector('#image').files[0];
          var storageRef = storage.ref();
          var mypath = storageRef.child('image/' +  file.name);
          mypath.put(file)
        }
      }
    }
    </script>
    <style></style>
    ```
  
  - 블로그 등에서 많이 본 코드처럼 main.js에서 `import firebase from 'firebase/app'`를 `import firebase from 'firebase'`로 바꿨더니 `Module not found: Error: Package path . is not exported from package C:\Users\multicampus\Desktop\pj\S07P12B308\front\node_modules\firebase`라는 오류가 뜬다
  
  - 검색해보니 `import firebase from 'firebase/compat/app'`으로 수정하면 된다고 한다.
  
  - 수정 후 오류도 안뜨고 저장도 안되길래 의아했는데, 만든 메서드를 실행시키는 버튼이 없다는 것을 알았다.  저장 성공!!
    
    ```javascript
    <template>
      <div>
        <input type="file" id="image">
        <button @click="upload()">저장</button>
      </div>
    </template>
    
    <script>
    import firebase from 'firebase/compat/app'
    import 'firebase/compat/storage'
    
    export default {
      methods: {
        upload() {
          const storage = firebase.storage();
          var file = document.querySelector('#image').files[0];
          var storageRef = storage.ref();
          var spaceRef = storageRef.child('image/' +  file.name);
          spaceRef.put(file).then((snapshot)=> {
            console.log('uploaded', snapshot)
          })
        }
      }
    }
    </script>
    
    <style scoped></style>
    ```

 

## 10. 사라진 코드

- 관심사 등록이 잘 되는걸 분명 확인했었는데, 오늘 갑자기 안되서 다시 보니 열심히 만들었던 관심사 관련 코드가 사라져있었다. 

- firebase를 하기 전에 dev에 머지를 하고 진행했어야 하는데, 문제 없을 것이라 생각하고 firebase오류 때문에 브랜치를 생성했다 지웠다하다 코드가 분실된 듯 하다.

- 한 기능이 완료되면 머지를 꼭 하자!
  
  

## 11. ERR_CERT_COMMON_NAME_INVALID

- 현상 : 포스트맨으로는 로그인 요청이 성공하나, 프론트 서버를 크롬으로 연 후 로그인을 요청하면 콘솔에 `ERR_CERT_COMMON_NAME_INVALID` 에러, network에러가 출력되며 로그인이 되지 않음

- 시도1 : [ip reset](https://geekmindset.net/ko/chrome%EC%97%90%EC%84%9C-err_cert_common_name_invalid-%EC%88%98%EC%A0%95)
  
  - 위 블로그에서 알려준대로 cmd창에 아래 명령어를 입력 후 재부팅 하였지만 실패
    
    ```bash
    ipconfig /flushdns
    nbtstat –r
    netsh int ip reset
    netsh winsock reset
    ```

- 시도2 : [크롬 보안설정 변경과 인터넷사용기록 삭제](https://geekingup.org/ko/chrome%EC%97%90%EC%84%9C-err_cert_common_name_invalid-%EC%98%A4%EB%A5%98%EB%A5%BC-%EC%88%98%EC%A0%95%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95)
  
  - 위 블로그에서 알려준 대로 크롬 설정을 변경하고 인터넷 사용기록 삭제, 시간대 변경 등을 해 보았으나 실패

- 시도3: 이 외에도 뭔가 이것 저것 해봤지만 실패

- 시도4: 이게 서버문제인가 프론트 문제인가, 크롬의 문제인가 고민하다 크롬에서 백 url로 직접 접속해봄. => 인증 에러가 콘솔이 아니라 브라우저 창에 띄워짐. => 설정 허용 이런거 하니 프론트에서도 성공적으로 요청을 보낼 수 있게 되었다.

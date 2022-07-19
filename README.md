# S07P12B308

1. npm i
2. npm run serve

---
0719.
## 1. [vuex] unknown action type 오류
store/index.js에서 store/modules/accounts안의 action을 불러오지 못하는 것 같았다.
vue3의 vuex 사용이 미숙했다.
아래의 블로그를 보며 해결할 수 있었다.(thanks 영환)
https://kyounghwan01.github.io/blog/Vue/vue3/composition-api-vuex/#vuex-%E1%84%89%E1%85%A6%E1%84%90%E1%85%B5%E1%86%BC-%E1%84%86%E1%85%B5%E1%86%BE-store-module-1%E1%84%80%E1%85%A2%E1%84%85%E1%85%A9-%E1%84%89%E1%85%B5%E1%86%AF%E1%84%92%E1%85%A2%E1%86%BC

의외로 store/index.js에서는 별 문제가 없었고, store/modules/accouts안의 문법이 문제였다.
store/index.js와 마찬가지로 export default createStore({})로 되어있던 부분을
export const accounts = ({})형태로 바꾸니 해결되었다.
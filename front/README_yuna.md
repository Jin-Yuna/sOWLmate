

### 1. ESLint와 prettier 적용

- eslint?
  
  ESLint는 더 일관성있게 코드를 작성하고 버그를 식별 및 회피할 목적으로 ECMAScript / JavaScript 코드에서 발견된 패턴을 개발자에게 알려주기 위한 도구
  
  - vue-cli v3.xx 이상 -> 자동 eslint 추가됨

- prettier
  
  ESLint가 제공하는 formatting보다 더 강화된 formatting을 제공
  
  ESLint가 자동으로 고쳐주는 것보다 더 많은 범위내에서 formatting을 고쳐줌
  

#### 1-1) dev 의존성에 prettier와 eslint와 prettier를 통합으로 사용할 패키지 두 개 추가

   `npm i prettier eslint-config-prettier eslint-plugin-prettier --save-dev` 

- eslint-config-prettier : Prettier 설정과 충돌 나는 ESLint의 설정을 비활성화하는 역할

- eslint-plugin-prettier : ESLint 안에서 Prettier 검사를 실행하도록 설정 -> Prettier 검사 결과를 ESLint 검사 결과처럼 보여주도록 함



#### 1-2) .eslintrc.json

```json
{
  "extends": ["plugin:prettier/recommended"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error
  }
}
```

- `"extends": ["prettier"]` : Prettier 설정과 충돌 나는 ESLint의 설정을 비활성화 → eslint-config-prettier 패키지의 기능
- `"plugins": ["prettier"]` : eslint-plugin-prettier 플러그인을 등록 → eslint-plugin-prettier 패키지의 기능
- `"prettier/prettier": "error"` : ESLint 안에서 Prettier 검사를 실행하도록 설정. → eslint-plugin-prettier 패키지의 기능



#### 1-3) .prettierrc

```json
{    
  "printWidth": 80,
  "singleQuote": true,
  "quoteProps": "consistent",
  "arrowParens": "always",
  "semi": true,
  "trailingComma": "all",
  "tabWidth": 2,
  "useTabs": false,
  "endOfLine": "auto"
}
```

- `"printWidth": 80` : 한 줄의 최대 길이를 80글자로 제한, 넘어가면 개행

- `"singleQuote": true` : 문자열 표현 시 작은따옴표를 사용하도록 제한

- `"quoteProps": "consistent"` : 객체 내에서 key에 따옴표 적용 여부를 일관되게 설정

- `"arrowParens": "always"` : 화살표 함수에서 매개변수 전달 시 항상 괄호 사용

- `"semi": true` : 코드 마지막에 항상 세미콜론 사용

- `"trailingComma": "all"` :  트레일링 콤마 항상 사용 => 원소의 순서를 재배열하거나 이후 새로운 원소를 추가할 때에 보다 깔끔한 변경사항을 가질 수 있음

- `"tabWidth": 2` : 들여쓰기 너비 2

- `"useTabs": false` : 탭 사용 여부

- `"endOfLine": "auto"` : 기존의 CRLF, LF 문자를 유지 / 이를 설정해주지 않으면 디폴트 값인 `"lf"`으로 설정되기 때문에 개행 문자로 CRLF를 사용하는 Windows에서는 에러가 발생
  

#### 1-4) default formatter 지정 + 저장을 눌렀을 때 자동 포매팅

   `ctrl + shift + p` => `Preferences: Open Settings`

```json
// settings.json
    //기본 포멧팅 설정
    // prettier 파일이 없을 때 VS Code prettier 플러그인에 내장되어있는 default 값으로 포매팅 
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    //자동포멧팅
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "editor.formatOnSave": false,
```



#### +) eslint + prettier을 적용하고, 자동 수정을 적용했을 때 `module.exports`에 오류가 남

why? )

- 노드는 코드를 모듈로 만들 수 있다는 점에서 브라우저의 자바스크립트와 다름

- 아래의 `require, module.exports` 는 ES2015 이전의 문법이고, ES2015 버전의 문법은 `import, export default` 

헤결 ) 

```
// .eslintrc.json
"env": {
    "node": true 
  },
```

추가 했더니 해결됨!



### 2. vuetify & scss 설정

> Vuetify에서 scss를 이용해 특정 스타일을 지정하고 바꿀 수 있고, 프로젝트에서 css 대신 scss를 이용해 변수, mixin, placeholder 등을 통해 간편하게 스타일을 적용 할 예정
> 
> [Vuetify — A Material Design Framework for Vue.js](https://vuetifyjs.com/en/features/sass-variables/)

**폴더 구조**

- **layouts** : 웹페이지 전체를 구성하는 레이아웃에 대한 CSS
- **pages** : 로그인, 매인화면 등등 개별로 존재하는 화면에 대한 CSS
- **templates** : 여러 개의 Components로 구현된 해당 웹사이트에 특화된 템플릿에 대한 CSS
- **components** : 버튼, 인풋박스, 컨테이너 등등.. 개별 컴포넌트에 대한 CSS
- **commons.scss** : 웹사이트에 공통적으로 적용되는 CSS
- **_index.scss** : 위의 모든 SCSS를 한곳으로 모으는 CSS (단, variables.scss는 여기에 포함되지 않음)
- **variables.scss** : 모든 SCSS 파일에서 사용할 변수에 대한 정의만 작성

#### 2-1) variables.scss

> 프로젝트 전체에 적용되는 변수에 대해 정의
> 
> 컴포넌트 갯수 만큼 실행되기 때문에 변수에 대해서만 정의해야 함(실제 CSS에 대한 적용은 _index.scss에 작성)
> 
> vue.config.js에 설정

- path: `src/styles/variables.scss`

- `src/styles/`폴더 안에 `variables.scss`를 만든 뒤 vuetify component들의 스타일을 지정하면 vuetify에서 알아서 불러옴

---------------------

**전역 폰트 : AppleSDGothicNeo**

- Supported Weights

`100` **Thin**  
`200` **UltraLight**  
`300` **Light**  
`400` **Medium**  
`500` **Regular**  
`600` **SemiBold**  
`700` **Bold**  
`800` **ExtraBold**  
`900` **Heavy**

- Font Families

`Apple Sandoll Gothic Neo`

- HTML

```html
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/font-applesdgothicneo@1.0/all.min.css">
```

- CSS

```css
@import "//cdn.jsdelivr.net/npm/font-applesdgothicneo@1.0/all.min.css";
```

------------------------------------------

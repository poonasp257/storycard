# Collaborative Art Game

<img src="https://user-images.githubusercontent.com/39629336/102609981-c196e880-416f-11eb-986f-be667a6216f8.PNG" width="800" height="600">
<img src="https://user-images.githubusercontent.com/39629336/102609988-c360ac00-416f-11eb-9077-29075ad66cc8.PNG" width="800" height="600">
<img src="https://user-images.githubusercontent.com/39629336/102609990-c491d900-416f-11eb-9cee-21160c8f4799.PNG" width="800" height="600">

[![Video Label](https://img.youtube.com/vi/QJoj0kP6ih8/0.jpg)](https://youtu.be/QJoj0kP6ih8)
# School of Games, Hongik University, Sejong South Korea
# Project Members
**Hyun-Jee Kim, Byung-Chull bae  
Jun-Young Lee, O-Neul, Hye-Rin Lee**

# 목차 
1. 서론
    1. 진행 방식
    2. 사용된 기술  
    3. 라이브러리  
1. 사용된 기술
1. 라이센스

# Tech
## Front-End
HTML5, CSS3, React.js

## Back-End
Node.js(Express.js), MongoDB

## Used Library, Middleware and Moduels
Mongoose  
React Redux  
React Router Dom  
Styled Components  
Axios  
Socket.io  
Immutable.js  
... 

## Folder Structure
* client
    * node_modules
    * build
    * public
    * src
        * components
        * containers
        * lib
        * modules
        * resources
        * shared
    * index.js
* server
    * logs
    * node_modules
    * src
        * models
        * modules
        * routes
    * main.js

# How To Run
## Client
```
in directory: your repository path...\client
> yarn build
```

## Server
```
in directory: your repository path...\server
1.development mode
> yarn start:dev
2.service mode
> yarn start
```    
    
# Instruction
 사람들이 고민을 나타내는 삼각형 모양의 아이콘 혹은 해당하는 아이콘이 없다면 포스트잇을 작성하여 게시판에 붙이면
다른 사람들이 원형 모양의 아이콘을 그 위에 붙이는 것으로 고민을 게시한 사람에게 공감 혹은 해결책을 제시하는 방식으로 진행되는 게임.

# Developing Note
 게임 특성상 접근성이 가장 중요하다고 생각했고 유저가 SNS처럼 PC, 모바일에 구애받지 않고 언제 어디서든 접근 할 수 있다는 점에서 웹 플랫폼을 채택하게 됐다. 
또한 아이콘, 포스트잇 등 데이터의 저장과 그에 맞는 상호작용이 필요했기에 백엔드와 DB를 포함하여 개발했다.

 게임을 구현하기에 앞서 필요한 것들을 정리한 것이다.  
**1. Web을 기반으로 제작한다.**  
**2. 유저와 유저가 실시간으로 상호작용을 할 수 있어야 한다.**  
**3. 모든 유저는 익명을 보장하지만 자신이 작성한 포스트잇만 편집, 삭제할 수 있어야 한다.**  
**4. 유저가 붙인 포스트잇 혹은 아이콘들에 대한 데이터를 저장해야 한다.**  

 낯선 웹 개발을 무작정 시작하며 가장 먼저 고민한 것은 어떠한 언어로 개발할 것인가였다. 그러다 우연히 Javascript라는 언어를 만나게 됐다.
C/C++와 비슷한 부분도 많았고 프론트 엔드, 백 엔드 모두 JS로 개발할 수 있다는 것이 마음에 들었다.

## FrontEnd  
### Start from scratch
![image4](https://user-images.githubusercontent.com/39629336/71548113-fce35900-29ec-11ea-9951-7e8a7195db08.JPG)  
![image5](https://user-images.githubusercontent.com/39629336/71548167-ad515d00-29ed-11ea-809c-bc30eeb65bd3.JPG)

 웹에 대한 지식이 거의 없었기에 밑바닥부터 시작하게 됐다. JS는 주로 쓰던 객체지향 언어가 아닌 프로토타입 기반의 언어라서 클라이언트 구조를 설계하는 것이 어려웠다. 이해도가 낮기도 했고 만들면서 배워보자라는 생각으로 라이브러리를 사용하지 않고 JS만을 사용해서 핵심 기능을 우선적으로 개발하며 프로토타입을 완성했다. Drag & Drop 기능을 직접 구현하면서 object에 대한 이해, 다른 DOM에 대한 접근 등 HTML 구조와 JS에 대해 전반적으로 이해할 수 있었고 생활 코딩 사이트에서 참고하며 많은 도움을 얻었다. 

### Vanila Javascript ? React.js!
 HTML과 JS의 불편함을 해소시켜줄 수단으로 **React.js**가 가장 적절했다. JS의 문법과 상당히 유사하고 생산성은 물론 확장성까지 얻을 수 있었기에 React.js는 그런 내 요구사항과 부합했다. 또한, **Virtual DOM**이라는 개념을 사용하여 변화가 있는 부분만 렌더링을 하므로 성능적 이점도 있다.   

React에서는 **Component**라는 개념을 사용한다. Component는 각각 **state**를 가지고 state의 변화에 따라 개별적으로 동작하고 렌더링된다. 객체지향에서 흔히 볼 수 있는 class처럼 정해진 life-cycle에 따라 생성되고 소멸되며 추상화의 개념을 적용시킬 수 있다. 다만, 상속보다는 Component와 Component의 조합으로 구성하는 것이 일반적이다.   
```
class Box extends Component {
    constructor(super) { // 생성자
        this.state = { // Component가 가지는 상태, 만약 값에 변화가 없다면 다시 렌더링 되지 않는다.
            
        }
    }

    render() { 
        // 실질적으로 DOM으로 변환되어 웹페이지 상에서 렌더링되는 부분. JSX라고 한다.
        // HTML의 태그와 상당히 유사한 형태로 보이지만 HTML도 문자열도 아닌 JSX라는 javascript의 문법을 확장한 것
        return (
            <div>
                Hello World!!
            </div>
        );
    }
}

```

![react8-1](https://user-images.githubusercontent.com/39629336/103445445-7fb18a80-4cb7-11eb-8fec-671517d92593.png)

 React는 기본적으로 **단방향 흐름 구조**로 상위 Component에서 하위 Component로 위에서 아래로 생성되어 랜더링되고 **Props**라는 인자들을 넘겨주어 이벤트를 발생시킨다. React 역시 내부적으로 DOM을 사용하는데 div와 같은 Element들로 이루어진 **트리 구조**이다. 이 Element들을 Node라고 하며 최상위 Root Node를 기준으로 트리 구조를 띄기 때문에 부모 Node는 자식 Node들을 감싸는 형태이다. 각 Node 간의 데이터 전달이 필요한 경우가 있는데 앞서 말한 단방향 흐름 구조이므로 부모 Node에서 자식 Node로의 데이터 전달은 가능하나, 자식 Node에서 부모로 혹은 자식 Node 간의 데이터 전달은 불가능하다. 그래서 개발을 하다가 이러한 경우가 상당히 많이 발생했고 최대한 다른 방법으로 구현하려고 했으나, 필요한 경우가 분명히 있었다. 그러다가 찾은 해결책은 **Redux** 라는 라이브러리이다. React는 앞서 언급했듯 단방향 흐름 구조인데, 이는 양방향 데이터 흐름 구조인 **MVC 구조**와 대조되는 **Flux**와 비슷한 구조로 만들어져있다. 
하나의 Store를 두고 Component는 Action을 통해 Store의 State를 업데이트시키고 다른 Component는 Store를 관찰하다가 Store의 State가 변화된 것을 확인하고 그것에 맞게 자신의 State를 변화시킨다는 것이다. Redux 을 도입하면서 자칫 스파게티 코드로 이어질 수 있었던 상황을 피할 수 있었다. 

### Styled Component
 React도 결국 HTML을 사용하기 때문에 Style을 주기 위해서는 CSS를 써야 한다. CSS 코드를 따로 파일로 분리하여 사용하는 것이 일반적인데 CSS 문법 자체가 className 혹은 id 등의 값으로 하나 혹은 그 이상의 그룹으로 Style을 주는데 div와 같은 Element들이 많아지면 많아질수록 각 Element를 구분 짓기 어려워지는 것은 물론이고 CSS 코드가 길어지며 파일도 많아져 결과적으로 해당 Element가 어떤 Style 값을 갖는지 확인하기 어려워진다. 그래서 이러한 문제를 해결하고자 개발된 것이 Styled Component라는 라이브러리이다. 기본적으로 React.js 기반으로 만들어졌다.

>일반적인 CSS를 활용한 코드  

Button.css
```
.icon-button {    
   float: left;
   padding: 3px 4px 3px 5px;
   border-radius: 30px 0px 0px 30px; 
   cursor: pointer;
   color: #fefae7;
   background-color: #e83c18;
}

.icon-button:hober {
    color: #e83c18;
    background-color: #fefae7;
}
```

Button.js
```
import Icon from './Icon';

class Button extends Component {
    render() {
        return (
            <div className="icon-button">
                <Icon type={this.props.type} size="24px"/>
            </div>
        );
    }
}
```

>Styled Component 사용한 코드  

Button.js
```
import Icon from './Icon';

const Container = styled.div`
   float: left;
   padding: 3px 4px 3px 5px;
   border-radius: 30px 0px 0px 30px; 
   cursor: pointer;
   color: #fefae7;
   background-color: #e83c18;

   :hover {
       color: #e83c18;
       background-color: #fefae7;
   }
`;

class Button extends Component {
    render() {
        return (
            <Container>
                <Icon type={this.props.type} size="24px"/>
            </Container>
        );
    }
}
```

 Element에 Style을 주고 이를 Component로 만들어서 사용하기 때문에 파일을 별도로 만들지 않아도 됐고 Element가 어떤 Style 값을 가졌는지 확인하기 훨씬 수월했다. 

## BackEnd
### Beginning
 클라이언트 사이드를 어느정도 구현 하고나서 서버 사이드를 구현하고자 했다. 생각보다 개발 기간이 길어져서 최대한 학습 시간보단 개발에 시간을 투자하고 싶었다.서버 사이드 언어로 PHP, ASP, JSP, Python, Ruby 등 다양한 선택지가 있었지만 프론트엔드와 백엔드를 오가며 개발하기엔 언어를 일치시키는 편이 낫다고 판단했다. 
그렇게 Javascript를 기반으로 하는 Node.js를 서버 사이드 언어로 선택하게 됐다.

 Node.js는 기본적으로 단일 스레드의 이벤트 루프와 Non-blocking IO를 지원하기 때문에 멀티 스레드 환경에서 발생할 수 있는 문제를 배제하고 동시 접속에 대한 처리도 가능했기에 개발 시 요구사항과 부합했다. 또한, 몇 줄 안 되는 코드로 컨텐츠를 구현할 수 있었기 때문에 유지보수도 그리 어렵지 않을 것 같다.
 
### Real time interaction
 단순한 웹 서비스를 제공하는 웹 페이지를 개발하는 게 아니라 게임을 개발하는 것이었기 때문에 실시간으로 유저 간의 상호작용이 핵심적이라고 생각했다. 개발 초기에는 AJAX를 주고받는 REST API만으로 로그인, 회원가입, 인게임 모두 처리했었다. 로그인과 회원가입 같은 경우에는 서버와 클라이언트의 1:1 상호작용이므로 REST 방식으로도 충분했으나 인게임에서 아이콘을 붙이고 포스트잇을 작성하는 행동은 자신을 제외한 다른 유저에게도 동시에 보여줘야 하므로 REST 방식으로는 이를 충족시킬 수 없었다. 물론 새로 고침을 통해서 새로운 아이콘이나 포스트잇의 정보를 불러오는 방법을 택할 수도 있었으나 실시간적인 상호작용이 있다면 게임을 통한 경험이 향상될 수 있다고 생각되어 Socket.io를 사용한 Web Socket 방식을 채택하게 됐다.
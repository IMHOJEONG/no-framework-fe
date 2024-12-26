# 웹 컴포넌트 

- 최신 브라우저에서 Web Component라고 하는 네이티브 API 세트를 사용해, 웹 애플리케이션의 컴포넌트를 작성할 수 있음 

## API

1. HTML 템플릿: template 태그는 콘텐츠가 렌더링되지는 않지만, JS 코드에서 동적인 콘텐츠를 생성하는 데 '스탬프'로 사용되도록 하는 경우에 유용

2. 사용자 정의 요소: 개발자가 완전한 기능을 갖춘 자신만의 DOM 요소를 작성할 수 있음 

3. shadow DOM: 웹 컴포넌트가 컴포넌트 외부의 DOM에 영향을 받지 않아야 하는 경우에 유용 (다른 사람들과 공유할 수 있도록 컴포넌트 라이브러리나 위젯을 작성하려는 경우 매우 유용)

`섀도우 DOM과 가상 DOM은 완전히 다른 두 문제를 해결, 섀도우 DOM은 캡슐화와 관련되고, 가상 DOM은 성능과 관련됨`

- https://develoger.com/shadow-dom-virtual-dom-889bf78ce701

## 사용자 정의 요소 

- 웹 컴포넌트의 핵심 요소 (예: `<app-calendar />`)

- 사용자 정의 요소 API를 사용해 사용자 정의 태그를 작성할 때는 대시로 구분된 두 단어 이상의 태그를 사용해야 함

- HTML 요소를 확장하는 자바스크립트 클래스일 뿐

https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#custom_element_lifecycle_callbacks

- connectedCallback: 사용자 정의 요소의 라이프사이클 메서드 중 하나 

    - 컴포넌트가 DOM에 연결될 때 호출됨 (리액트의 componentDidMount 메서드와 매우 유사)

        - 컴포넌트의 콘텐츠를 렌더링 or 타이머를 시작 or 네트워크에서 데이터를 가져오기

- disconnectedCallback: 컴포넌트가 DOM에서 삭제될 때, 정리 작업에서 유용한 메서드 

- 새로 생성된 컴포넌트를 사용하려면, 브라우저 컴포넌트 레지스트리에 추가해야 함 

    - window.customElements 속성의 define 메서드를 사용 

- 브라우저 컴포넌트 레지스트리에, 컴포넌트를 추가하는 것: 태그 이름을 사용자 정의 요소 클래스에 연결하는 것을 의미

## 속성 관리 

- 웹 컴포넌트의 가장 중요한 기능: 개발자가 어떤 프레임워크와도 호환되는 새로운 컴포넌트를 만들 수 있다는 것 

## attributeChangedCallback

- 컴포넌트의 라이프사이클 동안 속성이 변경되도록 attributeChangedCallback 메서드를 사용하는 것 

- attributeChangedCallback는 변경된 속성의 이름, 속성의 이전 값, 속성의 새로운 값이라는 세 가지 매개변수를 받음

- `모든 속성이 attributeChangedCallback을 트리거하지는 않으며, observedAttributes 배열에 나열된 속성만 트리거함`

- template 요소를 광범위하게 사용함 

- 사람들에게 익숙한 코드가 더 읽기 쉬운 코드가 됨 


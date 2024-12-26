# HTTP 요청 

- 프론트엔드 애플리케이션은 서버의 비동기 데이터도 제공

- AJAX 애플리케이션의 핵심: XMLHttpRequest 객체 (이 객체를 사용하면, HTTP 요청으로 서버에서 데이터를 가져올 수 있음)

- 비 AJAX 애플리케이션 

    - 브라우저 ---(HTTP 요청)---> 서버  / 서버 ---(HTML + CSS)---> 브라우저 

- 현대 AJAX 애플리케이션 

    - 브라우저 ---(HTTP 요청)---> 서버  / 서버 ---(JSON 데이터)---> 브라우저 

## REST(REpresentational State Transfer) 

- 웹 서비스를 디자인하고 개발하는 방법, 모든 REST API의 추상화는 리소스에 있음 

- 도메인을 리소스로 분할해야 하며, 각 리소스는 특정 URI로 접근해 읽거나 조작할 수 있어야 함 

    - 사용자를 조작하고자 동일한 URI가 사용되지만, HTTP 메서드는 달라짐 

- 데이터 교체(PUT) vs 데이터 업데이트(PATCH)

    - PUT 메서드: HTTP 요청의 본문에 모든 데이터를 전달해야 함 

    - PATCH 메서드: 이전 상태와의 차이만 포함

```js

import todos from './todos.js'

const NEW_TODO_TEXT = 'A simple todo Element'

const printResult = (action, result) => {
  const time = (new Date()).toTimeString()
  const node = document.createElement('p')
  node.textContent = `${action.toUpperCase()}: ${JSON.stringify(result)} (${time})`

  document
    .querySelector('div')
    .appendChild(node)
}

const onListClick = async () => {
  const result = await todos.list()
  printResult('list todos', result)
}

const onAddClick = async () => {
  const result = await todos.create(NEW_TODO_TEXT)
  printResult('add todo', result)
}

const onUpdateClick = async () => {
  const list = await todos.list()

  const { id } = list[0]
  const newTodo = {
    id,
    completed: true
  }

  const result = await todos.update(newTodo)
  printResult('update todo', result)
}

const onDeleteClick = async () => {
  const list = await todos.list()
  const { id } = list[0]

  const result = await todos.delete(id)
  printResult('delete todo', result)
}

document
  .querySelector('button[data-list]')
  .addEventListener('click', onListClick)

document
  .querySelector('button[data-add]')
  .addEventListener('click', onAddClick)

document
  .querySelector('button[data-update]')
  .addEventListener('click', onUpdateClick)

document
  .querySelector('button[data-delete]')
  .addEventListener('click', onDeleteClick)
```

- HTTP 클라이언트를 직접 사용하는 대신, HTTP 요청을 todos 모델 객체에 래핑함 (이러한 캡슐화는 여러 가지로 유용)

    - 1. 테스트 가능성: todos 객체를 정적 데이터 세트를 반환하는 mock(모의) 객체로 바꿀 수 있음 (독립적으로 테스트할 수 있음)

    - 2. 가독성: 모델 객체는 코드를 좀 더 명확하게 만듬 

- `컨트롤러에서 HTTP 클라이언트를 직접 사용하지 않는다. (모델 객체에서 캡슐화하는 것이 좋음)`

```js
import http from './http.js'

const HEADERS = {
  'Content-Type': 'application/json'
}

const BASE_URL = '/api/todos'

const list = () => http.get(BASE_URL)

const create = text => {
  const todo = {
    text,
    completed: false
  }

  return http.post(
    BASE_URL,
    todo,
    HEADERS
  )
}

const update = newTodo => {
  const url = `${BASE_URL}/${newTodo.id}`
  return http.patch(
    url,
    newTodo,
    HEADERS
  )
}

const deleteTodo = id => {
  const url = `${BASE_URL}/${id}`
  return http.delete(
    url,
    HEADERS
  )
}

export default {
  list,
  create,
  update,
  delete: deleteTodo
}
```

- HTTP 클라이언트의 서명: GET이나 DELETE 같이 본문이 필요 없는 메서드의 경우 http[verb](url, config)

    - 다른 메서드의 경우, http[verb](url, body, config) 서명을 사용해 매개변수로 요청 본문을 추가 가능

- http(url, verb, body, config)와 같이 동사를 매개변수로 추가해 http를 객체가 아닌 함수로 사용하는 방법도 있음 

    - 일관성을 유지해서 선택하자 

---

## XMLHttpRequest 

- W3C가 비동기 HTTP 요청의 표준 방법을 정의한 첫 번째 시도 (2006년에 정의된 API, 콜백 기반)

- 완료된 요청에 대한 onload 콜백, 오류로 끝나는 HTTP에 대한 onerror 콜백, 타임아웃된 요청에 대한 ontimeout 콜백

- xhr 객체의 timeout 속성을 수정하면, 타임아웃을 변경 가능 

```js
const request = params => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
  
      const {
        method = 'GET',
        url,
        headers = {},
        body
      } = params
  
      xhr.open(method, url)
  
      setHeaders(xhr, headers)
  
      xhr.send(JSON.stringify(body))
  
      xhr.onerror = () => {
        reject(new Error('HTTP Error'))
      }
  
      xhr.ontimeout = () => {
        reject(new Error('Timeout Error'))
      }
  
      xhr.onload = () => resolve(parseResponse(xhr))
    })
  }
```

- HTTP 클라이언트의 공개 API는 Promise를 기반으로 함 (request 메서드는 표준 XMLHttpRequest 요청을 새로운 Promise 객체로 묶는 이유임)

  - 공개 메서드 get, post, put, patch, delete: 코드를 더 읽기 쉽게 해주는 request 메서드의 래퍼(적절한 매개변수를 전달) 

## XMLHttpRequest를 사용한 HTTP 요청의 흐름 

- xhr 생성 ---> 초기화 ---> 구성 ---> 전송 ---> 대기 ---(요청 타임아웃)---> ontimeout 
                                               ---(요청 오류)---> onerror
                                               ---(요청 성공)---> onload

1. 새로운 XMLHttpReqest 객체 생성(new XMLHttpRequest())

2. 특정 URL로 요청을 초기화(xhr.open(method, url))

3. 요청(해더 설정, 타임아웃 등)을 구성 

4. 요청 전송(xhr.send(JSON.stringify(body)))

5. 요청이 끝날 때까지 대기 

  - 요청이 성공적으로 끝나면 onload 콜백 호출 

  - 요청이 오류로 끝나면 onerror 콜백 호출 

  - 요청이 타임아웃으로 끝나면 ontimeout 콜백 호출 

---

## Fetch 

- 원격 리소스에 접근하고자 만들어진 새로운 API

- Request나 Response 같은 많은 네트워크 객체에 대한 표준 정의를 제공하는 것 

  - 이러한 방식으로 이 객체는 ServiceWorker와 cache 같은 다른 API와 상호 운용 가능 

```js
if (status !== 204) {
  data = await response.json()
}

const response = await window.fetch(url, config)

```

- window.fetch가 Promise 객체를 반환하기 떄문에 더 읽기 쉬움 

  - 전통적인 콜백 기반의 XMLHttpRequest 접근 방식을 최신의 프라미스 기반으로 변환하기 위한 boilerplate 코드가 필요하지 않음 

- window.fetch에서 반환된 Promise는 Response 객체를 resolve

  - 서버가 보낸 응답 본문을 추출할 수 있음 (수신된 데이터의 형식에 따라, text(), blob(), json() 같은 다른 메서드를 사용)

- 실제 애플리케이션에서는 Content-Type 헤더와 함께 적절한 메서드를 사용해야 함 

---

## Axios

- 브라우저와 Node.js에서 바로 사용할 수 있다는 장점 (axios와 다른 방식과의 가장 큰 차이)

- axios의 API는 Promise를 기반으로 하고 있어, Fetch API와 매우 유사

- XMLHttpRequest, Fetch 보다 가장 읽기 쉬운 구현 




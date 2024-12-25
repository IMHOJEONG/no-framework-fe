let template

const createNewTodoNode = () => {
  if (!template) {
    template = document.getElementById('todo-item')
  }

  return template
    .content
    .firstElementChild
    .cloneNode(true)
}

const getTodoElement = (todo, index, events) => {
  const {
    text,
    completed
  } = todo

  const element = createNewTodoNode()

    element.querySelector('input.edit').value = text
    element.querySelector('label').textContent = text 

    if (completed) {
      element.classList.add('completed')
      element.querySelector('input.toggle').checked = true
    }

    const handler = e => events.deleteItem(index)

    // element.querySelector('button.destroy')
    //   .addEventListener('click', handler)
    element.querySelector('button.destroy')
      .dataset.index = index

    return element

    // 여기가 문제 
    // 일부가 DOM 요소 대신 문자열로 동작한다는 점
    // 문자열에는 이벤트 리스너를 추가할 수 없음 (DOM 노드 필요)
    // return `
    // <li ${completed ? 'class="completed"' : ''}>
    //   <div class="view">
    //     <input 
    //       ${completed ? 'checked' : ''}
    //       class="toggle" 
    //       type="checkbox">
    //     <label>${text}</label>
    //     <button class="destroy"></button>
    //   </div>
    //   <input class="edit" value="${text}">
    // </li>`;
};

export default (targetElement, { todos }, events) => {
  const newTodoList = targetElement.cloneNode(true)
  newTodoList.innerHTML = ''
  todos
    .map((todo, index) => getTodoElement(todo, index, events))
    .forEach(element => {
      newTodoList.appendChild(element)
    })

    // 이전의 컴포넌트와는 달리, 리스트 자체에 하나의 이벤트 핸들러만 연결되어 있음 
    // 행마다 별도의 이벤트 핸들러를 갖지 않음
    // 성능과 메모리 사용성을 개선시킬 수 있음
    newTodoList.addEventListener('click', e => {
      if (e.target.matches('button.destroy')) {
        deleteItem(e.target.dataset.index)
      }
    })

  return newTodoList
}
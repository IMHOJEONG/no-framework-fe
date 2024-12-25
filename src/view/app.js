let template

// const allTodosCompleted = todos => {
//   if (todos.length === 0) {
//     return false
//   }
//   return !todos.find(t => !t.completed)
// }

// const noCompletedItemIsPresent = todos => !todos.find(t => t.completed)

/**
 * 모든 렌더링 주기에 대해 새로운 DOM 요소를 생성하고 새로운 항ㅁㄱ의 값을 삽입ㅎ하는 데 사용되는 input 핸들러에 이벤트 핸들러를 연결
 * 사용자가 Enter를 누르면, addItem 함수가 호출되고, 그런 다음 input 핸들러가 지워짐
 */
const getTemplate = () => {
  if (!template) {
    template = document.getElementById('todo-app')
  }

  return template
    .content
    .firstElementChild
    .cloneNode(true)
}

const addEvents = (targetElement, events) => {
    targetElement
      .querySelector('.new-todo')
      .addEventListener('keypress', e => {
        if (e.key === 'Enter') {
          events.addItem(e.target.value)
          e.target.value = ''
        }
      })
  }



export default (targetElement, state, events) => {
  const newApp = targetElement.cloneNode(true)

  newApp.innerHTML = ''
  newApp.appendChild(getTemplate())

//   if (noCompletedItemIsPresent(state.todos)) {
//     newApp
//       .querySelector('.clear-completed')
//       .classList
//       .add('hidden')
//   } else {
//     newApp
//       .querySelector('.clear-completed')
//       .classList
//       .remove('hidden')
//   }

//   newApp
//     .querySelector('input.toggle-all')
//     .checked = allTodosCompleted(state.todos)

  addEvents(newApp, events)

  return newApp
}
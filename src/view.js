const getTodoElement = todo => {
    const {
      text,
      completed
    } = todo
  
    return `
    <li ${completed ? 'class="completed"' : ''}>
      <div class="view">
        <input 
          ${completed ? 'checked' : ''}
          class="toggle" 
          type="checkbox">
        <label>${text}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="${text}">
    </li>`
  }
  
  const getTodoCount = todos => {
    const notCompleted = todos
      .filter(todo => !todo.completed)
  
    const { length } = notCompleted
    if (length === 1) {
      return '1 Item left'
    }
  
    return `${length} Items left`
  }

  /**
   * 기본으로 사용되는 타깃 DOM 요소를 받음 
   * 1. 원래 노드를 복제하고, state 매개변수를 사용해 업데이트함, 새 노드를 반환
   * !! DOM 수정은 가상임!을 명심 (분리된 요소로 작업)
   */
  export default (targetElement, state) => {
    const {
      currentFilter,
      todos
    } = state


    // 분리된 요소를 생성하고자, cloneNode 메서드를 사용해 기존 노드를 복제
    // 새로 생성된 이 DOM 요소는 실제 DOM 요소
    // 정확히 원본과 동일한 복제본이지만 문서의 본문과는 전혀 관련 없음 
    const element = targetElement.cloneNode(true)
  
    const list = element.querySelector('.todo-list')
    const counter = element.querySelector('.todo-count')
    const filters = element.querySelector('.filters')
  
    list.innerHTML = todos.map(getTodoElement).join('')
    counter.textContent = getTodoCount(todos)
  
    Array
      .from(filters.querySelectorAll('li a'))
      .forEach(a => {
        if (a.textContent === currentFilter) {
          a.classList.add('selected')
        } else {
          a.classList.remove('selected')
        }
      })
  
    return element
  }
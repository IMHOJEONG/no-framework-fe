import getTodos from './getTodos.js'
import todosView from './view/todos.js'
import counterView from './view/counter.js'
import filtersView from './view/filters.js'

import appView from './view/app.js'
import applyDiff from './applyDiff.js'



import registry from './registry.js'


registry.add('app', appView)
registry.add('todos', todosView)
registry.add('counter', counterView)
registry.add('filters', filtersView)

const state = {
  todos: getTodos(),
  currentFilter: 'All'
}

const events = {
    deleteItem: (index) => {
        state.todos.splice(index, 1)
        render()  
    },
    addItem: text => {
        state.todos.push({
            text,
            completed: false
        })
        render()
    }
}

// 이 줄부터 끝까지...
// 새 데이터가 있을 때마다 가상 루트 요소를 만든 다음 실제 요소를 새로 생성된 요소로 변경
// 소규모 애플리케이션에서는 충분한 성능을 발휘하지만, 대규모 프로젝트에선 성능을 저하시킬 수 있음
const render = () => {
    window.requestAnimationFrame(()=>{
        const main = document.querySelector('#root')

        const newMain = registry.renderRoot(
          main,
          state,
          events)
        // main.replaceWith(newMain)
        applyDiff(document.body, main, newMain)
    })
}

window.setInterval(()=> {
    state.todos = getTodos()
    render()
}, 5000)

render();
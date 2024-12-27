const TEMPLATE = '<ul class="todo-list"></ul>'

export const EVENTS = {
    DELETE_ITEM: 'DELETE_ITEM'
}

export default class List extends HTMLElement {
    static get observedAttributes() {
        return [
            'todos'
        ]
    }

    get todos() {
        if (!this.hasAttribute('todos')) {
            return []
        }

        return JSON.parse(this.getAttribute('todos'))
    }

    set todos(value) {
        console.log(this, value)
        this.setAttribute('todos', JSON.stringify(value))
    }

    // 사용자가 Destroy 버튼을 클릭할 때 발생하는 상황을 사용자 정의 이벤트로 외부에 알리는 것
    onDeleteClick(index) {
        const event = new CustomEvent(EVENTS.DELETE_ITEM, {
            detail: {
                index
            }
        })
        this.dispatchEvent(event)
    }

    createNewTodoNode = () => {
        console.log('OK!!')
        return this.itemTemplate.content.firstElementChild.cloneNode(true)
    }

    getTodoElement = (todo, index) => {

        const { 
            text,
            completed
          } = todo

        const element = this.createNewTodoNode()

        element.querySelector('input.edit').value = text
        element.querySelector('label').textContent = text 
    
        if (completed) {
          element.classList.add('completed')
          element.querySelector('input.toggle').checked = true
        }
        
        // element.querySelector('button.destroy')
        //   .addEventListener('click', handler)
        element.querySelector('button.destroy')
          .dataset.index = index
    
        return element

    } 

    updateList() {

        this.list.innerHTML = ''

        this.todos
            .map(this.getTodoElement)
            .forEach(element => {
                this.list.appendChild(element)
            })

    }

    // 속성이 변경될 때마다 리스트가 렌더링됨
    connectedCallback() {

        this.innerHTML = TEMPLATE
        this.itemTemplate = document
        .getElementById('todo-item')
        this.list = this.querySelector('ul')

        this.list.addEventListener('click', e => {
            if (e.target.matches('button.destroy')) {
                this.onDeleteClick(e.target.dataset.index)
            }
        })

        this.updateList()

    }

    attributeChangedCallback() {
        this.updateList()
    }


}
/**
 * 원래 컴포넌트를 가져와 동일한 서명의 새로운 컴포넌트를 반환
 */
const renderWrapper = component => {
    return (targetElement, state) => {
      const element = component(targetElement, state)
  
      // 레지스트리에서 data-copmonent 속성을 가진 모든 DOM 요소를 찾음 
      const childComponents = element
        .querySelectorAll('[data-component]')
  
    
      // 요소가 발견되면, 자식 컴포넌트를 호출
      // 자식 컴포넌트는 동일한 함수로 래핑됨
      // 이러한 방식으로 재귀 함수처럼 마지막 컴포넌트까지 쉽게 탐색이 가능
      Array
        .from(childComponents)
        .forEach(target => {
          const name = target
            .dataset
            .component
  
          const child = registry[name]
          if (!child) {
            return
          }
  
          target.replaceWith(child(target, state))
        })
  
      return element
    }
  }

// 레지스트리에 컴포넌트를 추가하려면, 이전 함수로 컴포넌트를 래핑하는 간단한 함수가 필요
  const add = (name, component) => {
    registry[name] = renderWrapper(component)
  }
  
  // 최초 DOM 요소에서 렌더링을 시작하려면, 애플리케이션의 루트를 렌더링하는 메서드를 제공해야 함
  const renderRoot = (root, state) => {
    const cloneComponent = root => {
      return root.cloneNode(true)
    }
  
    return renderWrapper(cloneComponent)(root, state)
  }
  
  // add, renderRoot 메서드는 컴포넌트 레지스트리의 공용 인터페이스
  export default {
    add,
    renderRoot
  }
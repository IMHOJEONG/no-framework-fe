export default (targetElement, { currentFilter }) => {

   const newCounter = targetElement.cloneNode(true)
  
    Array
      .from(filters.querySelectorAll('li a'))
      .forEach(a => {
        if (a.textContent === currentFilter) {
          a.classList.add('selected')
        } else {
          a.classList.remove('selected')
        }
      })

    return newCounter;
}
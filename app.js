function onReady() {
  let id = 0;
  const toDos = [];
  const addToDoForm = document.getElementById('addToDoForm');

  function createNewToDo() {
    const newToDoText = document.getElementById('newToDoText');
    if (!newToDoText.value) { return; }

    toDos.push({
      title: newToDoText.value,
      complete: false,
      id: id
    });

    id++

    newToDoText.value = '';

    renderTheUI();
  }

  function renderTheUI() {
    const toDoList = document.getElementById('toDoList');

    toDoList.textContent = '';

    toDos.forEach(function(toDo){
      const newLi = document.createElement('li');
      const checkbox = document.createElement('input');
      const deleteItem = document.createElement('button')

      checkbox.type = "checkbox";
      deleteItem.type = "button";

      newLi.textContent = toDo.title;
      deleteItem.textContent = "Delete";

      toDoList.appendChild(newLi);
      newLi.appendChild(checkbox);
      newLi.appendChild(deleteItem);
    });
  }

  addToDoForm.addEventListener('submit', event => {
    event.preventDefault();
    createNewToDo();
  });

  deleteItem.addEventListener('click', event => {
    toDos = toDos.filter(function(el) {
      return el.id !== toDo.id;
    });
    renderTheUI();
  });

  renderTheUI();
}

window.onload = function () {
  onReady();
};

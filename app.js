function onReady() {
  let id = 0;
  localStorage.getItem("toDo");
  var toDos = JSON.parse(localStorage.getItem("toDo"));
  if (toDos == null) {
    toDos = [];
  }
  const addToDoForm = document.getElementById('addToDoForm');

  function createNewToDo() {
    const newToDoText = document.getElementById('newToDoText');
    if (!newToDoText.value) {
      alert("Input can not be empty");
       return; }

    toDos.push({
      title: newToDoText.value,
      complete: false,
      id: id
    });

    id++

    newToDoText.value = '';
    newToDoText.focus();

    renderTheUI();
    localStorage.setItem("toDo", JSON.stringify(toDos));
  }

  function renderTheUI() {
    const toDoList = document.getElementById('toDoList');

    toDoList.textContent = '';

    toDos.forEach(function(toDo){
      let title = document.createElement('div');
      title.textContent = toDo.title;
      title.className = 'mdl-list_item-primary-content';
      const newLi = document.createElement('li');
      newLi.className = 'mdl-list_item';

      const checkbox = document.createElement('input');
      checkbox.type = "checkbox";
      checkbox.className = 'mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect';

      if (toDo.complete == true) {
        checkbox.check = true;
      } else if (toDo.complete == false) {
        checkbox.check = false;
      }

      function toggle() {
        if (checkbox.checked) {
          toDo.complete = true;
        } else {
          toDo.complete = false;
        }

        localStorage.setItem("toDo", JSON.stringify(toDos));
      }
      checkbox.addEventListener('click', toggle);

      const deleteButton = document.createElement('button');
      deleteButton.textContent = "Delete";
      deleteButton.className =  'mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary';

      function deleteLi() {
        toDos = toDos.filter(function(todo){
          return toDo.id != todo.id;
        });
        renderTheUI();
        localStorage.setItem("toDo", JSON.stringify(toDos));
      }
      deleteButton.addEventListener('click', deleteLi);

      toDoList.appendChild(newLi);
      newLi.appendChild(checkbox);
      newLi.appendChild(title);
      newLi.appendChild(deleteButton);

    });
  }

  addToDoForm.addEventListener('submit', event => {
    event.preventDefault();
    createNewToDo();
  });

  renderTheUI();
}

window.onload = function () {
  onReady();
};

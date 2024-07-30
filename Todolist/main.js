document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('.giris input');
    const addButton = document.querySelector('.giris button');
    const clearButton = document.querySelector('.gorev button');
    const todoList = document.getElementById('todo-list');
  
    addButton.addEventListener('click', addTodo);
    clearButton.addEventListener('click', clearAllTodos);
  
    function addTodo() {
      const todoText = input.value.trim();
      if (todoText === "") {
        alert("Lütfen bir görev girin.");
        return;
      }
  
      const todoItem = document.createElement('li');
      todoItem.textContent = todoText;
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Sil';
      deleteButton.style.backgroundColor = 'red';
      deleteButton.style.color = 'white';
      deleteButton.addEventListener('click', () => todoList.removeChild(todoItem));
  
      todoItem.appendChild(deleteButton);
      todoList.appendChild(todoItem);
  
      input.value = '';
    }
  
    function clearAllTodos() {
      todoList.innerHTML = '';
    }
  });
  
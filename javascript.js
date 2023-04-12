
const listContainer = document.querySelector('.tasks'); // ul
const newTodoForm = document.querySelector('.addTodo'); // form
const newTodoInput = document.querySelector('.addNew'); // input
const listCountElement = document.querySelector('.counter'); //counter
const taskTemplate = document.querySelector('#task-template'); // html template
const clearCompletedTaskBtn = document.querySelector('.clear'); // clear completed

// filtering
const filterOptions = document.querySelector('.filter-todos');
const allTaskBtn = document.querySelector('.all');
const showActiveTodos = document.querySelector('.activeBtn');
const showCompletedTodos = document.querySelector('.completed');

const LOCAL_STORAGE_LIST = 'task.todos';

let todos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST)) || [
  {
    id: '1',
    name: 'This is a sample task',
    completed: false,
  },
];
// Callback of the event of submiting a new task. Saves the information of the new task
// on the dic'todos' and renders the page with the updated information.

const submitTodo = e => {
    e.preventDefault();
    const listName = newTodoInput.value;
    const task = createTask(listName);
    newTodoInput.value = null;
    todos.push(task);
    newTodoInput.focus();
    saveAndRender();
  };

// Generates a new task item and returns it as a dictionary with the corresponding values.
  const createTask = name => {
    let id = todos.length + 1;
    return { id: id.toString(), name: name, completed: false };
  };
// Combines the save and the render function
const saveAndRender = () => {
    saveToLocalstorage();
    renderTasks();
  };
// Uses the Json library to save local storage   
  const saveToLocalstorage = () => {
    localStorage.setItem(LOCAL_STORAGE_LIST, JSON.stringify(todos));
  };  

// Clears the list container UL and fills it with the values of the todo dictionary
const renderTasks = selectedList => {
    clearElement(listContainer);
    todos.forEach(todo => {
      const taskElement = document.importNode(taskTemplate.content, true);
      const checkbox = taskElement.querySelector('input');
      checkbox.id = todo.id;
      checkbox.checked = todo.completed;
      const label = taskElement.querySelector('label');
      label.htmlFor = todo.id;
      label.append(todo.name);
      const deleteBtn = taskElement.querySelector('img');
      deleteBtn.id = todo.id;
      listContainer.appendChild(taskElement);
    });
   //  renderTaskCount(selectedList);
    saveToLocalstorage();
  };
// Removes all the childs of the recieved element
  const clearElement = element => {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  };   
  // Deletes a to do task from the list
  const deleteTodo = e => {
    if (e.target.tagName.toLowerCase() === 'img') {
      const deleteTask = todos.filter(task => task.id !== e.target.id);
      todos = deleteTask;
      newTodoInput.focus();
      saveAndRender();
    }
  };  
  const isCompleted = e => {
    if (e.target.tagName.toLowerCase() === 'input') {
      todos.forEach(current => {
        if(current.id === e.target.id) {
            current.completed=e.target.checked;
            saveAndRender();
        }
      })
    }
  };
  
// Event conections
newTodoForm.addEventListener('submit', submitTodo);
listContainer.addEventListener('click', deleteTodo);
listContainer.addEventListener('click', isCompleted);

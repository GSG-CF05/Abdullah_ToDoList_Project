let inputField = document.querySelector('.input-field input'),
addBtn = document.querySelector('.add'),
editBtn = document.querySelector('.edit'),
deeteBtn = document.querySelector('.delete'),
tasksContainer = document.querySelector('.tasks-container');

let todos;

if (localStorage.getItem('todo')) {
    todos = JSON.parse(localStorage.getItem('todo'));
} else {
    todos = [];
}

addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let task = inputField.value;
    todos.push(task);
    createTodoItem(task);
    addToLocalStorage();
});
function createTodoItem(task) {
    let item = document.createElement('div');
    item.classList.add('task');
    item.innerHTML = `
        <div class="text">${task}</div>
        <div class="tools">
            <button class="delete"><i class="uil uil-edit"></i></button>
            <button class="edit"><i class="uil uil-trash-alt"></i></button>
        </div>
    `;
    tasksContainer.appendChild(item);
    inputField.value = '';

}
function addToLocalStorage() {
    localStorage.setItem('todo', JSON.stringify(todos));
}
function showAllItems() {
    if ((localStorage.getItem('todo'))) {
        let todoos = JSON.parse(localStorage.getItem('todo'));
        
        todoos.forEach(todo => {
            createTodoItem(todo);
        });
        
    }
}
showAllItems();
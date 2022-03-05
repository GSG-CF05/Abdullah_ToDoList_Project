const inputField = document.querySelector('.input-field input'),
addBtn = document.querySelector('.add'),
tasksContainer = document.querySelector('.tasks-container');
//index of the selected elements
let index;

// the todos array
let todos;

// the edit element 
let editEl;

// the mode element
let mode = "add";
addBtn.setAttribute("class", "add uil uil-plus");

//the old value of the edited text
let old;
if (localStorage.getItem('todo')) {
    todos = JSON.parse(localStorage.getItem('todo'));
} else {
    todos = [];
}

addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let task = inputField.value;
    if (task) {
        if (mode === "add") {
            todos.push(task);
            createTodoItem(task);
        }
        if (mode === "edit") {
            editEl.innerText = task;
            let items = JSON.parse(localStorage.getItem('todo'));
            todos[index] = task;
            addToLocalStorage();
        }
    }

    mode = 'add';
    addBtn.setAttribute("class", "add uil uil-plus");
    inputField.value = '';
});
function createTodoItem(task) {
    if (task !== '') {
        let item = document.createElement('div');
        item.classList.add('task');
        item.innerHTML = `
            <div class="text">${task}</div>
            <div class="tools">
                <button class="delete" onclick="deleteItem(this)"><i class="uil uil-trash-alt"></i></button>
                <button class="edit" onclick = "editElement(this)"><i class="uil uil-edit"></i></button>
            </div>
        `;
        
        tasksContainer.appendChild(item);
        addToLocalStorage();
        addId();
    }

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
showAllItems(); // to show all tasks 
function editElement(edit) {
    mode = "edit";
    addBtn.setAttribute("class", "add uil uil-edit");
    old = edit.parentElement.parentElement.querySelector('.text').innerText;
    inputField.value = old;
    editEl = edit.parentElement.parentElement.querySelector('.text');
    index = editEl.parentElement.getAttribute('id');
    console.log(index)
}


function deleteItem(delte) {
        index = delte.parentElement.parentElement.getAttribute('id');
        todos = todos.filter(todo => {
            return todo != delte.parentElement.parentElement.querySelector('.text').innerHTML;
        });
        console.log(todos)
        addToLocalStorage();
        delte.parentElement.parentElement.remove();
        addId();
}
function addId() {
    document.querySelectorAll('.task').forEach((task, i) => {
        task.setAttribute('id', i);
    });
}
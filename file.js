const inputField = document.querySelector('.input-field input'),
addBtn = document.querySelector('.add'),
tasksContainer = document.querySelector('.tasks-container');
let i = 0;
//index of elements
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
    if (mode === "add") {
        todos.push(task);
        createTodoItem(task);
    }
    if (mode === "edit") {
        editEl.innerText = task;
        let items = JSON.parse(localStorage.getItem('todo'));
        console.log(todos)
        todos[index] = task;
        console.log(todos)
        addToLocalStorage();
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
        item.setAttribute("id", i);
        i++;
        tasksContainer.appendChild(item);
        addToLocalStorage();
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
showAllItems();
const editBtns = document.querySelectorAll('.edit'),
deleteBtns = document.querySelectorAll('.delete');
editBtns.forEach(edit => {
    edit.addEventListener('click', (e) => {
        editElement(edit);

    });
});
function editElement(edit) {
    mode = "edit";
    addBtn.setAttribute("class", "add uil uil-edit");
    old = edit.parentElement.parentElement.querySelector('.text').innerText;
    inputField.value = edit.parentElement.parentElement.querySelector('.text').innerText;
    editEl = edit.parentElement.parentElement.querySelector('.text');
    index = editEl.parentElement.getAttribute('id');
}
deleteBtns.forEach(delte => {
    delte.addEventListener('click', (e) => {
        deleteItem(delte);
    });
    
});
function deleteItem(delte) {
    index = delte.parentElement.parentElement.getAttribute('id');
        todos = todos.filter(todo => {
            return todo != delte.parentElement.parentElement.querySelector('.text').innerText;
        });
        console.log(todos)
        addToLocalStorage();
        delte.parentElement.parentElement.remove();
}
const input = document.querySelector('.newtask input');
const taskAction = document.querySelector('.addtask_btn');
const taskList = document.querySelector('.ul_task_list');
const taskListDiv = document.querySelector('.task_list');

const localItems = () => {
    let localItems = JSON.parse(localStorage.getItem('localItem'))
    if (localItems === null) {
        toDoList = []
    } else {
        toDoList = localItems;
    }
}

//add added tasks to webBrowser storage
const addToLocalStorage = () => {
    localItems();
    toDoList.push(input.value);
    localStorage.setItem('localItem', JSON.stringify(toDoList));
}

const deleteFromLocalStorage = (value) => {
    const valueOfArray = toDoList.indexOf(value);
    toDoList.splice(valueOfArray, 1);
    localStorage.setItem('localItem', JSON.stringify(toDoList));
}

const deleteAllFromLocalStorage = (index) => {
    let localItems = JSON.parse(localStorage.getItem('localItem'));
    toDoList.splice(index, localItems.length);
    localStorage.setItem('localItem', JSON.stringify(toDoList));
}

const showLocalStorageList = () => {
    localItems();
    let outPut = '';
    let toDoListShow = taskList;
    toDoList.forEach((data) => {
        outPut = addTask(data);
    });
    toDoListShow = outPut;
}

taskAction.addEventListener('click', (e) => {
    e.preventDefault();
    if (input.value === '') {
        alert('Add a task!');
    } else {
        addToLocalStorage();
        addTask();
    }
})

const addTask = (element) => {
    const li = document.createElement('li');
    const taskDeleteIcon = document.createElement('i');
    const taskDoneIcon = document.createElement('i');
    const taskEditIcon = document.createElement('i');
    const divActionElement = document.createElement('div')
    const span = document.createElement('span');

    taskDeleteIcon.classList.add('fa-solid', 'fa-trash-can');
    taskDoneIcon.classList.add('fa-solid', 'fa-check')
    taskEditIcon.classList.add('fa-solid', 'fa-pen');
    divActionElement.classList.add('icon_div');

    taskList.appendChild(li);
    //check for element undefined because when it's added by taskAction listener it's undefined by default
    //but when you call function showLocalStorageList() element is defined from storage array
    if (element === undefined) {
        li.appendChild(span).innerHTML += input.value;
    } else {
        li.appendChild(span).innerHTML += `${element}`;
    }
    li.appendChild(divActionElement);
    divActionElement.appendChild(taskEditIcon);
    divActionElement.appendChild(taskDoneIcon);
    divActionElement.appendChild(taskDeleteIcon);

    //reset input value after add a task
    input.value = '';

    taskDeleteIcon.addEventListener('click', function() {
        if (confirm('Do you want to delete this task?') == true) {
            this.parentNode.parentNode.parentNode.removeChild(li);
            deleteFromLocalStorage(span.innerHTML);
        }
    })

    taskDoneIcon.addEventListener('click', () => {
        span.classList.toggle('task_done');
    })

    taskEditIcon.addEventListener('click', () => {
        console.log(span.innerHTML);
    })
}

//Clear list from all tasks
const taskCleaner = () => {
    const taskClear = document.querySelector('.clear_btn');
    taskClear.addEventListener('click', () => {
        if (confirm('Do you want to clear your list?') == true) {
            taskList.innerHTML = '';
            deleteAllFromLocalStorage();
        }
    })
}

taskCleaner();
showLocalStorageList();
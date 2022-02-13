const input = document.querySelector('.newtask input');
const taskAction = document.querySelector('.newtask_btn');
const taskList = document.querySelector('.ul_task_list');
const taskListDiv = document.querySelector('.task_list');


taskAction.addEventListener('click', (e) => {
    e.preventDefault();
    if (input.value === '') {
        alert('Add a task!');
    } else {
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
        li.appendChild(span).innerHTML += input.value;
        li.appendChild(divActionElement);
        divActionElement.appendChild(taskEditIcon);
        divActionElement.appendChild(taskDoneIcon);
        divActionElement.appendChild(taskDeleteIcon);

        input.value = '';

        taskDeleteIcon.addEventListener('click', function() {
            this.parentNode.parentNode.parentNode.removeChild(li);
        })

        taskDoneIcon.addEventListener('click', () => {
            span.classList.toggle('task_done');
        })

        taskEditIcon.addEventListener('click', () => {
            console.log(span.innerHTML);
        })
    }
})
// Getting the requited elements
const newTaskButton = document.querySelector('.newTask')
const newTaskInput = document.querySelector('.newTaskInput')
const newTaskCheckmark = document.querySelector('.newCheckMark')
const userNewTaskInput = document.querySelector('#new')
const newTaskImportance = document.querySelector('.newTaskImportance')
const todos = document.querySelector('.todos')
const monthYear = document.querySelector('.main h3')
const searchInput = document.querySelector('#search')
const allTasks = document.getElementById('allTasks')
const toDo = document.getElementById('toDo')
const important = document.getElementById('important')
const inProgress = document.getElementById('inProgress')
const done = document.getElementById('done')

// Declaring the required variables
let taskList = []

// Getting the current month and year
const currentDate = new Date();
const month = currentDate.toLocaleString('default', { month: 'long' });
const year = currentDate.getFullYear();

// Displaying the current month and year on the page
monthYear.textContent = `${month} ${year}`

// function to add new task
function addNewTask() {
    newTaskInput.style.display = 'block'

    // Adding event listener to the checkmark to add new task
    newTaskCheckmark.addEventListener('click', () => {
        if (userNewTaskInput.value !== ''){
            taskList.push({task: userNewTaskInput.value, completed: false, importance: newTaskImportance.value})
            console.log(userNewTaskInput.value)
            console.log(newTaskImportance.value)
            displayTasks(taskList)
        }
        userNewTaskInput.value = ''
        newTaskInput.style.display = 'none'
        console.log(taskList)
    })
}

// function to display tasks
function displayTasks(todoList) {
    // Clear existing items in the todos
    todos.innerHTML = '';

    todoList.forEach(todo => {
        // create a div element that will hold both the checkbox and the todo
        const todoContainer = document.createElement('div')
        todoContainer.classList.add('todoContainer')


        // create a new div element for the todo
        const todoListElement = document.createElement('div')
        // create a new checkbox input element for the todo
        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.checked = todo.completed
        // create a delete icon next to the task
        const deleteIcon = document.createElement('img');
        deleteIcon.setAttribute('src', 'src/assets/delete.png');
        deleteIcon.setAttribute('alt', 'Delete icon');
        deleteIcon.classList.add('delete')

        // add event listener to update completed property
        checkbox.addEventListener('click', () => {
            todo.completed = !todo.completed
            if (todo.completed) {
                todoContainer.classList.add('completed');
            } else {
                todoContainer.classList.remove('completed');
            }
        })

        // adding a strikethrough whenever the checkbox is checked and removing it when unchecked
        if (todo.completed) {
            todoContainer.classList.add('completed');
        } else {
            todoContainer.classList.remove('completed');
        }

        todoListElement.textContent = todo.task
        console.log(todo)

        // append the checkbox, todoListElement and delete icon to the todoContainer
        todoContainer.appendChild(checkbox)
        todoContainer.appendChild(todoListElement)
        todoContainer.appendChild(deleteIcon)

        //add delete event listener
        deleteIcon.addEventListener('click', () => {
            const index = taskList.indexOf(todo); //find the index of the task in the array
            taskList.splice(index, 1); //remove the task from the taskList array
            displayTasks(taskList); //update the view
        });

        //append the todoContainer to the todos element
        todos.appendChild(todoContainer)
    })
}

// function to search to do list
function search() {
    const searchKeyword = searchInput.value.toLowerCase();
    const filteredTasks = taskList.filter(task => task.task.toLowerCase().includes(searchKeyword));
    displayTasks(filteredTasks);
}

// function to display all tasks
function displayAllTasks() {
    displayTasks(taskList)

}

// function to display to do tasks
function displayToDo() {
    const toDoTasks = taskList.filter(toDoTask => toDoTask.completed === false)
    displayTasks(toDoTasks)
}

// function to display important tasks
function displayImportantTasks() {
    const importantTasks =  taskList.filter(importantTask => importantTask.importance === '2')
    displayTasks(importantTasks)
}

// function to display done tasks
function displayDoneTasks() {
    const doneTasks = taskList.filter(doneTask => doneTask.completed === true)
    displayTasks(doneTasks)
}

// Adding event listener to the new task button
newTaskButton.addEventListener('click',addNewTask)
// Adding event listener to the search input
searchInput.addEventListener('input', search)
// adding event listeners to the sidebar items
allTasks.addEventListener('click', displayAllTasks)
toDo.addEventListener('click', displayToDo)
important.addEventListener('click', displayImportantTasks)
inProgress.addEventListener('click', displayToDo)
done.addEventListener('click', displayDoneTasks)
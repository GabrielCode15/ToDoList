// Elementos
const todoForm = document.querySelector("#listForm");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");




let oldInputValut;

// Funções
const saveTodo = (text)=>{
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);


    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-todo");
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(removeBtn);

    todoList.appendChild(todo)
    todoInput.value = "";
    todoInput.focus()
}



const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide")
}




const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo)=>{
        let todoTitle = todo.querySelector("h3");
        if(todoTitle.innerText == oldInputValut){
            todoTitle.innerText = text
        }
    })
}





const getSearchTodos = (search) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo)=>{
        let todoTitle = todo.querySelector("h3").innerText.toLocaleLowerCase();

        const normalizedSearch = search.toLocaleLowerCase();

        todo.style.display = "flex";

        if(!todoTitle.includes(normalizedSearch)){
            todo.style.display = "none";
        }
    })
}


const filterTodos = (filterValue) => {
    const todos = document.querySelectorAll(".todo");

    switch(filterValue) {
        case "all":
            todos.forEach((todo)=>{
                todo.style.display = "flex";
            });
            break;

            case "done":
            todos.forEach((todo)=>{
                if(todo.classList.contains("done")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
            });
            break;
    
            case "todo":
                todos.forEach((todo)=>{
                    if(!todo.classList.contains("done")){
                        todo.style.display = "flex";
                    }else{
                        todo.style.display = "none";
                    }
                });
            break;
                  
            default:
                break;
        }      
}


// Eventos
todoForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    console.log("Formulário enviado");

    const inputValue = todoInput.value;
    if(inputValue) {
        saveTodo(inputValue);
    }
})



document.addEventListener("click", (e) =>{
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle;

    if(parentEl && parentEl.querySelector("h3")){
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if(targetEl.classList.contains("finish-todo")){
        parentEl.classList.toggle("done");
    }

    if(targetEl.classList.contains("remove-todo")){
        parentEl.remove();
    }

    if(targetEl.classList.contains("edit-todo")){
        toggleForms();

        editInput.value = todoTitle;
        oldInputValut = todoTitle;
    }
})



editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if(editInputValue){
        // atualizar
        updateTodo(editInputValue);
    }

    toggleForms()
})


cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForms()
})



searchInput.addEventListener("keyup", (e) => {
    const search = e.target.value;
    getSearchTodos(search);
})


eraseBtn.addEventListener("click", (e)=> {
    e.preventDefault();
    searchInput.value = "";
    searchInput.dispatchEvent(new Event("keyup"));
})


filterBtn.addEventListener("change", (e) =>{
    const filterValue = e.target.value;
    filterTodos(filterValue);
})
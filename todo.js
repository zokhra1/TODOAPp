"use strict";

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const parentElement = document.querySelector(".todo-list");
const weeklist = document.querySelector(".week-days-list");
const button = document.querySelectorAll(".button");
const todocontainer = document.querySelectorAll(".todo-container");

// Move addTodo function outside event listeners
function addTodo() {
  event.preventDefault();
  const innertext = todoInput.value;
  const activeContainer = document.querySelector(".todo__container--active");

  if (innertext === "") return;

  const markup = `
    <div class="todo">
      <li class="todo-item">
        <p>${innertext}</p>
        <div class="icons">
          <button class="complete-btn">
            <ion-icon class="complete-btn" name="checkmark-outline"></ion-icon>
          </button>
          <button class="trash-btn">
            <ion-icon class="trash-btn" name="trash-outline"></ion-icon>
          </button>
        </div>
      </li>
    </div>`;

  activeContainer.insertAdjacentHTML("afterbegin", markup);
  todoInput.value = "";
  saveLocalTodos(innertext);
}

// Event listener for todoButton
todoButton.addEventListener("click", addTodo);

// Event listener for todoList (delegation for dynamically added elements)
todoList.addEventListener("click", function (event) {
  const item = event.target;
  const activeContainer = document.querySelector(".todo__container--active");

  if (activeContainer.contains(item)) {
    if (item.classList.contains("trash-btn")) {
      const todo = item.closest(".todo");

      todo.classList.add("slide");

      removeLocalTodos(todo);
      todo.addEventListener("transitionend", function () {
        todo.remove();
      });
    }

    if (item.classList.contains("complete-btn")) {
      const todo = item.closest(".todo");
      todo.classList.toggle("completed");
    }
  }
});

// Event listener for filterOption
filterOption.addEventListener("change", function (event) {
  const todos = Array.from(todoList.children);
  const filterValue = event.target.value;

  todos.forEach((todo) => {
    if (
      filterValue === "all" ||
      (filterValue === "completed" && todo.classList.contains("completed")) ||
      (filterValue === "incomplete" && !todo.classList.contains("completed"))
    ) {
      todo.classList.remove("hidden");
    } else {
      todo.classList.add("hidden");
    }
  });
});

let clicked;
// Event listener for weeklist
weeklist.addEventListener("click", function (event) {
  event.preventDefault();
  const clicked = event.target.closest(".button");

  if (!clicked) return;

  button.forEach((t) => t.classList.remove("weekday__button--active"));
  todocontainer.forEach((c) => c.classList.remove("todo__container--active"));

  clicked.classList.add("weekday__button--active");

  const activeContainer = document.querySelector(
    `.todo__container--${clicked.dataset.button}`
  );
  activeContainer.classList.add("todo__container--active");

  // Update activecontainer reference in addTodo function
  todoButton.addEventListener("click", function (event) {
    addTodo();
    const activeContainer = document.querySelector(".todo__container--active");
    activeContainer.appendChild(todoList.firstChild);
  });

  // Update deleteCheck function
  todoList.addEventListener("click", function (event) {
    const item = event.target;

    if (item.classList.contains("trash-btn")) {
      const todo = item.closest(".todo");

      todo.classList.add("slide");

      removeLocalTodos(todo);
      todo.addEventListener("transitionend", function () {
        todo.remove();
        if (activeContainer.childElementCount === 0) {
          activeContainer.classList.remove("todo__container--active");
        }
      });

      activeContainer.removeChild(todo);
    }

    if (item.classList.contains("complete-btn")) {
      const todo = item.closest(".todo");
      todo.classList.toggle("completed");
    }
  });

  // Update filterTodo function
  filterOption.addEventListener("change", function (event) {
    const activeContainer = document.querySelector(".todo__container--active");
    const todos = Array.from(activeContainer.querySelectorAll(".todo"));
    const filterValue = event.target.value;

    todos.forEach((todo) => {
      if (
        filterValue === "all" ||
        (filterValue === "completed" && todo.classList.contains("completed")) ||
        (filterValue === "incomplete" && !todo.classList.contains("completed"))
      ) {
        todo.classList.remove("hidden");
      } else {
        todo.classList.add("hidden");
      }
    });
  });
});

// ...remaining code...

// const todoInput = document.querySelector(".todo-input");
// const todoButton = document.querySelector(".todo-button");
// const todoList = document.querySelector(".todo-list");
// const filterOption = document.querySelector(".filter-todo");
// const parentElement = document.querySelector(".todo-list");
// const weeklist = document.querySelector(".week-days-list");
// const button = document.querySelectorAll(".button");
// const todocontainer = document.querySelectorAll(".todo-container");

// // todoButton.addEventListener("click", addTodo);
// // todoList.addEventListener("click", deleteCheck);
// // filterOption.addEventListener("change", filterTodo);
// function addTodo() {
//   event.preventDefault();
//   const innertext = todoInput.value;
//   const activecontainer = document.querySelector(".todo__container--active");

//   if (innertext === "") return;

//   const markup = `
//     <div class="todo">
//       <li class="todo-item">
//         <p>${innertext}</p>
//         <div class="icons">
//           <button class="complete-btn">
//             <ion-icon class="complete-btn" name="checkmark-outline"></ion-icon>
//           </button>
//           <button class="trash-btn">
//             <ion-icon class="trash-btn" name="trash-outline"></ion-icon>
//           </button>
//         </div>
//       </li>
//     </div>`;

//   activecontainer.insertAdjacentHTML("afterbegin", markup);
//   todoInput.value = "";
//   saveLocalTodos(innertext);
// }

// // Event listener for todoButton
// todoButton.addEventListener("click", addTodo);

// // Event listener for todoList (delegation for dynamically added elements)
// todoList.addEventListener("click", function (event) {
//   const item = event.target;

//   if (item.classList.contains("trash-btn")) {
//     const todo = item.closest(".todo");

//     todo.classList.add("slide");

//     removeLocalTodos(todo);
//     todo.addEventListener("transitionend", function () {
//       todo.remove();
//     });
//   }

//   if (item.classList.contains("complete-btn")) {
//     const todo = item.closest(".todo");
//     todo.classList.toggle("completed");
//   }
// });

// // Event listener for filterOption
// filterOption.addEventListener("change", function (event) {
//   const todos = Array.from(todoList.children);
//   const filterValue = event.target.value;

//   todos.forEach((todo) => {
//     if (
//       filterValue === "all" ||
//       (filterValue === "completed" && todo.classList.contains("completed")) ||
//       (filterValue === "incomplete" && !todo.classList.contains("completed"))
//     ) {
//       todo.classList.remove("hidden");
//     } else {
//       todo.classList.add("hidden");
//     }
//   });
// });

// // Event listener for weeklist
// weeklist.addEventListener("click", function (event) {
//   event.preventDefault();
//   const clicked = event.target.closest(".button");

//   if (!clicked) return;

//   button.forEach((t) => t.classList.remove("weekday__button--active"));
//   todocontainer.forEach((c) => c.classList.remove("todo__container--active"));

//   clicked.classList.add("weekday__button--active");

//   const activecontainer = document.querySelector(
//     `.todo__container--${clicked.dataset.button}`
//   );
//   activecontainer.classList.add("todo__container--active");
// });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// function addTodo(event) {
//   event.preventDefault();
//   const activecontainer = document.querySelector(
//     `.todo__container--${clicked.dataset.button}`
//   );
//   event.preventDefault();
//   const innertext = todoInput.value;
//   const markup = ` <div class="todo ">
//   <li class="todo-item">
//   <p>
//     ${innertext}
//   </p>
//   <div class="icons">
//     <button class="complete-btn">
//       <ion-icon class="complete-btn" name="checkmark-outline"></ion-icon>
//     </button>
//     <button class="trash-btn">
//       <ion-icon class="trash-btn" name="trash-outline"></ion-icon>
//     </button>
//     </div>

// </li></div>`;

//   todoInput.blur();

//   if (innertext === "") return;
//   activecontainer.insertAdjacentHTML("afterbegin", markup);
//   todoInput.value = "";
//   //ADDING TO LOCAL STORAGE
//   saveLocalTodos(innertext);
//   todoButton.addEventListener("click", addTodo);
// }

// weeklist.addEventListener("click", function (e) {
//   e.preventDefault();
//   const clicked = e.target.closest(".button");
//   console.log(clicked);

//   // Guard clause
//   if (!clicked) return;

//   // Remove Active classes
//   button.forEach((t) => t.classList.remove("weekday__button--active"));
//   todocontainer.forEach((c) => c.classList.remove("todo__container--active"));

//   //Activate tab
//   clicked.classList.add("weekday__button--active");

//   //Activate content area
//   console.log(clicked.dataset.button);

//   const activecontainer = document.querySelector(
//     `.todo__container--${clicked.dataset.button}`
//   );
//   activecontainer.classList.add("todo__container--active");

// function addTodo(event) {
//   event.preventDefault();
//   const activecontainer = document.querySelector(
//     `.todo__container--${clicked.dataset.button}`
//   );
//   event.preventDefault();
//   const innertext = todoInput.value;
//   const markup = ` <div class="todo ">
//   <li class="todo-item">
//   <p>
//     ${innertext}
//   </p>
//   <div class="icons">
//     <button class="complete-btn">
//       <ion-icon class="complete-btn" name="checkmark-outline"></ion-icon>
//     </button>
//     <button class="trash-btn">
//       <ion-icon class="trash-btn" name="trash-outline"></ion-icon>
//     </button>
//     </div>

// </li></div>`;

//   todoInput.blur();

//   if (innertext === "") return;
//   activecontainer.insertAdjacentHTML("afterbegin", markup);
//   todoInput.value = "";
//   //ADDING TO LOCAL STORAGE
//   saveLocalTodos(innertext);
//   todoButton.addEventListener("click", addTodo);
// }
// });

// function addTodo(event) {
//   event.preventDefault();
//   const innertext = todoInput.value;
//   const markup = ` <div class="todo ">
//   <li class="todo-item">
//   <p>
//     ${innertext}
//   </p>
//   <div class="icons">
//     <button class="complete-btn">
//       <ion-icon class="complete-btn" name="checkmark-outline"></ion-icon>
//     </button>
//     <button class="trash-btn">
//       <ion-icon class="trash-btn" name="trash-outline"></ion-icon>
//     </button>
//     </div>

// </li></div>`;

//   todoInput.blur();

//   if (innertext === "") return;
//   parentElement.insertAdjacentHTML("afterbegin", markup);
//   todoInput.value = "";
//   //ADDING TO LOCAL STORAGE
//   saveLocalTodos(innertext);
// }

// function deleteCheck(e) {
//   const item = e.target;

//   if (item.classList.contains("trash-btn")) {
//     const todo = item.closest(".todo");

//     todo.classList.add("slide");

//     removeLocalTodos(todo);
//     todo.addEventListener("transitionend", function () {
//       todo.remove();
//     });
//   }

//   if (item.classList.contains("complete-btn")) {
//     const todo = item.closest(".todo");
//     todo.classList.toggle("completed");
//   }
// }

// function filterTodo(e) {
//   const todos = Array.from(todoList.children);

//   const filterValue = e.target.value;

//   todos.forEach((todo) => {
//     // todo.style.display = "flex";

//     if (
//       filterValue === "all" ||
//       (filterValue === "completed" && todo.classList.contains("completed")) ||
//       (filterValue === "incomplete" && !todo.classList.contains("completed"))
//     ) {
//       todo.classList.remove("hidden");
//     } else {
//       todo.classList.add("hidden");
//     }
//   });
// }

// // Function to save todos to local storage
const saveLocalTodos = () => {
  const todos = Array.from(todoList.children).map(
    (todo) => todo.querySelector("p").textContent
  );
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Function to get todos from local storage
const getLocalTodos = () => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  todos.forEach((todo) => {
    const markup = `
      <div class="todo">
        <li class="todo-item">
          <p>${todo}</p>
          <div class="icons">
            <button class="complete-btn">
              <ion-icon class="complete-btn" name="checkmark-outline"></ion-icon>
            </button>
            <button class="trash-btn">
              <ion-icon class="trash-btn" name="trash-outline"></ion-icon>
            </button>
          </div>
        </li>
      </div>
    `;
    const activeContainer = document.querySelector(".todo__container--active");
    activeContainer.insertAdjacentHTML("beforeend", markup);
  });
};

// Event listener for DOMContentLoaded event to load todos from local storage
document.addEventListener("DOMContentLoaded", getLocalTodos);

// Function to remove todo from local storage
const removeLocalTodos = (todo) => {
  const todoText = todo.querySelector("p").textContent;
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos = todos.filter((item) => item !== todoText);
  localStorage.setItem("todos", JSON.stringify(todos));
};

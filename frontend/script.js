// variable declarations
const form = document.querySelector("#myForm");
const input = document.querySelector("#addTodo");
const todoContainer = document.querySelector(".todo-container");
const todoItem = document.querySelector(".todo-item");
const lastItem = document.querySelector(".last-item");
let itemsLeft = document.querySelector(".items-left .count");
const clearCompleted = document.querySelector(".clear-completed");
const completed = document.querySelector(".state-3");
const completedMobile = document.querySelector(".state-md-3");
const all = document.querySelector(".state-1");
const allMobile = document.querySelector(".state-md-1");
const active = document.querySelector(".state-2");
const activeMobile = document.querySelector(".state-md-2");
const theme = document.getElementById("theme");
// add items to todolist
function createNewTodoItem(text) {
  //   alert(text);
  let div = document.createElement("div");
  div.classList.add("todo-item");
  div.setAttribute("draggable", true);
  div.innerHTML = `
    <div class="eclipse eclipsed" style="margin-right: 18px"></div>
    <span id="text"
      >${text}</span
    >
    <div class="close">

    </div>
    `;
  todoContainer.insertBefore(div, lastItem);
  updateItemLeft(1);
}

// update items left

function updateItemLeft(number) {
  itemsLeft.innerText = +itemsLeft.innerText + number;
}

// remove todo items

function removeTodoItem(element) {
  element.remove();
  updateItemLeft(-1);
}

// create todolist

input.addEventListener("keypress", (e) => {
  if (e.charCode === 13 && input.value.length > 0) {
    createNewTodoItem(input.value);
    input.value = "";
  }
});

todoContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("close")) {
    removeTodoItem(e.target.parentElement);
  }

  if (e.target.classList.contains("eclipse")) {
    e.target.classList.toggle("checked");
    e.target.classList.toggle("eclipsed");
  }
});

clearCompleted.addEventListener("click", () => {
  const checked = document.querySelectorAll(".checked");
  checked.forEach((item) => {
    removeTodoItem(item.closest(".todo-item"));
  });
});

completed.addEventListener("click", () => {
  const todoItem = document.querySelectorAll(".todo-item");
  todoItem.forEach((item) => {
    const immediateChild = item.firstElementChild;
    if (!immediateChild.classList.contains("checked")) {
      immediateChild.parentElement.classList.add("hidden");
    }
  });
});

completedMobile.addEventListener("click", () => {
  const todoItem = document.querySelectorAll(".todo-item");
  todoItem.forEach((item) => {
    const immediateChild = item.firstElementChild;
    if (!immediateChild.classList.contains("checked")) {
      immediateChild.parentElement.classList.add("hidden");
    }
  });
});

all.addEventListener("click", () => {
  const todoItem = document.querySelectorAll(".todo-item");
  todoItem.forEach((item) => {
    if (item.classList.contains("hidden")) {
      item.classList.remove("hidden");
    }
  });
});

allMobile.addEventListener("click", () => {
  const todoItem = document.querySelectorAll(".todo-item");
  todoItem.forEach((item) => {
    if (item.classList.contains("hidden")) {
      item.classList.remove("hidden");
    }
  });
});

active.addEventListener("click", () => {
  const todoItem = document.querySelectorAll(".todo-item");
  todoItem.forEach((item) => {
    const immediateChild = item.firstElementChild;
    if (!immediateChild.classList.contains("eclipsed")) {
      immediateChild.parentElement.classList.add("hidden");
    }
  });
});

activeMobile.addEventListener("click", () => {
  const todoItem = document.querySelectorAll(".todo-item");
  todoItem.forEach((item) => {
    const immediateChild = item.firstElementChild;
    if (!immediateChild.classList.contains("eclipsed")) {
      immediateChild.parentElement.classList.add("hidden");
    }
  });
});

theme.addEventListener("click", () => {
  document.documentElement.setAttribute("data-theme", [
    theme.checked ? "light" : "dark",
  ]);
});

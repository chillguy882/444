// Показать модальное окно
const openDialogButton = document.getElementById("open-dialog");
const taskDialog = document.getElementById("taskDialog");
const closeDialogButton = document.getElementById("closeDialog");
const addTaskButton = document.getElementById("addTaskButton");

openDialogButton.onclick = () => {
  taskDialog.showModal();
};

closeDialogButton.onclick = () => {
  taskDialog.close();
};

addTaskButton.onclick = () => {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText) {
    let todoTasks = JSON.parse(localStorage.getItem("todoTasks")) || [];
    todoTasks.push(taskText);
    localStorage.setItem("todoTasks", JSON.stringify(todoTasks));

    taskInput.value = "";
    alert("Задача добавлена!");
    taskDialog.close(); // Закрываем диалог после добавления задачи
  }
};

// Закрытие модального окна при клике вне его
taskDialog.addEventListener("click", (event) => {
  if (event.target === taskDialog) {
    taskDialog.close();
  }
});

document.getElementById("burgerMenu").addEventListener("click", () => {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("active"); // Переключаем класс active
  const burgerMenu = document.getElementById("burgerMenu");
  burgerMenu.classList.toggle("active"); // Переключаем класс active для бургер-меню

  // Плавное открытие навигации
  if (navLinks.classList.contains("active")) {
    navLinks.style.display = "flex"; // Показываем меню
    setTimeout(() => {
      navLinks.style.opacity = "1"; // Устанавливаем полную непрозрачность
    }, 0); // Сразу устанавливаем непрозрачность
  } else {
    navLinks.style.opacity = "0"; // Уменьшаем непрозрачность
    setTimeout(() => {
      navLinks.style.display = "none"; // Скрываем меню
    }, 300); // Задержка для плавного эффекта
  }
});
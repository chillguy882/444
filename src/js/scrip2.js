// Логика табличная с перестановкой места и методами удалить и решить и тд
let todoTasks = JSON.parse(localStorage.getItem('todoTasks')) || [];
let inProgressTasks = JSON.parse(localStorage.getItem('inProgressTasks')) || [];
let doneTasks = JSON.parse(localStorage.getItem('doneTasks')) || [];

function renderTasks() {
  const todoColumn = document.getElementById('todoTasks');
  const inProgressColumn = document.getElementById('inProgressTasks');
  const doneColumn = document.getElementById('doneTasks');

  todoColumn.innerHTML = '';
  todoTasks.forEach((task, index) => {
    todoColumn.innerHTML += `
      <div>
        ${task}
        <button onclick="moveToInProgress(${index})">В работу</button>
        <button onclick="deleteTask(${index}, 'todo')">Удалить</button>
      </div>`;
  });

  inProgressColumn.innerHTML = '';
  inProgressTasks.forEach((task, index) => {
    inProgressColumn.innerHTML += `
      <div>
        ${task}
        <button onclick="markAsDone(${index})">Выполнено</button>
        <button onclick="deleteTask(${index}, 'inProgress')">Удалить</button>
      </div>`;
  });

  doneColumn.innerHTML = '';
  doneTasks.forEach((task, index) => {
    doneColumn.innerHTML += `
      <div class="task-done">
        ${task}
        <button onclick="deleteTask(${index}, 'done')">Удалить</button>
      </div>`;
  });
}

function moveToInProgress(index) {
  inProgressTasks.push(todoTasks[index]);
  todoTasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function markAsDone(index) {
  doneTasks.push(inProgressTasks[index]);
  inProgressTasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function deleteTask(index, column) {
  if (column === 'todo') {
    todoTasks.splice(index, 1);
  } else if (column === 'inProgress') {
    inProgressTasks.splice(index, 1);
  } else if (column === 'done') {
    doneTasks.splice(index, 1);
  }
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem('todoTasks', JSON.stringify(todoTasks));
  localStorage.setItem('inProgressTasks', JSON.stringify(inProgressTasks));
  localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
}

renderTasks();

   /* IDEA::фукнция для Всплыващие бургер меню и скрытием */
   function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active'); // Переключаем класс active
    const burgerMenu = document.getElementById('burgerMenu');
    burgerMenu.classList.toggle('active'); // Переключаем класс active для бургер-меню

    // Плавное открытие навигации
    if (navLinks.classList.contains('active')) {
      navLinks.style.display = 'flex'; // Показываем меню
      setTimeout(() => {
        navLinks.style.opacity = '1'; // Устанавливаем полную непрозрачность
      }, 0); // Сразу устанавливаем непрозрачность
    } else {
      navLinks.style.opacity = '0'; // Уменьшаем непрозрачность
      setTimeout(() => {
        navLinks.style.display = 'none'; // Скрываем меню
      }, 300); // Задержка для плавного эффекта
    }
  }

  // Скрываем навигацию для ПК при активации бургер-меню
  window.addEventListener('resize', function() {
    const navLinks = document.querySelector('.nav-links');
    if (window.innerWidth > 768) {
      navLinks.classList.remove('active'); // Убираем активный класс при переходе на ПК
      navLinks.style.display = 'flex'; // Показываем навигацию для ПК
      navLinks.style.opacity = '1'; // Устанавливаем полную непрозрачность
    } else {
      navLinks.style.display = 'none'; // Скрываем навигацию по умолчанию на мобильных
    }
});
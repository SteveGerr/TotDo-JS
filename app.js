const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
];

(function(arrOfTasks) {
  const objOfTasks = arrOfTasks.reduce((acc, task) => {
    //task._id - _id: '5d2ca9e29c8a94095564788e0', 
    /* task - {
                _id: '5d2ca9e29c8a94095564788e0',
                completed: false,
                body:
                  'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
                title:
                  'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
              },
    */
    acc[task._id] = task;

    return acc;
  }, {})

  //Элементы страницы
  //ul
  const listContainer = document.querySelector(".tasks-list-section .list-group");
  //form
  const form = document.forms["addTask"];
  //inputs
  const inputTitle = form.elements["title"];
  const inputBody = form.elements["body"];

  renderAllTasks(objOfTasks);

  //ОБработчик отправки формы
  form.addEventListener("submit", onFormSubmitHandler);

  listContainer.addEventListener("click", onDeleteHandler);

  //Функция-рендер задач
  function renderAllTasks(taskList) {
    if (!taskList) {
      console.error("Передайте список задач");
      return; //Нужен, чтобы прекратить выполнение функции
    }

    const fragment = document.createDocumentFragment();
    //Берём значения нашего объекта, т.е. объекты с id, completed, body, title
    //и перебераем их
    Object.values(taskList).forEach(task => {
      const li = listItemTemplate(task);
      fragment.appendChild(li);
    });

    listContainer.appendChild(fragment);
  }
  
  //Деструктурируем объект task
  //Эта функция вызывается на каждой итерации выше в foreEach
  //И создаёт элемент li
  function listItemTemplate({_id, title, body} = {}) {
    //Создаём элемент списка
    const liElem = document.createElement("li");
    liElem.classList.add("list-group-item", "d-flex", "align-items-center", "flex-wrap", "mt-2");

    //Присваиваем li атрибут
    liElem.setAttribute("data-task-id", _id);

    //Создаём заголовок задачи span
    const heading = document.createElement("span");
    heading.textContent = title;
    heading.style.fontWeight = 600;

    //Создаём контент параграф
    const content = document.createElement("p");
    content.classList.add("mt-2", "w-100");
    content.textContent = body;

    //Создаём кнопку
    const btnDelete = document.createElement("button");
    btnDelete.classList.add("btn", "btn-danger", "ml-auto", "delete-btn");
    btnDelete.textContent = "Delete task";

    liElem.appendChild(heading);
    liElem.appendChild(content);
    liElem.appendChild(btnDelete);

    return liElem; //Возвращаем li, чтобы воспользоваться снаружи этой функцией

  }

  //Функция отправки формы
  function onFormSubmitHandler(e) {
    e.preventDefault();
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;

    if (!titleValue || !bodyValue) {
      alert("Inputs empty")
      return;
    }

    //Принимаем данные введённые в инпуты
    const task = createNewTask(titleValue, bodyValue);

    const listItem = listItemTemplate(task);
    //Добавляем в контейнер задачу, после открываюего тега, перед всеми элементами(вначало) 
    listContainer.insertAdjacentElement("afterbegin", listItem);

    form.reset();// Очищаем форму
  }

  //Создание новой задачи
  function createNewTask(title, body) {
    const newTask = {
      title,
      body,
      comleted: false,
      _id: `task-${Math.random()}`
    };

    //Под новым id создаём новую задачу
    objOfTasks[newTask._id] = newTask;

    return { ...newTask };
  }
  
  function deleteTask(id) {
    const { title } = objOfTasks[id];
    const IsConfirm = confirm("Вы точно хотите удалить задачу: " + `${title}`);
    if (!IsConfirm) {
      return;
    }
    
    delete objOfTasks[id];
    return IsConfirm;
  }

  function deleteTaskFromHTML(el, confirmed) {
    if (!confirmed) return;
    el.remove();
  }

  function onDeleteHandler({ target }) {
    if (target.classList.contains("delete-btn")) {
      //Получаем родителя по дата атрибуту
      const parent = target.closest("[data-task-id]");
      //Вытягиваем id
      const id = parent.dataset.taskId;
      const confirm = deleteTask(id);
      deleteTaskFromHTML(parent, confirm);
    }
  }

})(tasks);

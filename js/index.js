const addNewTask = document.querySelector('#addNewTask');
const formAddTask = document.querySelector('#formAddTask');
const addInputName = document.querySelector('#addInputName');
const addInputDescription = document.querySelector('#addInputDescription');
const addInputAssignedTo = document.querySelector('#addInputAssignedTo');
const addInputDueDate = document.querySelector('#addInputDueDate');
const addInputStatus = document.querySelector('#addInputStatus');
const addSubmitBtn = document.querySelector('#addSubmitBtn');
const addResetBtn = document.querySelector('#addResetBtn');
const addCloseModal = document.querySelector('#addCloseModal');

const showTaskList = document.querySelector('#showTaskList');

let editInputId = document.querySelector('#editInputId');
let editInputName = document.querySelector('#editInputName');
let editInputDescription = document.querySelector('#editInputDescription');
let editInputAssignedTo = document.querySelector('#editInputAssignedTo');
let editInputDueDate = document.querySelector('#editInputDueDate');
let editInputStatus = document.querySelector('#editInputStatus');
let editSaveBtn = document.querySelector('#editSaveBtn');
let editResetBtn = document.querySelector('#editResetBtn');
let editCloseModal = document.querySelector('#editCloseModal');
let editBtn = document.getElementsByClassName('editBtn');

const showDate = document.querySelector('#showDate');
const showTime = document.querySelector('#showTime');

let editInputNamePrev;
let editInputDescriptionPrev;
let editInputAssignedToPrev;
let editInputDueDatePrev;
let editInputStatusPrev;

const todoColumn = document.querySelector('#todoColumn');
const inProgressColumn = document.querySelector('#inProgressColumn');
const reviewColumn = document.querySelector('#reviewColumn');
const doneColumn = document.querySelector('#doneColumn');

let taskArray = [
  {
    id: '1',
    name: 'meet team',
    description: 'at the office at 10.30AM',
    assignedTo: 'john wayne',
    dueDate: '08-06-2022',
    status: 'todo',
  },
  {
    id: '2',
    name: 'pay the gas bill',
    description: 'pay for 3 months',
    assignedTo: 'Sarah Brown',
    dueDate: '09-06-2022',
    status: 'in progress',
  },
  {
    id: '3',
    name: 'food shopping',
    description: 'need to check all lists',
    assignedTo: 'jane jackson',
    dueDate: '24-06-2022',
    status: 'review',
  },
  {
    id: '4',
    name: 'go to the bank',
    description: 'check all the accounts',
    assignedTo: 'mark timber',
    dueDate: '05-06-2022',
    status: 'done',
  },
  {
    id: '5',
    name: 'pick up from school',
    description: 'have to arrive at 5.15PM',
    assignedTo: 'mark timber',
    dueDate: '07-06-2022',
    status: 'done',
  },
];

class Task {
  constructor(id, name, description, assignedTo, dueDate, status) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.assignedTo = assignedTo;
    this.dueDate = dueDate;
    this.status = status;
  }
}

class TaskManager {
  static displayTaskListToUI() {
    const tasks = taskArray;
    console.log(tasks);
    tasks.forEach(task => TaskManager.render(task));
  }

  static addToStatusColumn(status) {
    switch (status) {
      case 'todo':
        return todoColumn;
      case 'in progress':
        return inProgressColumn;
      case 'review':
        return reviewColumn;
      case 'done':
        return doneColumn;
    }
  }

  static createTaskHTML(task) {
    taskArray.push(task);
    console.log({ taskArray });
  }

  static render(task) {
    const divElement = document.createElement('div');
    divElement.classList.add('col-12', 'text-start', 'mb-2');
    divElement.innerHTML = `<div class='card border-secondary'>
    <div class='card-body boxShadow'>
      <h5 class='card-title fs-4 pb-3 text-capitalize'>${task.name}</h5>
      <p class='card-text pb-3 firstLetter'>${task.description}</p>
      <p class='card-text text-capitalize'><span class='fw-bold pe-3'>Assigned to :</span>${
        task.assignedTo
      }</p>
      <p class='card-text'><span class='fw-bold pe-3'>Due Date :</span>${
        task.dueDate
      }</p>
      <p class='card-text pb-3 text-capitalize'><span class='fw-bold pe-3'>Status :</span><span class=${Utility.checkColor(
        task.status
      )}>${task.status}</span></p>
      <div class='col d-flex justify-content-between align-items-center'>
        <div style='display:none'>${task.id}</div>
        <button class='btn border-dark delete' type='submit'>Delete</button>
        ${
          task.status === 'done'
            ? `<span></span>`
            : `<button type='button' class='btn border border-dark taskStatus'>Mark as Done</button>`
        }
        <button class='btn border border-dark edit editRemoveFocus' type='submit' data-bs-toggle='modal' data-bs-target='#staticEditBackdrop'>Edit</button>
      </div>
    </div>
</div>`;

    let statusColumn = TaskManager.addToStatusColumn(task.status);
    statusColumn.appendChild(divElement);
  }

  static editTask(e) {
    const taskId =
      e.target.previousElementSibling.previousElementSibling
        .previousElementSibling.textContent;
    const editedTask = taskArray.filter(task => task.id === taskId);
    editInputId.textContent = taskId;
    editInputName.value = editedTask[0].name;
    editInputDescription.value = editedTask[0].description;
    editInputAssignedTo.value = editedTask[0].assignedTo;
    editInputDueDate.value = editedTask[0].dueDate;
    editInputStatus.value = editedTask[0].status;

    editInputNamePrev = editedTask[0].name;
    editInputDescriptionPrev = editedTask[0].description;
    editInputAssignedToPrev = editedTask[0].assignedTo;
    editInputDueDatePrev = editedTask[0].dueDate;
    editInputStatusPrev = editedTask[0].status;
  }

  static saveEditedTask(e) {
    e.preventDefault();
    const taskId =
      e.target.previousElementSibling.previousElementSibling.textContent;
    taskArray.forEach(task => {
      if (task.id === taskId) {
        task.name = editInputName.value;
        task.description = editInputDescription.value;
        task.assignedTo = editInputAssignedTo.value;
        task.dueDate = editInputDueDate.value;
        task.status = editInputStatus.value;
      }
    });

    console.log({ taskArray });
    editSaveBtn.setAttribute('data-bs-dismiss', 'modal');
    editSaveBtn.click();
    (() => {
      editSaveBtn.setAttribute('data-bs-dismiss', '');
    })();
  }

  static resetEditedTask(e) {
    e.preventDefault();
    editInputName.value = editInputNamePrev;
    editInputDescription.value = editInputDescriptionPrev;
    editInputAssignedTo.value = editInputAssignedToPrev;
    editInputDueDate.value = editInputDueDatePrev;
    editInputStatus.value = editInputStatusPrev;
  }
}

class Validation {
  static isRequired(input) {
    return input === '' ? false : true;
  }

  static isBetween(inputLength, min, max) {
    return inputLength > min && inputLength <= max ? true : false;
  }

  static isFormattedDate(input) {
    const pattern =
      /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    return input.match(pattern);
  }

  static addCheckName() {
    let valid = false;
    const min = 3;
    const max = 30;
    const name = addInputName.value.trim();

    if (!Validation.isRequired(name)) {
      Validation.showError(addInputName, 'Name cannot be blank.');
    } else if (!Validation.isBetween(name.length, min, max)) {
      Validation.showError(
        addInputName,
        `Name must be between ${min} and ${max} characters.`
      );
    } else {
      Validation.showSuccess(addInputName);
      valid = true;
    }

    return valid;
  }

  static addCheckDescription() {
    let valid = false;
    const description = addInputDescription.value.trim();
    if (Validation.isRequired(description)) {
      Validation.showSuccess(addInputDescription);
      valid = true;
    } else {
      Validation.showError(addInputDescription, 'Description cannot be blank.');
    }
    return valid;
  }

  static addCheckAssignedTo() {
    let valid = false;
    const assignedTo = addInputAssignedTo.value.trim();
    if (Validation.isRequired(assignedTo)) {
      Validation.showSuccess(addInputAssignedTo);
      valid = true;
    } else {
      Validation.showError(addInputAssignedTo, 'Assigned to cannot be blank.');
    }
    return valid;
  }

  static addCheckDueDate() {
    let valid = false;
    const dueDate = addInputDueDate.value.trim();
    if (!Validation.isRequired(dueDate)) {
      Validation.showError(addInputDueDate, 'Due date cannot be blank.');
    } else if (!Validation.isFormattedDate(dueDate)) {
      Validation.showError(
        addInputDueDate,
        'Due date have to be in this format : DD-MM-YYYY'
      );
    } else {
      Validation.showSuccess(addInputDueDate);
      valid = true;
    }
    return valid;
  }

  static addCheckStatus() {
    let valid = false;
    const status = addInputStatus.value.trim();
    if (Validation.isRequired(status)) {
      Validation.showSuccess(addInputStatus);
      valid = true;
    } else {
      Validation.showError(addInputStatus, 'Status cannot be blank.');
    }
    return valid;
  }

  static editCheckName() {
    let valid = false;
    const min = 3;
    const max = 30;
    const name = editInputName.value.trim();

    if (!Validation.isRequired(name)) {
      Validation.showError(editInputName, 'Name cannot be blank.');
    } else if (!Validation.isBetween(name.length, min, max)) {
      Validation.showError(
        editInputName,
        `Name must be between ${min} and ${max} characters.`
      );
    } else {
      Validation.showSuccess(editInputName);
      valid = true;
    }

    return valid;
  }

  static editCheckDescription() {
    let valid = false;
    const description = editInputDescription.value.trim();
    if (Validation.isRequired(description)) {
      Validation.showSuccess(editInputDescription);
      valid = true;
    } else {
      Validation.showError(
        editInputDescription,
        'Description cannot be blank.'
      );
    }
    return valid;
  }

  static editCheckAssignedTo() {
    let valid = false;
    const assignedTo = editInputAssignedTo.value.trim();
    if (Validation.isRequired(assignedTo)) {
      Validation.showSuccess(editInputAssignedTo);
      valid = true;
    } else {
      Validation.showError(editInputAssignedTo, 'Assigned to cannot be blank.');
    }
    return valid;
  }

  static editCheckDueDate() {
    let valid = false;
    const dueDate = editInputDueDate.value.trim();
    if (!Validation.isRequired(dueDate)) {
      Validation.showError(editInputDueDate, 'Due date cannot be blank.');
    } else if (!Validation.isFormattedDate(dueDate)) {
      Validation.showError(
        editInputDueDate,
        'Due date have to be in this format : DD-MM-YYYY'
      );
    } else {
      Validation.showSuccess(editInputDueDate);
      valid = true;
    }
    return valid;
  }

  static editCheckStatus() {
    let valid = false;
    const status = editInputStatus.value.trim();
    if (Validation.isRequired(status)) {
      Validation.showSuccess(editInputStatus);
      valid = true;
    } else {
      Validation.showError(editInputStatus, 'Status cannot be blank.');
    }
    return valid;
  }

  static showError(input, message) {
    const formField = input.parentElement;
    const small = formField.querySelector('small');
    small.textContent = message;
  }

  static showSuccess(input) {
    const formfield = input.parentElement;
    const small = formfield.querySelector('small');
    small.textContent = '';
  }

  static resetAddFormFields() {
    Validation.showSuccess(addInputName);
    Validation.showSuccess(addInputDescription);
    Validation.showSuccess(addInputAssignedTo);
    Validation.showSuccess(addInputDueDate);
    Validation.showSuccess(addInputStatus);
    formAddTask.reset();
  }
}

// Utility Class: Provides Utility Methods
class Utility {
  static create_UUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  }

  static showDate() {
    const date = new Date();
    const today =
      date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

    const dateTextNode = document.createTextNode(today);
    return dateTextNode;
  }

  static showTime() {
    const date = new Date();
    const timeTextNode = document.createTextNode(date.toLocaleTimeString());
    return timeTextNode;
  }

  static checkColor(status) {
    switch (status) {
      case 'todo':
        return 'red';
      case 'done':
        return 'green';
      case 'in progress':
        return 'orange';
      case 'review':
        return 'blue';
    }
  }
}

//////////////////////////////////////////////////// All event section /////////////////////////////////////////////////////

// Event: Display TodoList on the screen
document.addEventListener('DOMContentLoaded', TaskManager.displayTaskListToUI);

// Event: Listen to event of Delete OR Edit OR Mark as Done
showTaskList.addEventListener('click', e => {
  if (e.target.classList.contains('delete')) {
    return null;
  } else if (e.target.classList.contains('taskStatus')) {
    return null;
  } else if (e.target.classList.contains('edit')) {
    TaskManager.editTask(e);
  }
});

// Event: Adding Submit Form
formAddTask.addEventListener('submit', e => {
  e.preventDefault();
  let isNameValid = Validation.addCheckName(),
    isDescriptionValid = Validation.addCheckDescription(),
    isAssignedToValid = Validation.addCheckAssignedTo(),
    isDueDateValid = Validation.addCheckDueDate(),
    isStatusValid = Validation.addCheckStatus();

  let isFormValid =
    isNameValid &&
    isDescriptionValid &&
    isAssignedToValid &&
    isDueDateValid &&
    isStatusValid;

  if (isFormValid) {
    const id = Utility.create_UUID();
    const name = addInputName.value;
    const description = addInputDescription.value;
    const assignedTo = addInputAssignedTo.value;
    const dueDate = addInputDueDate.value;
    const status = addInputStatus.value;

    const task = new Task(id, name, description, assignedTo, dueDate, status);

    //Add a task to taskArray
    TaskManager.createTaskHTML(task);
    TaskManager.render(task);
    Validation.resetAddFormFields();

    // To fix the Modal from not closing after click Submit button (from e.preventDefault());
    addSubmitBtn.setAttribute('data-bs-dismiss', 'modal');
    addSubmitBtn.click();
    // To remove this attribute from the modal (IIFE)
    (() => {
      addSubmitBtn.setAttribute('data-bs-dismiss', '');
    })();
  }
});

// Event: Click on Reset Button on Add Modal
addResetBtn.addEventListener('click', Validation.resetAddFormFields);

// Event: Click on X Button on Add Modal
addCloseModal.addEventListener('click', Validation.resetAddFormFields);

// Event: Save Edited Task
editSaveBtn.addEventListener('click', e => {
  e.preventDefault();
  let isNameValid = Validation.editCheckName(),
    isDescriptionValid = Validation.editCheckDescription(),
    isAssignedToValid = Validation.editCheckAssignedTo(),
    isDueDateValid = Validation.editCheckDueDate(),
    isStatusValid = Validation.editCheckStatus();

  let isFormValid =
    isNameValid &&
    isDescriptionValid &&
    isAssignedToValid &&
    isDueDateValid &&
    isStatusValid;

  if (isFormValid) {
    TaskManager.saveEditedTask(e);
  }
});

// Event: Reset to Prev Data of a Task
editResetBtn.addEventListener('click', TaskManager.resetEditedTask);

// Show Date and Time when page load
showDate.appendChild(Utility.showDate());
showTime.appendChild(Utility.showTime());

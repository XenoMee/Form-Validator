const formEl = document.querySelector('.form');
const usernameEl = document.querySelector('#username');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
const password2El = document.querySelector('#password2');

const showError = (input, message) => {
  const formControl = input.parentElement;
  const smallEl = formControl.querySelector('small');

  formControl.className = 'form-control error';
  smallEl.innerText = message;
};

const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
};

const checkEmail = (input) => {
  const regex = /[^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$]/;
  regex.test(input.value.trim())
    ? showSuccess(input)
    : showError(input, 'Invalid email address');
};

const checkLength = (input, min, max) => {
  if (input.value.length < min)
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  else if (input.value.length > max)
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  else showSuccess(input);
};

const checkPasswordMatch = (input1, input2) =>
  input1.value !== input2.value
    ? showError(input2, 'Passwords do not match')
    : null;

const getFieldName = (input) =>
  input.id.charAt(0).toUpperCase() + input.id.slice(1);

const checkRequired = (inputArr) => {
  inputArr.forEach((input) =>
    input.value.trim() === ''
      ? showError(input, `${getFieldName(input)} is required`)
      : showSuccess(input)
  );
};

formEl.addEventListener('submit', (e) => {
  e.preventDefault();

  checkRequired([usernameEl, emailEl, passwordEl, password2El]);
  checkLength(usernameEl, 3, 15);
  checkLength(passwordEl, 8, 20);
  checkEmail(emailEl);
  checkPasswordMatch(passwordEl, password2El);
});

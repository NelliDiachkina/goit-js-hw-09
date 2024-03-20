const formEl = document.querySelector('.feedback-form');
const localStorageKey = 'feedback-form-state';

loadFormDataFromLocalStorage(formEl, localStorageKey);

formEl.addEventListener('input', saveFormStateToLocalStorage);
formEl.addEventListener('submit', handlerFormSubmit);

function loadFormDataFromLocalStorage(form, key) {
  const savedData = localStorage.getItem(key);

  if (savedData) {
    const { email, message } = JSON.parse(savedData);
    form.elements.email.value = email ?? '';
    form.elements.message.value = message ?? '';
  }
}

function saveFormStateToLocalStorage(e) {
  const data = {
    email: e.currentTarget.elements.email.value.trim(),
    message: e.currentTarget.elements.message.value.trim(),
  };

  localStorage.setItem(localStorageKey, JSON.stringify(data));
}

function handlerFormSubmit(e) {
  e.preventDefault();
  const formData = JSON.parse(localStorage.getItem(localStorageKey));

  if (!formData) {
    return alert('Please fill in all the fields before submitting');
  }

  const { email, message } = formData;

  if (!email || !message) {
    return alert('All form fields must be filled in');
  }

  console.log(formData);

  localStorage.removeItem(localStorageKey);
  formEl.reset();
}

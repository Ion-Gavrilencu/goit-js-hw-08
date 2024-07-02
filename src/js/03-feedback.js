import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;

const LOCAL_STORAGE_KEY = 'feedback-form-state';

// Funcție pentru salvarea datelor în local storage cu throttle
const saveFormState = throttle(() => {
    const formData = {
        email: emailInput.value,
        message: messageInput.value,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
}, 500);

// Funcție pentru încărcarea stării formularului din local storage
const loadFormState = () => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
        const { email, message } = JSON.parse(savedData);
        emailInput.value = email || '';
        messageInput.value = message || '';
    }
};

// Adaugarea evenimentului input pentru a salva starea formularului
form.addEventListener('input', saveFormState);

// Evenimentul de submit pentru a șterge starea din local storage și a afișa datele
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = {
        email: emailInput.value,
        message: messageInput.value,
    };
    console.log('Form submitted:', formData);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    form.reset();
});

// Încărcarea stării formularului la încărcarea paginii
document.addEventListener('DOMContentLoaded', loadFormState);


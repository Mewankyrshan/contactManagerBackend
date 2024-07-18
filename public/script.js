document.addEventListener('DOMContentLoaded', () => {
    const authSection = document.getElementById('auth-section');
    const contactsSection = document.getElementById('contacts-section');
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const contactForm = document.getElementById('contact-form');
    const contactsList = document.getElementById('contacts-list');
    const logoutButton = document.getElementById('logout-button');
    let token = '';

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        if (response.ok) {
            alert('Registration successful!');
        } else {
            const error = await response.json();
            alert('Registration failed: ' + error.message);
        }
    });
    // Login Issue#1
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            token = data.accessToken;
            authSection.style.display = 'none';
            contactsSection.style.display = 'block';
            loadContacts();
        } else {
            const error = await response.json();
            alert('Login failed: ' + error.message);
        }
    });

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const phone = document.getElementById('contact-phone').value;

        const response = await fetch('/api/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name, email, phone })
        });

        if (response.ok) {
            loadContacts();
        } else {
            const error = await response.json();
            alert('Failed to add contact: ' + error.message);
        }
    });

    logoutButton.addEventListener('click', () => {
        token = '';
        authSection.style.display = 'block';
        contactsSection.style.display = 'none';
    });

    async function loadContacts() {
        const response = await fetch('/api/contacts', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const contacts = await response.json();
            contactsList.innerHTML = '';
            contacts.forEach(contact => {
                const li = document.createElement('li');
                li.textContent = `${contact.name} - ${contact.email} - ${contact.phone}`;
                contactsList.appendChild(li);
            });
        } else {
            const error = await response.json();
            alert('Failed to load contacts: ' + error.message);
        }
    }
});

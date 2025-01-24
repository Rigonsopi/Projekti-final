const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();

    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    
    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }

    
    alert(`Thank you, ${name}! Your message has been sent successfully.`);
    form.reset();
});


const inputs = document.querySelectorAll('input, textarea');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.style.borderColor = '#0044cc';
        input.style.transition = 'border-color 0.3s';
    });

    input.addEventListener('blur', () => {
        input.style.borderColor = '#ccc';
    });
});


const messageField = document.getElementById('message');
const charCounter = document.createElement('p');
charCounter.id = 'char-counter';
charCounter.style.textAlign = 'right';
charCounter.style.color = '#666';
charCounter.textContent = '0/500';
messageField.insertAdjacentElement('afterend', charCounter);

messageField.addEventListener('input', () => {
    const currentLength = messageField.value.length;
    charCounter.textContent = `${currentLength}/500`;
    charCounter.style.color = currentLength > 500 ? 'red' : '#666';
});

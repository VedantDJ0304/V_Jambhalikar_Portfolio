   // script.js
   const phrases = [
    "Web Developer ",
    "Problem Solver ",
    ];
  
  let currentPhrase = 0;
  let charIndex = 0; // Fixed from 2 to 0
  let isDeleting = false;
  const typingTextElement = document.getElementById("typing-text");
  
  function type() {
    const current = phrases[currentPhrase];
    if (isDeleting) {
        typingTextElement.textContent = current.substring(0, charIndex--);
    } else {
        typingTextElement.textContent = current.substring(0, charIndex++);
    }
  
    if (!isDeleting && charIndex === current.length) {
        isDeleting = true;
        setTimeout(type, 1500); // Pause before deleting
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        currentPhrase = (currentPhrase + 1) % phrases.length;
        setTimeout(type, 200); // Short pause before typing next phrase
    } else {
        setTimeout(type, isDeleting ? 40 : 100); // Speed of typing and deleting
    }
  }

  const form = document.getElementById('contactForm');
  const alertBox = document.getElementById('alertSuccess');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      form.reset();
      alertBox.classList.remove('d-none');
    } else {
      alert('Oops! Something went wrong.');
    }
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    if (typingTextElement) type();
  });

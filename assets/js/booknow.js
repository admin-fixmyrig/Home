
  const form = document.getElementById('contact-form');
  const responseMessage = document.getElementById('response-message');

  form.addEventListener('submit', async function (event) {
    event.preventDefault(); // stop default reload

    const formData = new FormData(form);
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJson = JSON.stringify(plainFormData);

    const response = await fetch(form.action, {
      method: form.method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: formDataJson
    });

    if (response.ok) {
      responseMessage.textContent = 'Thanks for your message! We’ll get back to you soon.';
      form.reset();
    } else {
      responseMessage.textContent = 'Oops! Something went wrong. Please try again.';
    }
  });


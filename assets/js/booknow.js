const form = document.getElementById('contact-form');
const responseDiv = document.getElementById('response-message');
const submitBtn = document.getElementById('submitBtn');

// Custom form submission via fetch
form.addEventListener('submit', async function (e) {
e.preventDefault(); // prevent default HTML form submission

const formData = new FormData(form);

try {
    const response = await fetch(form.action, {
    method: form.method,
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
});

if (response.ok) {
    responseDiv.textContent = "Thank you! Your message has been sent.";
    form.reset();
    } else {
    const errorData = await response.json();
    console.log("Formspree error:", errorData);
    responseDiv.textContent = "Oops! There was a problem sending your message.";
    }
 } catch (error) {
      responseDiv.textContent = "Network error. Please try again.";
    }
  });

  // When button is outside form, trigger the submit event manually
  submitBtn.addEventListener('click', function () {
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  });


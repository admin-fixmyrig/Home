<script>
  const form = document.getElementById('contact-form');
  const responseDiv = document.getElementById('response-message');
  const submitBtn = document.getElementById('submitBtn');

  // On button click, dispatch submit event to form
  submitBtn.addEventListener('click', function () {
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  });

  // Form submission handler
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      const result = await response.json();

      if (response.ok) {
        responseDiv.textContent = "Thank you! Your message has been sent.";
        form.reset();
      } else {
        console.error("Formspree error:", result);
        responseDiv.textContent = result.message || "Oops! There was a problem sending your message.";
      }
    } catch (error) {
      console.error("Network error:", error);
      responseDiv.textContent = "Network error. Please try again.";
    }
  });
</script>

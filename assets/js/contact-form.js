document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const responseMessage = document.getElementById("response-message");
  const submitBtn = document.getElementById("submitBtn");

  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // prevent reload

    // Honeypot check
    if (document.getElementById("gotcha").value) {
      console.warn("Spam bot detected — form not sent.");
      return;
    }

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.value = "Sending...";

    const formData = new FormData(form);
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJson = JSON.stringify(plainFormData);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: formDataJson,
      });

      if (response.ok) {
        responseMessage.style.color = "green";
        responseMessage.textContent =
          "✅ Thanks for your message! We’ll get back to you soon.";
        form.reset();
      } else {
        responseMessage.style.color = "red";
        responseMessage.textContent =
          "❌ Oops! Something went wrong. Please try again.";
      }
    } catch (error) {
      responseMessage.style.color = "red";
      responseMessage.textContent =
        "⚠️ Network error. Please check your connection.";
    }

    // Reset button state
    submitBtn.disabled = false;
    submitBtn.value = "Book Now";
  });
});

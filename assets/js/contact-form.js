document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const responseMessage = document.getElementById("response-message");
  const submitBtn = document.getElementById("submitBtn");

  // Initial style for fade-in effect
  responseMessage.style.opacity = "0";
  responseMessage.style.transition = "opacity 0.5s ease-in-out";

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

    // Hide message before showing a new one
    responseMessage.style.opacity = "0";

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
        // Hue 240 is pure blue, vary lightness from 0% (black) to 100% (white)
        let lightness = 50; // 50% is normal, lower is darker, higher is lighter
        responseMessage.style.color = 'hsl(240, 100%, ${lightness}%)';
        responseMessage.textContent =
          "Thanks for your message! We’ll get back to you soon.";
        form.reset();
      } else {
        responseMessage.style.color = "black";
        responseMessage.textContent =
          "Oops! Something went wrong. Please try again.";
      }
    } catch (error) {
      responseMessage.style.color = "black";
      responseMessage.textContent =
        "Network error. Please check your connection.";
    }

    // Fade in the message
    setTimeout(() => {
      responseMessage.style.opacity = "1";
    }, 50);

    // Reset button state
    submitBtn.disabled = false;
    submitBtn.value = "Book Now";
  });
});



document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form values
            const name = contactForm.querySelector('[name="name"]').value;
            const email = contactForm.querySelector('[name="email"]').value;
            const message = contactForm.querySelector('[name="message"]').value;
            
            // Change button state
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="material-symbols-outlined animate-spin hidden">progress_activity</span> <span>Sending...</span>';
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-70', 'cursor-not-allowed');
            
            try {
                // Using FormSubmit AJAX API
                const response = await fetch("https://formsubmit.co/ajax/info.sachinmaharjan@gmail.com", {
                    method: "POST",
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        _subject: "New Contact Form Submission from Portfolio",
                        name: name,
                        email: email,
                        message: message
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    // Show success message
                    formMessage.className = "rounded-xl p-4 text-sm font-medium bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800";
                    formMessage.innerHTML = "<strong>Message sent successfully!</strong> I will get back to you soon. <br/><span class='text-xs opacity-80'>(Note: For the very first submission, Formsubmit will send you an email to activate your account. Please check your inbox!)</span>";
                    formMessage.classList.remove('hidden');
                    contactForm.reset();
                } else {
                    throw new Error(data.message || "Failed to send message");
                }
            } catch (error) {
                // Show error message
                formMessage.className = "rounded-xl p-4 text-sm font-medium bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800";
                formMessage.textContent = "Oops! Something went wrong. Please try again later. (" + error.message + ")";
                formMessage.classList.remove('hidden');
            } finally {
                // Restore button state
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('opacity-70', 'cursor-not-allowed');
                
                // Hide success/error message after 10 seconds
                setTimeout(() => {
                    formMessage.classList.add('hidden');
                }, 10000);
            }
        });
    }
});

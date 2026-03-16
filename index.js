document.addEventListener('DOMContentLoaded', () => {
    // 1. WhatsApp Integration with pre-filled message
    // Ghana country code is +233. Removing the leading '0' from '055 919 9622'
    const phoneNumber = "23320208332"; 
    const message = "Hello Ivision Centre! I am reaching out from your website. I would like to make an inquiry and potentially book an appointment.";
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Set the href attribute for the floating button
    document.getElementById('whatsapp-btn').setAttribute('href', whatsappLink);

    // 2. Active Navigation Highlighting on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjust threshold slightly for the fixed navbar
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 3. Form Submission Handling (Demo)
 // 3. Form Submission Handling (with Telegram Bot Integration)
    const bookingForm = document.getElementById('bookingForm');
    if(bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent actual form submission refresh

            // Gather the data from the inputs
            const name = bookingForm.querySelector('input[placeholder="Full Name"]').value;
            const email = bookingForm.querySelector('input[placeholder="Email Address"]').value;
            const phone = bookingForm.querySelector('input[placeholder="Phone Number"]').value;
            const serviceSelect = bookingForm.querySelector('select');
            const service = serviceSelect.options[serviceSelect.selectedIndex].text;
            const additionalRequest = document.getElementById('additionalRequest').value || "None provided";
            const date = bookingForm.querySelector('input[type="date"]').value;

            // Format the message nicely for Telegram
            const telegramMessage = `
📅 *New Appointment Request*

👤 *Name:* ${name}
📧 *Email:* ${email}
📞 *Phone:* ${phone}
🩺 *Service:* ${service}
📝 *Specific Request:* ${additionalRequest}
🗓️ *Date:* ${date}
            `;

            // Telegram Bot Configuration
            const botToken = "7698861947:AAHD_0sTzjMlHpW3sFPDEHUMv8-srBmR2k8";
            const chatId = "7906406053";
            const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

            // Send the data to Telegram via Fetch API
            fetch(telegramUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: telegramMessage,
                    parse_mode: 'Markdown'
                })
            })
            .then(response => {
                if(response.ok) {
                    // Success Message
                    alert("Thank you! Your form has been submitted successfully. Our team will contact you shortly.");
                    bookingForm.reset(); // Clear the form
                } else {
                    alert("Oops! Something went wrong while sending your request. Please try again.");
                }
            })
            .catch(error => {
                console.error("Error sending to Telegram:", error);
                alert("Error submitting the form. Please check your internet connection.");
            });
        });
    }

    // 4. Mobile Menu Toggle (Basic implementation)
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinksContainer = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        if(navLinksContainer.style.display === 'flex') {
            navLinksContainer.style.display = 'none';
        } else {
            navLinksContainer.style.display = 'flex';
            navLinksContainer.style.flexDirection = 'column';
            navLinksContainer.style.position = 'absolute';
            navLinksContainer.style.top = '60px';
            navLinksContainer.style.left = '0';
            navLinksContainer.style.width = '100%';
            navLinksContainer.style.background = 'rgba(255, 255, 255, 0.95)';
            navLinksContainer.style.padding = '20px';
        }
    });
});
// Form submission
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('Contact-Form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            // Show loading state
            const submitButton = this.querySelector('input[type="submit"]');
            const originalValue = submitButton.value;
            submitButton.value = 'Sending...';
            submitButton.disabled = true;

            // Create a temporary form for submission
            const tempForm = document.createElement('form');
            tempForm.method = 'POST';
            tempForm.action = 'https://script.google.com/macros/s/AKfycbwMxDJ5YanvpGL4gW9lUjjmpL6T6_7IApy3yJU2ABBYuThYl3p8MNFHxfmSc458gNiM/exec';
            tempForm.style.display = 'none';
            
            // Add all form fields
            Object.keys(data).forEach(key => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = data[key];
                tempForm.appendChild(input);
            });
            
            // Add form to document and submit
            document.body.appendChild(tempForm);
            
            // Use XMLHttpRequest to submit the form without navigation
            const xhr = new XMLHttpRequest();
            xhr.open('POST', tempForm.action, true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            
            // Convert form data to URL-encoded string
            const formDataString = new URLSearchParams(data).toString();
            
            xhr.onload = function() {
                // Reset form and update button text
                form.reset();
                submitButton.value = 'Message sent!';
                submitButton.disabled = true;
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitButton.value = originalValue;
                    submitButton.disabled = false;
                }, 3000);
                
                // Clean up
                document.body.removeChild(tempForm);
            };
            
            xhr.onerror = function() {
                // Reset button state on error
                submitButton.value = originalValue;
                submitButton.disabled = false;
                document.body.removeChild(tempForm);
            };
            
            xhr.send(formDataString);
        });
    } else {
        console.warn('Contact form not found on page');
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Lightbox functionality
const lightbox = document.querySelector('.lightbox');
const lightboxVideo = lightbox.querySelector('.lightbox-video');
const lightboxTitle = lightbox.querySelector('.lightbox-title');
const lightboxClose = lightbox.querySelector('.lightbox-close');

document.querySelectorAll('.gallery21_lightbox-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const videoUrl = this.getAttribute('data-video');
        const title = this.getAttribute('data-title');
        
        lightboxVideo.src = videoUrl;
        lightboxTitle.textContent = title;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
    lightboxVideo.src = '';
    document.body.style.overflow = '';
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        lightboxVideo.src = '';
        document.body.style.overflow = '';
    }
});

// Navbar animation
const navbar = document.getElementById('navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  let scrollTop = window.scrollY;

  console.log("Scroll event fired. Current scroll position:", scrollTop);

  if (scrollTop > lastScrollTop && scrollTop > 50) {
    console.log("Scrolling down – shrinking navbar.");
    navbar.classList.add('shrink');
  } else {
    console.log("Scrolling up – expanding navbar.");
    navbar.classList.remove('shrink');
  }

  lastScrollTop = scrollTop;
});


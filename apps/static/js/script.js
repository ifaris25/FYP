(function () {
    // Get references to the DOM elements
    const inputField = document.getElementById("user_input");
    const errorMsg = document.getElementById("error-msg");
    const inputContainer = document.getElementById("inputContainer");
    const form = document.getElementById("myForm");
    const submitBtn = document.getElementById("submit-btn");
    
    // Mobile Navigation Elements
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileSidebar = document.querySelector('.mobile-sidebar');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const closeBtn = document.querySelector('.close-btn');
    const body = document.body;

    // Function to check input validity
    function checkValidity(value) {
        // Allow only Arabic letters
        if (!value.match(/^[\u0600-\u06FF\s]*$/)) {
            return "❌ يُسمح فقط بإدخال الحروف العربية!";
        }
        // Disallow Arabic numbers
        if (value.match(/[\u0660-\u06FF١٢٣٤٥٦٧٨٩۰]/)) {
            return "❌ غير مسموح بإدخال الأرقام العربية!";
        }
        // Allow a maximum of 10 words
        let words = value.split(/\s+/).filter(Boolean);
        if (words.length > 10) {
            return "⚠️ يُسمح بإدخال 10 كلمات كحد أقصى!";
        }
        return "";
    }

    // Listen for input events to validate in real-time
    if (inputField) {
        inputField.addEventListener("input", () => {
            const trimmedValue = inputField.value.trim();
            // If the input is empty, reset error message and hide the submit button
            if (trimmedValue === "") {
                errorMsg.textContent = "";
                errorMsg.style.display = "none";
                submitBtn.style.display = "none";
                inputContainer.classList.remove("error");
                return;
            }

            // Check validity and display error or show submit button
            const error = checkValidity(trimmedValue);
            if (error) {
                errorMsg.textContent = error;
                errorMsg.style.display = "inline-block";
                submitBtn.style.display = "none";
                inputContainer.classList.add("error");
            } else {
                errorMsg.textContent = "";
                errorMsg.style.display = "none";
                submitBtn.style.display = "inline-block";
                inputContainer.classList.remove("error");
            }
        });
    }

    // Validate form on submission and show a loading spinner
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            const trimmedValue = inputField.value.trim();
            if (trimmedValue === "") {
                return;
            }

            const error = checkValidity(trimmedValue);
            if (error) {
                return;
            }

            submitBtn.querySelector('.btn-text').style.display = 'none';  // Hide text on button
            submitBtn.querySelector('.spinner').style.display = 'inline-block';  // Show spinner

            // Submit form after a short delay (for spinner effect)
            setTimeout(() => {
                form.submit();
            }, 1000);
        });
    }
    
    // Clock Script
    function updateClock() {
        const d = new Date();
        const h = (d.getHours() % 12) || 12;
        const timeString = 
            ("0" + h).slice(-2) + ":" +
            ("0" + d.getMinutes()).slice(-2) + ":" +
            ("0" + d.getSeconds()).slice(-2);
        
        // Update both clocks
        const mainClock = document.getElementById("clock");
        const mobileClock = document.getElementById("mobile-clock");
        
        if (mainClock) mainClock.textContent = timeString;
        if (mobileClock) mobileClock.textContent = timeString;
    }
    
    // Initialize and update clock
    updateClock();
    setInterval(updateClock, 1000);

    // Function to generate random Arabic text and trigger validation
    function generateRandomText() {
        const arabicPhrases = [
            'السلام عليكم',
            'سبحان الله',
            'بسم الله الرحمن الرحيم',
            'الحمد لله',
            'لا إله إلا الله'
        ];
        const randomPhrase = arabicPhrases[Math.floor(Math.random() * arabicPhrases.length)];
        inputField.value = randomPhrase;
        inputField.dispatchEvent(new Event('input'));  // Trigger input event to validate
    }

    // Expose the function to the global scope if needed
    window.generateRandomText = generateRandomText;

    // Mobile Navigation Toggle
    function toggleMobileMenu() {
        hamburgerMenu.classList.toggle('active');
        mobileSidebar.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
        body.classList.toggle('sidebar-open');
    }
    
    // Add event listeners for mobile navigation
    if (hamburgerMenu) hamburgerMenu.addEventListener('click', toggleMobileMenu);
    if (closeBtn) closeBtn.addEventListener('click', toggleMobileMenu);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', toggleMobileMenu);

    // Typewriter effect for the placeholder text
    document.addEventListener("DOMContentLoaded", function() {
        if (!inputField) return;
        
        const placeholderText = "اكتب النص...";  // Placeholder text
        let currentIndex = 0;
        inputField.placeholder = "";
        let typeAnimationTimeout = null;  // Store timeout ID

        // Function to animate typing the placeholder text
        function typeAnimation() {
            if (currentIndex < placeholderText.length) {
                inputField.placeholder += placeholderText.charAt(currentIndex);
                currentIndex++;
                typeAnimationTimeout = setTimeout(typeAnimation, 150);  // Repeat every 150ms
            }
        }
        // Start typing animation when the page loads
        typeAnimation();

        // Stop animation and clear placeholder when input is focused
        inputField.addEventListener("focus", function() {
            if (typeAnimationTimeout) {
                clearTimeout(typeAnimationTimeout);
                typeAnimationTimeout = null;
            }
            inputField.placeholder = "";  // Clear placeholder on focus
        });

        // Restart animation if the input field loses focus and is empty
        inputField.addEventListener("blur", function() {
            if (inputField.value.trim() === "") {
                // Restart the animation when the field is empty
                currentIndex = 0;
                inputField.placeholder = "";
                typeAnimation();
            }
        });
    });
})();
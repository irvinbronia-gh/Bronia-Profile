// Grab elements
const soundButton = document.getElementById('sound-button');
const backgroundVideo = document.getElementById('background-video');
const eyeToggle = document.getElementById('eye-toggle');

// Add toggle functionality for the sound button
soundButton.addEventListener('click', () => {
    if (backgroundVideo.muted) {
        backgroundVideo.muted = false; // Unmute the video
        soundButton.innerHTML = '<i class="fas fa-volume-up"></i>'; // Change to mute icon
    } else {
        backgroundVideo.muted = true; // Mute the video
        soundButton.innerHTML = '<i class="fas fa-volume-mute"></i>'; // Change to volume icon
    }
});

// Show sound button when the eye toggle is checked
eyeToggle.addEventListener('change', (event) => {
    if (event.target.checked) {
        soundButton.style.visibility = 'visible';
        soundButton.style.opacity = '1';
    } else {
        soundButton.style.visibility = 'hidden';
        soundButton.style.opacity = '0';
    }
});




// Array of texts to cycle through
const texts = ["FIREFLY", " &hearts; FU XUAN &hearts; ", "&hearts; ACHERON &hearts; ", "&hearts; JINGLUI &hearts; ", "&hearts; HIMEKO &hearts; ", "MARCH 7TH", "&hearts; BRONYA &hearts; ", "SEELE", "HERTA", "&hearts;  KAFKA &hearts; ", "TINGYUN", "PELA", "SILVER WOLF", "ASTA",  "&hearts;&hearts;&hearts;&hearts;&hearts;FIREFLY X IRVIN&hearts;&hearts;&hearts;&hearts;&hearts;"];
let currentIndex = 0; // Index to track the current text

function changeText() {
    // Update the text to the next one in the array
    currentIndex = (currentIndex + 1) % texts.length; // Cycle through the array
    var headerText = document.getElementById("headerText");
    headerText.innerHTML = texts[currentIndex]; // Set the new text
}




function changeSlide(direction, carouselId) {
    const carousel = document.getElementById(carouselId);
    const slides = carousel.querySelectorAll('.carousel__slide');
    let currentSlide = Array.from(slides).findIndex(slide => slide.classList.contains('active'));

    // Remove active class from current slide
    slides[currentSlide].classList.remove('active');

    // Calculate new index
    currentSlide = (currentSlide + direction + slides.length) % slides.length;

    // Add active class to new slide
    slides[currentSlide].classList.add('active');
}

// Initialize each carousel
document.querySelectorAll('.carousel').forEach(carousel => {
    const slides = carousel.querySelectorAll('.carousel__slide');
    if (slides.length > 0) {
        slides[0].classList.add('active'); // Set the first slide as active
    }
}); 


//Email code

function sendMail() {
    // Get the values from the form fields
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    // Check if any field is empty
    if (name === "" || email === "" || message === "") {
        alert("Please fill in all fields before submitting.");
        return; // Exit the function if any field is empty
    }

    // Create the params object
    var params = {
        name: name,
        email: email,
        message: message,
    };

    const serviceID = "service_oenbbue";
    const templateID = "template_px0ftns";

    // Send the email
    emailjs.send(serviceID, templateID, params)
    .then(
        res => {
            // Clear the form fields
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";
            console.log(res);
            alert("Message Sent Successfully");
        }
    ).catch((err) => console.log(err));
}


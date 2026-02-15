// Wait until DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------
    // Elements
    // ----------------------------
    const soundButton = document.getElementById('sound-button');
    const eyeToggle = document.getElementById('eye-toggle');

    // ----------------------------
    // YouTube Background Video
    // ----------------------------
    let player;

    // This function is called automatically by the YouTube Iframe API
    window.onYouTubeIframeAPIReady = function() {
        player = new YT.Player('yt-player', {
            events: {
                'onReady': onPlayerReady
            }
        });
    };

    function onPlayerReady(event) {
        player.mute(); // Initially muted
    }

    // Toggle sound button
    soundButton.addEventListener('click', () => {
        if (!player) return; // safety
        if (player.isMuted()) {
            player.unMute();
            soundButton.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            player.mute();
            soundButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    });

    // Show/hide sound button with eye toggle
    if (eyeToggle) {
        eyeToggle.addEventListener('change', (event) => {
            if (event.target.checked) {
                soundButton.style.visibility = 'visible';
                soundButton.style.opacity = '1';
            } else {
                soundButton.style.visibility = 'hidden';
                soundButton.style.opacity = '0';
            }
        });
    }

    // ----------------------------
    // Header Text Cycling
    // ----------------------------
    const texts = [
        "FIREFLY", " &hearts; FU XUAN &hearts; ", "&hearts; ACHERON &hearts; ",
        "&hearts; JINGLUI &hearts; ", "&hearts; HIMEKO &hearts; ", "MARCH 7TH",
        "&hearts; BRONYA &hearts; ", "SEELE", "HERTA", "&hearts;  KAFKA &hearts; ",
        "TINGYUN", "PELA", "SILVER WOLF", "ASTA", "&hearts;&hearts;&hearts;&hearts;&hearts;FIREFLY X IRVIN&hearts;&hearts;&hearts;&hearts;&hearts;"
    ];
    let currentIndex = 0;

    window.changeText = function() {
        currentIndex = (currentIndex + 1) % texts.length;
        const headerText = document.getElementById("headerText");
        if (headerText) headerText.innerHTML = texts[currentIndex];
    };

    // ----------------------------
    // Carousel Functionality
    // ----------------------------
    window.changeSlide = function(direction, carouselId) {
        const carousel = document.getElementById(carouselId);
        if (!carousel) return;
        const slides = carousel.querySelectorAll('.carousel__slide');
        if (!slides.length) return;

        let currentSlide = Array.from(slides).findIndex(slide => slide.classList.contains('active'));
        if (currentSlide === -1) currentSlide = 0;

        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + direction + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    };

    // Initialize all carousels
    document.querySelectorAll('.carousel').forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel__slide');
        if (slides.length > 0) {
            slides[0].classList.add('active'); // first slide active
        }
    });

    // ----------------------------
    // Email Sending Function
    // ----------------------------
    window.sendMail = function() {
        const name = document.getElementById("name")?.value || "";
        const email = document.getElementById("email")?.value || "";
        const message = document.getElementById("message")?.value || "";

        if (!name || !email || !message) {
            alert("Please fill in all fields before submitting.");
            return;
        }

        const params = { name, email, message };
        const serviceID = "service_oenbbue";
        const templateID = "template_px0ftns";

        emailjs.send(serviceID, templateID, params)
            .then(res => {
                document.getElementById("name").value = "";
                document.getElementById("email").value = "";
                document.getElementById("message").value = "";
                console.log(res);
                alert("Message Sent Successfully");
            })
            .catch(err => console.log(err));
    };

}); // end DOMContentLoaded

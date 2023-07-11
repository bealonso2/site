// Functions to activate dark and light modes
function activateDarkMode() {
    $("body").removeClass("day");
    $("body").addClass("night");
}
function activateLightMode() {
    $("body").addClass("day");
    $("body").removeClass("night");
}

// Event listeners for clicking the sun and moon
$(document).ready(function () {
    $("#moon").click(function () {
        activateLightMode();
    });
    $("#sun").click(function () {
        activateDarkMode();
    });
    // Check if dark mode is enabled for page load
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        activateDarkMode();
    }
});

// Activate dark mode when the user changes their settings if the event matches
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches)
        activateDarkMode();
});

// Activate light mode when the user changes their settings if the event matches
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', event => {
    if (event.matches)
        activateLightMode();
});

// Set the date we're counting up from
var countUpDate = new Date("Jan 25, 2022 09:00:00").getTime();

// Update the count up every 1 second
var x = setInterval(function () {

    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = now - countUpDate;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="counter"
    $("#counter").html(`${days} days, ${hours} hour${hours === 1 ? "" : "s"}, ${minutes} minute${minutes === 1 ? "" : "s"}, and ${seconds} second${seconds === 1 ? "" : "s"}`);

    // If the count down errors, write some text 
    if (distance < 0) {
        clearInterval(x);
        $("#counter").innerHTML = "year";
    }
}, 1000);

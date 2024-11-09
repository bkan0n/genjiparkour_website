function closeMenuOnScroll() {
    const burgerMenuCheckbox = document.getElementById('burgerMenuScroll');


    if (burgerMenuCheckbox.checked) {
        burgerMenuCheckbox.checked = false; 
    }
}

window.addEventListener('scroll', closeMenuOnScroll);

document.addEventListener("DOMContentLoaded", function() {
    fetch("discord/check_session.php")
        .then(response => response.json())
        .then(data => {
            if (data.session_expired) {
                document.getElementById("sessionModal").style.display = "flex";
            }
        });
});
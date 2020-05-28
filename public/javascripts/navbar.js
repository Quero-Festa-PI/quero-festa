const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.navbar-row2');
    const navLinks = document.querySelectorAll('.navbar-row2 li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.2}s`;
            }
        });

        burger.classList.toggle('toggle');
    });
}

navSlide();

function redirecionarCadastro() {
    window.location.href = "http://localhost:3000/usuarios/cadastro";
}
function redirecionarLogin() {
    window.location.href = "http://localhost:3000/usuarios/logar";
}
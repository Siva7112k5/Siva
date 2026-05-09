const container = document.querySelector('.container');
const registerLink = document.querySelector('.register-link');
const loginLink = document.querySelector('.login-link');

console.log('Script loaded');

registerLink.onclick = (e) => {
    e.preventDefault();
    console.log('Register link clicked');
    container.classList.add('active');
}

loginLink.onclick = (e) => {
    e.preventDefault();
    console.log('Login link clicked');
    container.classList.remove('active');
}

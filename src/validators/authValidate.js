export function validateEmail(email) {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if (email === '') return "Email field should not be empty!";
    if (!email.match(emailRegex) || email.length < 5) return "Please provide a valid email!";

    return;
}

export function validateUsername(password) {
    if (password === '') return "Username field should not be empty!";
    if (password.length < 3) return "Username should be 3 symbols or more!";

    return;
}

export function validatePassword(password) {
    if (password === '') return "Password field should not be empty!";
    if (password.length < 6) return "Password should be 6 symbols or more!";

    return;
}

export function validateRepeatPassword(password, repeatPassword) {
    if (repeatPassword === '') return "Repeat password field should not be empty!";
    if (password !== repeatPassword) return "Passwords should match!";

    return;
}
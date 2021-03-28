import { URL } from '../config/config';
import { auth } from '../config/firebaseInit';

export function onRegister(email, username, password) {
    return auth.createUserWithEmailAndPassword(email, password)
        .then(() => auth.signInWithEmailAndPassword(email, password))
        .then(({ user }) => {
            localStorage.setItem('user', user.uid);
            localStorage.setItem('email', email);

            const newUser = {
                email: user.email,
                username,
                joined: new Date(),
            }

            //Authenticate the write request
            auth.currentUser.getIdToken(false)
                .then((token) => {
                    fetch(URL + `users/${user.uid}.json?auth=${token}`, {
                        method: "PUT",
                        body: JSON.stringify(newUser)
                    })
                });
        })
}

export function onLogin(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
}
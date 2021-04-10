import { URL } from '../config/config';
import { auth } from '../config/firebaseInit';

export function onRegister(email, username, password) {
    return auth.createUserWithEmailAndPassword(email, password)
        .then(() => auth.signInWithEmailAndPassword(email, password))
        .then(({ user }) => {
            const newUser = {
                email: user.email,
                username,
                joined: new Date(),
            }

            localStorage.setItem('uid', user.uid);
            localStorage.setItem('email', user.email);
            localStorage.setItem('username', username);

            //Authenticate the write request
            auth.currentUser.getIdToken(false)
                .then((token) => {
                    fetch(URL + `users/${user.uid}.json?auth=${token}`, {
                        method: "PUT",
                        body: JSON.stringify(newUser)
                    })
                });
        });
}

export function onLogin(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
}

export function getUsername(uid) {
    return fetch(URL + `users/${uid}.json`)
        .then(resp => resp.json());
}
import { URL } from '../config/config';
import { CurrenciesURL } from '../config/config';
import { auth } from '../config/firebaseInit';

export function getAll(userID) {
    return fetch(URL + `records/${userID}.json`)
        .then(res => res.json());
}

export function getOneByID (userID, id) {
    return fetch(URL + `records/${userID}/${id}.json`)
        .then(res => res.json());
}

export function addRecord(stock, amount, price, uid) {
    const newRecord = {
        stock,
        amount,
        price,
        createdAt: new Date()
    }

    return getCurrencies()
        .then(res => res.json())
        .then(data => {
            newRecord.rates = data.rates;
            return auth.currentUser.getIdToken(false)
        })
        .then((token) => {
            return fetch(URL + `records/${uid}.json?auth=${token}`, {
                method: "POST",
                body: JSON.stringify(newRecord)
            })
        })
        .then(res => res.json());
}

export function deleteByID(uid, id) {
    return auth.currentUser.getIdToken(false)
        .then((token) => {
            return fetch(URL + `records/${uid}/${id}.json?auth=${token}`, {
                method: "DELETE",
            })
        })
}

function getCurrencies() {
    return fetch(CurrenciesURL + "?base=USD");
}
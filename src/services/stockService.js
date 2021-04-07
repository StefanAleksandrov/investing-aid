import { URL } from '../config/config';
import { CurrenciesURL, ACCESS_KEY } from '../config/config';
import { auth } from '../config/firebaseInit';

export function getAll(userID) {
    return fetch(URL + `records/${userID}.json`)
        .then(res => res.json());
}

export function getOneByID (userID, id) {
    return fetch(URL + `records/${userID}/${id}.json`)
        .then(res => res.json());
}

export function addRecord(stock, uid) {
    const newRecord = {
        ...stock,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    return getCurrencies(stock.currency)
        .then(res => res.json())
        .then(data => {
            const EUR = Number(newRecord.price) / Number(data.rates[newRecord.currency.toUpperCase()]);
            newRecord.prices = {
                'EUR': Number(EUR.toFixed(2)),
                'BGN': Number((EUR * Number(data.rates.BGN)).toFixed(2)),
                'USD': Number((EUR * Number(data.rates.USD)).toFixed(2))
            };

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

export function updateRecord(stock, uid, id) {
    const newRecord = {
        ...stock,
        updatedAt: new Date()
    }

    const EUR = Number(newRecord.price) / Number(newRecord.rates[newRecord.currency.toUpperCase()]);
    newRecord.prices = {
        'EUR': Number(EUR.toFixed(2)),
        'BGN': Number((EUR * Number(newRecord.rates.BGN)).toFixed(2)),
        'USD': Number((EUR * Number(newRecord.rates.USD)).toFixed(2))
    };

    return auth.currentUser.getIdToken(false)
        .then((token) => {
            return fetch(URL + `records/${uid}/${id}.json?auth=${token}`, {
                method: "PUT",
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

function getCurrencies(currency) {
    return fetch(CurrenciesURL + `?access_key=${ACCESS_KEY}`);
}
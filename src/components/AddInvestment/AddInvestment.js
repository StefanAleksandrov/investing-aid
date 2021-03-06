import { useContext, useEffect, useState } from 'react';

import { addRecord, updateRecord, getOneByID } from '../../services/stockService';
import validate from '../../validators/stockValidate';
import NotificationContext from '../../contexts/NotificationContext';
import AuthContext from '../../contexts/AuthContext';

import './AddInvestment.scss';

export default function AddInvestment({
    history,
    match,
}) {
    const [stock, setStock] = useState({
        stock: '',
        amount: '',
        price: '',
        currency: 'USD',
    });

    const [errorStock, setErrorStock] = useState('');
    const [errorAmount, setErrorAmount] = useState('');
    const [errorPrice, setErrorPrice] = useState('');

    const dispatch = useContext(NotificationContext)[1];
    const currentUser = useContext(AuthContext)[0];

    useEffect(() => {
        if (match.params.id && currentUser) {
            getOneByID(currentUser.uid, match.params.id)
                .then(setStock);
        }
    }, [match.params.id, currentUser])

    function create(e) {
        e.preventDefault();

        //If no logged in user abort
        if (!currentUser.uid) return history.push('/');

        const stockError = validate.stock(stock.stock);
        const amountError = validate.amount(stock.amount);
        const priceError = validate.price(stock.price);

        setErrorStock(stockError);
        setErrorAmount(amountError);
        setErrorPrice(priceError);

        if (stockError || amountError || priceError) return;

        if (match.params.id) {
            updateRecord(stock, currentUser.uid, match.params.id)
                .then(() => {
                    dispatch({ message: 'Item updated successfully!', type: 'success', action: 'NOTIFY' });
                    history.push('/my-investments');
                })
                .catch(err => dispatch({ message: err.message, type: 'error', action: 'NOTIFY' }));

        } else {
            addRecord(stock, currentUser.uid)
                .then(() => {
                    dispatch({ message: 'Item added successfully!', type: 'success', action: 'NOTIFY' });
                    history.push('/my-investments');
                })
                .catch(err => dispatch({ message: err.message, type: 'error', action: 'NOTIFY' }));

        }
    }

    return (
        <div className="page-container add-record">
            <form className="form" onSubmit={create} >

                {
                    match.params.id
                        ? <h1 className="main-heading" >Edit Investment Record</h1>
                        : <h1 className="main-heading" >Add New Investment Record</h1>
                }

                <label className="error-container" >
                    Stock
                    <input type="text" name='stock' className={errorStock ? 'error' : ''} value={stock.stock} onChange={(event) => setStock(oldStock => ({ ...oldStock, stock: event.target.value }))} />
                    <div className={"error-message " + (errorStock ? '' : 'hide')} >{errorStock}</div>
                </label>

                <label className="error-container" >
                    Amount
                    <input type="number" name='amount' className={errorAmount ? 'error' : ''} value={stock.amount} onChange={(event) => setStock(oldStock => ({ ...oldStock, amount: event.target.value }))} />
                    <div className={"error-message " + (errorAmount ? '' : 'hide')} >{errorAmount}</div>
                </label>

                <label className="error-container" >
                    Price per share
                    <input type="float" name='price' className={errorPrice ? 'error' : ''} value={stock.price} onChange={(event) => setStock(oldStock => ({ ...oldStock, price: event.target.value }))} />
                    <div className={"error-message " + (errorPrice ? '' : 'hide')} >{errorPrice}</div>
                </label>

                <label className="error-container" >
                    Currency
                    <select name='currency' value={stock.currency} onChange={(event) => setStock(oldStock => ({ ...oldStock, currency: event.target.value }))} >
                        <option value="usd" >USD</option>
                        <option value="eur" >EUR</option>
                        <option value="bgn" >BGN</option>
                    </select>
                </label>

                {
                    match.params.id
                        ? <input type="submit" className="button" value='Update' />
                        : <input type="submit" className="button" value='Add' />
                }
            </form>
        </div>
    )
}
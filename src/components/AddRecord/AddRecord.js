import { useEffect, useState } from 'react';
import { addRecord, updateRecord, getOneByID } from '../../services/stockService';
import './AddRecord.scss';

export default function CreateRecord({
    history,
    match,
    currentUser,
}) {
    const [stock, setStock] = useState({
        stock: '',
        amount: '',
        price: '',
        currency: 'USD',
    });
    
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

        if (match.params.id) {
            updateRecord(stock, currentUser.uid, match.params.id)
                .then(() => history.push('/profile'))
                .catch (console.log);

        } else {
            addRecord(stock, currentUser.uid)
                .then(() => history.push('/profile'))
                .catch (console.log);

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

                <label htmlFor="stock">Stock</label>
                <input type="text" id='stock' name='stock' value={stock.stock} onChange={(event) => setStock(oldStock => ({...oldStock, stock: event.target.value }))} />

                <label htmlFor="amount">Amount</label>
                <input type="number" id='amount' name='amount' value={stock.amount} onChange={(event) => setStock(oldStock => ({...oldStock, amount: event.target.value }))} />

                <label htmlFor="price">Price per share</label>
                <input type="float" id='price' name='price' value={stock.price} onChange={(event) => setStock(oldStock => ({...oldStock, price: event.target.value }))} />

                <label htmlFor="currency">Currency</label>
                <select id='currency' name='currency' value={stock.currency} onChange={(event) => setStock(oldStock => ({...oldStock, currency: event.target.value }))} >
                    <option value="usd" >USD</option>
                    <option value="eur" >EUR</option>
                    <option value="bgn" >BGN</option>
                </select>

                {
                    match.params.id
                        ? <input type="submit" className="button" value='Update' />
                        : <input type="submit" className="button" value='Add' />
                }
            </form>
        </div>
    )
}
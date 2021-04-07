import { useEffect } from 'react';
import { addRecord, getOneByID } from '../../services/stockService';
import './AddRecord.scss';

export default function CreateRecord({ history, match }) {
    useEffect(() => {
        if (match.params.id) {
            getOneByID(5, match.params.id)
                .then(console.log);
        }
    }, [match.params.id])

    function create(e) {
        e.preventDefault();

        const uid = localStorage.getItem("user");

        //If no logged in user abort
        if (!uid) return history.push('/');

        const [stock, amount, price] = e.target.elements;
        addRecord(stock.value, amount.value, price.value, uid)
            .then(() => history.push('/profile'))
            .catch (console.log);
    }

    return (
        <div className="page-container add-record">
            <form onSubmit={create} >
                <h1>Add New Investment Record</h1>

                <label htmlFor="stock">Stock</label>
                <input type="text" id='stock' name='stock' />

                <label htmlFor="amount">Amount</label>
                <input type="number" id='amount' name='amount' />

                <label htmlFor="price">Price per share in USD</label>
                <input type="float" id='price' name='price' />

                <input type="submit" value='Add' />
            </form>
        </div>
    )
}
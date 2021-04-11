const validate = {
    stock(stock) {
        if (stock === '') return 'Stock field should not be empty!';
        if (stock.length < 3) return 'Stock should be 3 symbols or more!'

        return;
    },

    amount(amount) {
        if (amount === '') return 'Amount field should not be empty!';
        if (amount <= 0) return 'Amount should be a positive number!';

        return;
    },

    price(price) {
        if (price === '') return 'Price per share field should not be empty!';
        if (isNaN(Number(price))) return 'Price should be a number!';

        return;
    }
}

export default validate;
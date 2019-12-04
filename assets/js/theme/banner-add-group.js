$('.group-button').on('click', () => {
    function getCart() {
        return fetch('/api/storefront/cart', {
            credentials: 'include',
        })
        .then(response => response.json());
    }

    function postData(url = '', cartItems = {}) {
        return fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json' },
            body: JSON.stringify(cartItems),
        })
        .then(response => response.json());
    }

    getCart()
    .then((cartResponse) => {
        let url = '/api/storefront/cart';
        if (cartResponse.length) {
            url = `/api/storefront/carts/${cartResponse[0].id}/items`;
        }
        return url;
    })
    // .catch(error => console.error(error))
    .then(url => postData(url, {
        lineItems: [
            {
                quantity: 1,
                productId: 103,
            },
            {
                quantity: 1,
                productId: 98,
            },
            {
                quantity: 1,
                productId: 77,
                optionSelections: [
                    {
                        optionId: 108,
                        optionValue: 71,
                    },
                    {
                        optionId: 109,
                        optionValue: 11,
                    },
                ],
            },
        ] }
    ))
    .then(() => {
        window.location = '/cart.php';
    });
    // .catch(error => console.error(error));
});

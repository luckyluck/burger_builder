import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0
        }
    };

    componentDidMount() {
        // TODO add polyfill for other browsers
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};

        for (const param of query.entries()) {
            ingredients[param[0]] = param[1];
        }
        this.setState({ ingredients });
    }

    onCheckoutCanceledHandler = () => {
        this.props.history.goBack();
    };

    onCheckoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    onCheckoutCanceled={this.onCheckoutCanceledHandler}
                    onCheckoutContinued={this.onCheckoutContinuedHandler}
                />
            </div>
        );
    }
}

export default Checkout;

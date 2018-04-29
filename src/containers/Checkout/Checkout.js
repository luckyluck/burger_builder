import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

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
                    ingredients={this.props.ingredients}
                    onCheckoutCanceled={this.onCheckoutCanceledHandler}
                    onCheckoutContinued={this.onCheckoutContinuedHandler}
                />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ingredients: state.ingredients
});

export default connect(mapStateToProps)(Checkout);

import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions/actionTypes';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    };

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };

    updatePurchaseState = ingredients => {
        return Object.values(ingredients).some(ingredient => ingredient > 0); // or use reduce to sum up all values
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    };

    // componentDidMount = () => {
        // axios.get('ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data });
        //     })
        //     .catch(error => {
        //         this.setState({ error: true });
        //     });
    // };

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };

        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] === 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.props.ingredients) {
            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                price={this.props.totalPrice}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
            />;

            burger = (<Auxiliary>
                <Burger ingredients={this.props.ingredients}/>
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    price={this.props.totalPrice}
                    purchasable={this.updatePurchaseState(this.props.ingredients)}
                    ordered={this.purchaseHandler}
                />
            </Auxiliary>);
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => ({
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
});
const mapDispatchToProps = dispatch =>({
    onIngredientAdded: ingredientName => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName }),
    onIngredientRemoved: ingredientName => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName })
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import * as actions from '../../store/actions';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders(this.props.token);
    }

    render() {
        return this.props.loading ? <Spinner/> : <div>
            {this.props.orders.map(order => <Order
                key={order.id}
                ingredients={order.ingredients}
                price={order.price}
            />)}
        </div>;
    }
}

const mapStateToPros = state => ({
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token
});
const mapDispatchToProps = dispatch => ({
    onFetchOrders: token => dispatch(actions.fetchOrders(token))
});

export default connect(mapStateToPros, mapDispatchToProps)(withErrorHandler(Orders, axios));

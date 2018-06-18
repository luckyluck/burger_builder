import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions';

import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';

const asyncCheckout = asyncComponent(() => import('./containers/Checkout/Checkout'));
const asyncOrders = asyncComponent(() => import('./containers/Orders/Orders'));
const asyncAuth = asyncComponent(() => import('./containers/Auth/Auth'));

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignUp();
    }
    
    render() {
        return (
            <div>
                <Layout>
                    <Switch>
                        {this.props.isAuthenticated ? <Route path="/checkout" component={asyncCheckout} /> : null}
                        {this.props.isAuthenticated ? <Route path="/orders" component={asyncOrders} /> : null}
                        {!this.props.isAuthenticated ? <Route path="/auth" component={asyncAuth} /> : null}
                        {this.props.isAuthenticated ? <Route path="/logout" component={Logout} /> : null}
                        <Route path="/" exact component={BurgerBuilder} />
                        <Redirect to="/"/>
                    </Switch>
                </Layout>
            </div>
        );
    }
}

const mapPropsToState = state => ({
    isAuthenticated: state.auth.token !== null
});
const mapDispatchToProps = dispatch => ({
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
});

export default withRouter(connect(mapPropsToState, mapDispatchToProps)(App));

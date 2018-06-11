import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignUp();
    }
    
    render() {
        return (
            <div>
                <Layout>
                    <Switch>
                        {this.props.isAuthenticated ? <Route path="/checkout" component={Checkout} /> : null}
                        {this.props.isAuthenticated ? <Route path="/orders" component={Orders} /> : null}
                        {!this.props.isAuthenticated ? <Route path="/auth" component={Auth} /> : null}
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

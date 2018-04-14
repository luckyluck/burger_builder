import React, { Component } from 'react';

import _ from 'lodash';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';

import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street:  {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayName: 'Fastest' },
                        { value: 'cheapest', displayName: 'Cheapest' }
                    ]
                },
                value: ''
            }
        },
        loading: false
    };

    orderHandler = event => {
        event.preventDefault();
        this.setState({ loading: true });

        const formData = {};
        for (const formElementIdentifier in this.state.orderForm) {
            if (this.state.orderForm.hasOwnProperty(formElementIdentifier)) {
                formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
            }
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        };

        axios.post('/orders.json', order)
            .then(() => {
                this.setState({ loading: false });
                this.props.history.push('/');
            }).catch(() => {
                this.setState({ loading: false });
            });
    };

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = _.cloneDeep(this.state.orderForm);

        updatedOrderForm[inputIdentifier].value = event.target.value;

        this.setState({ orderForm: updatedOrderForm });
    };

    render() {
        const formElementsArray = [];

        for (const key in this.state.orderForm) {
            if (this.state.orderForm.hasOwnProperty(key)) {
                formElementsArray.push({
                    id: key,
                    config: this.state.orderForm[key]
                });
            }
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={event => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <Button btnType="Success">ORDER</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;

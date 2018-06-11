import React from 'react';

import BuildControl from './BuildControl/BuildControl';

import styles from './BuildControls.css';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const buildControls = (props) => (
    <div className={styles.BuildControls}>
        <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl
                key={ctrl.type}
                label={ctrl.label}
                more={() => props.ingredientAdded(ctrl.type)}
                less={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
            />
        ))}
        <button
            className={styles.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}
        >
            {props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
        </button>
    </div>
);

export default buildControls;

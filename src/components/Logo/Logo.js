import React from 'react';

import styles from './Logo.css';
import burgerLogo from '../../assets/images/burger-logo.png';

const logo = props => (
    <div className={styles.Logo}>
        <img src={burgerLogo} alt="My Burger" />
    </div>
);

export default logo;
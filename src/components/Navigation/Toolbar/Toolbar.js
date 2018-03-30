import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import styles from './Toolbar.css';

const toolbar = props => (
    <header className={styles.Toolbar}>
        <div>MENU</div>
        <div className={styles.Logo}>
            <Logo />
        </div>
        <nav>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;

import React from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import styles from './Cockpit.css';

const cockpit = (props) => {
    let btnClass = styles.Button;
    let classes = [];

    if (props.showPersons) {
        btnClass = [styles.Button, styles.Red].join(' ');
    }

    if (props.persons.length <= 2) {
        classes.push(styles.red);
    }
    if (props.persons.length <= 1) {
        classes.push(styles.bold);
    }

    return (
        <Auxiliary>
            <h1>{props.appTitle}</h1>
            <p className={classes.join(' ')}>This is really working!</p>

            <button className={btnClass} onClick={props.clicked}>
                Toggle persons
            </button>
        </Auxiliary>
    );

    // return [
    //     <h1 key="1">{props.appTitle}</h1>,
    //     <p key="2" className={classes.join(' ')}>This is really working!</p>,
    //     <button key="3" className={btnClass} onClick={props.clicked}>
    //         Toggle persons
    //     </button>
    // ];
};

export default cockpit;
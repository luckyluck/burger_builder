import React from 'react';

import './Person.css';

const person = (props) => {
    return (
        <div className="Person">
            <p onClick={props.click}>
                I'm a {props.name} and I am {props.age} years old!
            </p>
            {props.children ? <p onClick={props.click}>{props.children}</p> : null}
            <input type="text" onChange={props.changed} value={props.name} />
        </div>
    );
};

export default person;
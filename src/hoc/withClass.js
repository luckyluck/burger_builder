import React, { Component } from 'react';

// const withClass = (props) => (
//     <div className={props.classes}>
//         {props.children}
//     </div>
// );

// Stateless High Order Component
// const withClass = (WrappedComponent, className) => {
//     return (props) => (
//         <div className={className}>
//             <WrappedComponent {...props} />
//         </div>
//     )
// };

// Stateful High Order Component
const withClass = (WrappedComponent, className) => {
    return class extends Component {
        render() {
            return (
                <div className={className}>
                    <WrappedComponent {...this.props} />
                </div>
            )
        }
    }
};

export default withClass;
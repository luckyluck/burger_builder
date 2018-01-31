import React, { Component } from 'react';
import styles from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
    constructor(props) {
        super(props);
        console.log('[App.js] Inside Constructor', props);

        this.state = {
            persons: [
                { id: 'dfr44', name: 'Max', age: 28 },
                { id: 'dff34', name: 'Manu', age: 29 },
                { id: 'df23f', name: 'Stephanie', age: 26 }
            ],
            otherState: 'some other value',
            showPersons: false
        };
    }

    componentWilMount() {
        console.log('[App.js] Inside componentWilMount()');
    }

    componentDidMount() {
        console.log('[App.js] Inside componentDidMount()');
    }

    nameChangedHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(p => p.id === id);
        const person = {
            ...this.state.persons[personIndex]
        };
        person.name = event.target.value;

        const persons = this.state.persons;
        persons[personIndex] = person;

        this.setState({ persons });
    };

    togglePersonsHandler = () => {
        this.setState({
            showPersons: !this.state.showPersons
        });
    };

    deletePersonHandler = (personIndex) => {
        // const persons = this.state.persons.slice();
        const persons = [...this.state.persons];
        persons.splice(personIndex, 1);
        this.setState({ persons });
    };

    render() {
        console.log('[App.js] Inside render()');
        let persons = null;

        if (this.state.showPersons) {
            persons = <Persons
                        persons={this.state.persons}
                        clicked={this.deletePersonHandler}
                        changed={this.nameChangedHandler}
                    />;
        }

        return (
            <div className={styles.App}>
                <Cockpit
                    appTitle={this.props.title}
                    showPersons={this.state.showPersons}
                    persons={this.state.persons}
                    clicked={this.togglePersonsHandler}
                />

                {persons}
            </div>
        );
    }
}

export default App;

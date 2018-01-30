import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
    state = {
        persons: [
            { id: 'dfr44', name: 'Max', age: 28 },
            { id: 'dff34', name: 'Manu', age: 29 },
            { id: 'df23f', name: 'Stephanie', age: 26 }
        ],
        otherState: 'some other value',
        showPersons: false
    };

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
        const style = {
            backgroundColor: 'green',
            color: 'white',
            font: 'inherit',
            border: '1px solid blue',
            padding: '8px',
            cursor: 'pointer'
        };

        let persons = null;

        if (this.state.showPersons) {
            persons = (
                <div>
                    {this.state.persons.map((person, index) => {
                        return <Person
                                    click={() => this.deletePersonHandler(index)}
                                    name={person.name}
                                    age={person.age}
                                    changed={(event) => this.nameChangedHandler(event, person.id)}
                                    key={person.id}
                                />
                    })}
                </div>
            );

            style.backgroundColor = 'red';
        }

        let classes = [];
        if (this.state.persons.length <= 2) {
            classes.push('red');
        }
        if (this.state.persons.length <= 1) {
            classes.push('bold');
        }

        return (
            <div className="App">
                <h1>Hi, I'm React App</h1>
                <p className={classes.join(' ')}>This is really working!</p>

                <button
                    style={style}
                    onClick={this.togglePersonsHandler}
                >
                    Toggle persons
                </button>

                {persons}
            </div>
        );
    }
}

export default App;

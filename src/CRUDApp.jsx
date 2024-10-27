import React, { useState } from 'react';
import './CRUDApp.css';
import Note from './Components/Note/Note';
import Form from './Components/Form/Form';
import initFetch from './initFetch';
const baseUrl = 'http://localhost:7070/';
const { get, post, del } = initFetch(baseUrl);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            form: { text: '' },
            time: Date.now(),
        }
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    getNotes() {
        get('notes/')
            .then((data) => {
                this.setState({ notes: data });
            })
            .catch((error) => console.log("Could not load notes", error));
    }

    componentDidMount() {
        this.getNotes();

        this.timerID = setInterval(() => {
            this.setState({ time: Date.now() });
            this.getNotes();
        }, 10000)
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    handleFormChange({ target }) {
        const { name, value } = target;

        this.setState({form: { ...this.state.form, [name]: value }});
    }

    handleFormSubmit(form) {
        post('notes/', { text: form.text })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error occured with response statis: ${response.status}`);
                };
                return response.json();
            })
            .then((data) => {
                this.setState({notes: [this.state.notes, data]})
            })
            .catch((error) => console.log("Could not upload the note", error));

        this.setState({ form: { text: '' } });
    }

    handleDeleteClick(id) {
        del(`notes/${id}`, { text: this.state.form.text })
            .then(() => {
                this.getNotes();
            })
            .catch((error) => console.log("Could not delete the note", error));
    }

    render() {
        return (
            <div className="App">
                <div className="App-wrapper">
                    <h1 className="App-title">Notes</h1>
                    <div className="App-notes-container">
                        {this.state.notes.map((note) => {
                            return (
                                <Note
                                    key={note.id}
                                    id={note.id}
                                    text={note.text}
                                    onDeleteClick={() => this.handleDeleteClick(note.id)}
                                />
                            );
                        })}
                    </div>
                    <Form
                        onSubmit={this.handleFormSubmit}
                        onChange={this.handleFormChange}

                        form={this.state.form}
                    />
                </div>

            </div>
        );
    }
}

export default App;
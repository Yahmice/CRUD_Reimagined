import React from 'react';
import './Form.css';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.textRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.form.text === '') {
      this.textRef.current.focus();
    }
  }

  render() {
    const {
      onSubmit: handleFormSubmit,
      onChange: handleInputChange,
      form,
    } = this.props;

    return (
      <form
        className="Form"
        onSubmit={(event) => {
          event.preventDefault();
          handleFormSubmit(form);
        }}
      >
        <div className="Form-control">
          <label htmlFor="text">New note</label>
          <textarea
            className="Form-control__text"
            type="text"
            id="text"
            name="text"
            value={form.text}
            onChange={handleInputChange}
            ref={this.textRef}
            rows="3"
            autoComplete="off"
            required
          />
        </div>
        <button
          className="Form-control__button-add"
          type="submit"
        >
          &#10148;
        </button>
      </form>
    );
  }
}

export default Form;
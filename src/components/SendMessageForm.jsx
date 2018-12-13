import React, { Component } from 'react';

class SendMessageForm extends Component {

  state = {
    message: '',
  }

  handleChange = ( e ) => {
    this.setState({ message: e.target.value });
  }

  handleSubmit = ( e ) => {
    e.preventDefault();
    this.props.sendMessage( this.state.message );
    this.setState({
      message: '',
    })
  }

  render() {
    const { disabled } = this.props;
    return (
      <form 
        className="send-message-form"
        onSubmit={ this.handleSubmit }
      >
        <input
          type="text"
          disabled={ disabled }
          value={ this.state.message }
          onChange={ this.handleChange }
          placeholder="Type your message and hit ENTER"
        />
      </form>
    )
  }
}

export default SendMessageForm;
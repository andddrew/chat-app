import React, { Component } from 'react';

class NewRoomForm extends Component {
  state = {
    roomName: '',
  }

  handleSubmit = ( e ) => {
    e.preventDefault();
    this.props.createRoom( this.state.roomName );
    this.setState({
      roomName: ''
    });
  }

  handleChange = ( e ) => {
    this.setState({
      roomName: e.target.value
    });
  }

  render() {
    return (
      <div className="new-room-form">
        <form onSubmit={ this.handleSubmit }>
          <input
            type="text"
            placeholder="NewRoomForm"
            value={ this.state.roomName }
            onChange={ this.handleChange }
            required 
          />
          <button id="create-room-btn" type="submit">+</button>
        </form>
      </div>
    )
  }
}

export default NewRoomForm;
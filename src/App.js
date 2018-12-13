import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit';
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import NewRoomForm from './components/NewRoomForm';
import RoomList from './components/RoomList';

import { tokenUrl, instanceLocator } from './config';

class App extends Component {

  state = {
    roomId: null,
    messages: [],
    joinableRooms: [],
    joinedRooms: []
  }

  componentDidMount() {
    const tokenProvider = new Chatkit.TokenProvider({
      url: tokenUrl
    });
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: 'andrewjkwak',
      tokenProvider
    });

    chatManager.connect()
      .then( currentUser => {
        this.currentUser = currentUser;
        this.getRooms();
      })
  }
  
  getRooms = () => {
    this.currentUser.getJoinableRooms()
    .then( joinableRooms => {
      this.setState({
        joinableRooms,
        joinedRooms: this.currentUser.rooms
      })
    })
    .catch( err => {
      throw new Error( 'Error on joinableRooms', err );
    })
  }

  subscribeToRoom = ( roomId ) => {
    this.setState({
      messages: [],
    })
    this.currentUser.subscribeToRoom({
      roomId,
      hooks: {
        onNewMessage: message => {
          this.setState({
            messages: [ ...this.state.messages, message ]
          })
        }
      }
    })
    .then( room => {
      this.setState({
        roomId: room.id
      })
      this.getRooms();
    })
    .catch( err => {
      throw new Error( 'Error on getting rooms', err );
    })
  }

  sendMessage = ( text ) => {
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId,
    });
  }

  createRoom = ( name ) => {
    this.currentUser.createRoom({
      name
    })
      .then( room => this.subscribeToRoom( room.id ) )
      .catch( err => console.log( err ) )
  }

  render() {
    const { messages, joinableRooms, joinedRooms, roomId } = this.state;
    return (
      <div className="app">
        <RoomList 
          roomId={ roomId }
          rooms={[ ...joinableRooms, ...joinedRooms ]} 
          subscribeToRoom={ this.subscribeToRoom }  
        />
        <MessageList
          messages={ messages }
          roomId={ roomId }
        />
        <SendMessageForm
          disabled={ !roomId }
          sendMessage={ this.sendMessage }
        />
        <NewRoomForm createRoom={ this.createRoom } />
      </div>
    );
  }
}

export default App;

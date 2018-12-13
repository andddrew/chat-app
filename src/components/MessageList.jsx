import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Message from './Message';

class MessageList extends Component {

  componentWillUpdate() {
    const node = ReactDOM.findDOMNode( this );
    this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight;
  }

  componentDidUpdate() {
    if ( this.shouldScrollToBottom ) {
      const node = ReactDOM.findDOMNode( this );
      node.scrollTop = node.scrollHeight;
    }
  }

  render() {
    const { messages, roomId } = this.props;
    if ( !roomId ) {
      return (
        <div className="message-list">
          <div className="join-room">
            &larr; Join a room!
          </div>
        </div>
      )
    }
    return (
      <div className="message-list">
        {
          messages.map( message => (
            <Message message={ message } key={ message.id } />
          ))
        }
      </div>
    )
  }
}


export default MessageList;
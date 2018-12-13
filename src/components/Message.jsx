import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ message }) => (
  <div className="message">
    <div className="message-username">{ message.senderId }</div>
    <div className="message-text">{ message.text }</div>
  </div>
)

Message.propTypes = {
  message: PropTypes.shape({
    senderId: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired
}

export default Message;
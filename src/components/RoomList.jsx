import React from 'react';

const RoomList = ({ rooms, subscribeToRoom, roomId }) => {
  const orderedRooms = [ ...rooms ].sort( ( a, b ) => a.id - b.id );
  return (
    <div className="rooms-list">
      <ul>
        <h3>Your rooms:</h3>
        { orderedRooms.map( room => (
          <li 
            className={[ "room", room.id === roomId ? "active" : "" ].join(' ')}
            key={ room.id }
          >
            <a 
              href="#"
              onClick={ () => subscribeToRoom( room.id ) }
            >
              # { room.name }
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RoomList;
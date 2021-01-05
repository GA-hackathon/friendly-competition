import React, { Fragment } from 'react';
import './ContestChat.css';

function ContestChat({}) {
  return (
    <Fragment>
      <div className="container">
        <img src="" alt="Avatar" />
        <p>I love Pina Coladas and getting lost in the rain</p>
        <span className="time-right">11:00</span>
      </div>
      <div className="container darker">
        <img src="" alt="Avatar" class="right" />
        <p>So many awesome entries so hard to choose one!</p>
        <span className="time-left">11:01</span>
      </div>
    </Fragment>
  );
}

export default ContestChat;

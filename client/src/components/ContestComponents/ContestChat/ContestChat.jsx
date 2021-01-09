import React, { Fragment } from 'react';
import './ContestChat.css';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';

function ContestChat({ contest }) {
  // const [comments, setComments] = useState([]);

  // const COMMENTS = contest.comments.map((comment) => (
  //   <div className="container">
  //     <img src={comment?.user?.image} alt="Avatar" />
  //     <p>{comment.content}</p>
  //     <span className="time-right">{comment?.created_at}</span>
  //   </div>
  // ));

  return (
    <Fragment>
      {/* {COMMENTS} */}

      {/* <div className="input">
        <TextField variant="filled" rows={4} multiline />
        <Button>Add Comment</Button> */}
      {/* <svg
          width="50"
          height="50"
          viewBox="0 0 107 92"
          className="svg-arrow"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="path-arrow"
            onClick
            d="M0 92L107 46L0 0V35.7778L76.4286 46L0 56.2222V92Z"
            fill="black"
          />
        </svg>
      </div> */}

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

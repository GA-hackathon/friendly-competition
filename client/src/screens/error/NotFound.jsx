import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';

let StyledError = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  a {
    text-decoration: none;
    color: blue;
    font-size: 20px;
  }
  a:hover {
    transform: skew(-10deg);
  }
  p {
    width: 12em;
    font-size: larger;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

function Error() {
  let location = useLocation();
  const listRegex = /daniel michael|kristina timkova|cristina sahoo|pheonix ehmann|kara conway/;
  const result = location.pathname.toLowerCase().trim().match(listRegex);

  return (
    <StyledError>
      <div>
        <h1>ERROR 404</h1>
        {!result ? (
          <p>Sorry,&nbsp;{location.pathname.replace('/', '')} doesn't exist!</p>
        ) : (
          <p>
            {location.pathname.replace('/', '')} exists! unfortunately, it's not
            a page here
          </p>
        )}
        <NavLink to="/"> Go Back </NavLink>
      </div>
    </StyledError>
  );
}
export default Error;

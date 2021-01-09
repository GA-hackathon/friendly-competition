import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './Leaderboard.css'

library.add(faCrown)

function Leaderboard() {

    const history = useHistory()

    const routeChange = () => {
        let path = '/create-contest'
        history.push(path)
    }

    return (
        <div className='leaderboard-wrapper'>
            <div className='create-challenge-btn'>
            <div style={{ fontSize: '2rem', margin: '1rem' }}>Ready to create a Contest?</div>
            <Button variant='contained' style={{ fontSize: '1.5rem', padding: '0.5rem 2.5rem' }} onClick={routeChange}>Create Challenge.ME</Button>
            <Link to='/' style={{ margin: '1rem', color: 'black'}}>What is Challenge.ME?</Link>
            </div>
            <div className='leader-board'>
              <h4>Challenge.ME Leaderboard</h4>
              <ul className='leaders'>
                  <li><FontAwesomeIcon icon='crown' className='champion' /></li>
                  <li><AccountCircleIcon style={{ fontSize: '3rem'}} /></li>
                  <li>User name</li>
                  <li>1544</li>
                </ul>
              <ul className='leaders'>
                  <li><FontAwesomeIcon icon='crown' className='runner-up' /></li>
                  <li><AccountCircleIcon style={{ fontSize: '3rem'}} /></li>
                  <li>User name</li>
                  <li>956</li>
              </ul>
              <ul className='leaders'>
                  <li><FontAwesomeIcon icon='crown' className='third-place' /></li>
                  <li><AccountCircleIcon style={{ fontSize: '3rem'}} /></li>
                  <li>User name</li>
                  <li>450</li>
                </ul>
            </div>
        </div>
    )
}

export default Leaderboard

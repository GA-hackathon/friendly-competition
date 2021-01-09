import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
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
              <FontAwesomeIcon icon='crown' />
              <FontAwesomeIcon icon='crown' />
              <FontAwesomeIcon icon='crown' />
            </div>
        </div>
    )
}

export default Leaderboard

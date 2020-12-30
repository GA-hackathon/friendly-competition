import React, { Fragment, useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Search from '../../../components/Form/Search';
import { useStateValue } from "../../../providers/CurrentUserProvider";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import './ContestPage.css'
import Button from '@material-ui/core/Button';
import Layout from '../../../layout/Layout'
import TextField from '@material-ui/core/TextField';
import AddCircle from '@material-ui/icons/AddCircle';


function ContestPage() {
    const [{ currentUser }, dispatch] = useStateValue();
    const [timerDays, setTimerDays] = useState('00');
    const [timerHours, setTimerHours] = useState('00');
    const [timerMinutes, setTimerMinutes] = useState('00');
    const [timerSeconds, setTimerSeconds] = useState('00');

    let interval = useRef()

    const startTimer = () => {
        const countdownDate = new Date('May 30, 2020 00:00:00').getTime();

        interval = setInterval(() => {
            const now = new Date().getTime();
            const difference = countdownDate - now;

            const days = Math.floor(difference / (1000 * 60 *60 * 24));
            const hours = Math.floor((difference % (1000 * 60 *60 * 24) / (1000 * 60 * 60)));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            if (difference < 0) {
                // stop timer
                clearInterval(interval.current)
            } else {
                setTimerDays(days);
                setTimerHours(hours);
                setTimerMinutes(minutes);
                setTimerSeconds(seconds);
            }
        }, 1000)
    }

    useEffect(() => {
      startTimer();  
        return () => {
        clearInterval(interval.current);
        }
    })

    return (
        <Layout>
        <header>
          <div className='submission-name'>Best Pina Colada</div>
          <div className='search'><span style={{ 'margin-right': '1rem'}}>Search Submissions:</span>
          <Search /></div>
        </header>
        <main>
            <section className='timer-container'>
                <h5>Contest Ends In:</h5>
            <div className='timer'>
                <section>
                    <p>{timerDays}</p>
                    <p><small>Days</small></p>
                </section>
                <p>:</p>
                <section>
                    <p>{timerHours}</p>
                    <p><small>Hours</small></p>
                </section>
                <p>:</p>
                <section>
                    <p>{timerMinutes}</p>
                    <p><small>Minutes</small></p>
                </section>
                <p>:</p>
                <section>
                    <p>{timerSeconds}</p>
                    <p><small>Seconds</small></p>
                </section>
            </div>
            <h5>Contest Rules</h5>
            <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br/> 
            Turpis dictum dui sed lacinia. Est nibh interdum lectus faucibus urna arcu nibh.<br/>
            Nunc non sit eget dignissim. Et nulla sed non ipsum risus, quis nisi suscipit.<br/>
            </div>
            <h5>Try</h5><span></span>
            <p>Join the Discussion</p>
            </section>
            <div className='create-submission'>Contest Created by: <AccountCircleIcon className="icon-submission" /><span>{currentUser?.first_name}</span><span>{currentUser?.last_name}</span>
            <section>
                <h5>Ready to Enter?</h5>
                <form className='submissions-form'>
                <label>Entry Name<br/>
                <TextField variant='filled' type='text' name='submission_name'/>
                </label>
                <label>Write Entry<br/>
                <TextField multiline rows={4} variant='filled' type='textarea'name='content'/>
                </label>
                <label>Upload Entry
                <input
                type="file"
                id="image-upload"
                style={{ visibility: "hidden", fontSize: "0" }}
                // onChange={onImageSelected}
                />
                <div className='add-circle-icon'>
                <AddCircle style={{ fontSize: 30 }}></AddCircle>
                </div>
                </label>
                <Button className='enter-contest-btn' type='submit' variant="contained">Enter Contest</Button>
                </form>
            </section>
            </div>
        </main>
        <hr style={{ margin: "0rem 2rem"}}/>
        <section>
        <div className='submission-name'>View Contest Entries</div>
        </section>
        </Layout>
    )
}

export default ContestPage

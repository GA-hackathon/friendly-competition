import React, { Fragment, useState, useRef, useEffect } from 'react';
import Search from '../../../components/Form/Search';
import { useStateValue } from "../../../providers/CurrentUserProvider";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import './ContestPage.css'
import Button from '@material-ui/core/Button';
import Layout from '../../../layout/Layout'


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
            <h2>Contest Rules</h2>
            <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Turpis dictum dui sed lacinia. Est nibh interdum lectus faucibus urna arcu nibh. 
            Nunc non sit eget dignissim. Et nulla sed non ipsum risus, quis nisi suscipit.
            </div>
            </section>
            <div>Contest Created by: <AccountCircleIcon className="icon" /><span>{currentUser?.first_name}</span><span>{currentUser?.last_name}</span></div>
            <section className='create-submission'>
                <h3>Ready to Enter?</h3>
                <form>
                <label>Entry Name
                <input type='text' name='submission_name'/>
                </label>
                <label>Write Entry
                <input type='textarea'name='content'/>
                </label>
                <label>Upload Entry
                <img src='' alt='upload-icon'/>
                </label>
                <Button type='submit' variant="contained">Enter Contest</Button>
                </form>
            </section>
        </main>
        </Layout>
    )
}

export default ContestPage

import React, { Fragment, useState, useRef, useEffect } from 'react'
import './CountdownTimer.css'

function CountdownTimer() {
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
        <Fragment>
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
        </Fragment>
    )
}

export default CountdownTimer;

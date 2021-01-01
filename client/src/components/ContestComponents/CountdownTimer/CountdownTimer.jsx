import React, { Fragment, useState, useEffect } from 'react';
import './CountdownTimer.css';
import LinearProgress from '@material-ui/core/LinearProgress';

function CountdownTimer({ contest, setContestEnded }) {
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const [timerDays, setTimerDays] = useState('00');
  const [timerHours, setTimerHours] = useState('00');
  const [timerMinutes, setTimerMinutes] = useState('00');
  const [timerSeconds, setTimerSeconds] = useState('00');

  let interval = null;

  const startTimer = () => {
    const countdownDate = new Date(contest?.ending_time).getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = countdownDate - now;
      setIsTimerStarted(true);
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      if (difference < 0) {
        // stop timer

        clearInterval(interval);
      } else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval);
    };
  });

  /* eslint eqeqeq: 0 */
  // disable == warning in react.

  useEffect(() => {
    if (
      isTimerStarted &&
      timerDays == '00' &&
      timerHours == '00' &&
      timerMinutes == '00' &&
      timerSeconds == '00'
    ) {
      clearInterval(interval);
      setContestEnded(true);
      setIsTimerStarted(false);
    }
    //disabling dependency array warning, can't add the other dependencies it's yelling at me to add without breaking the functionality.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerSeconds]);

  if (!isTimerStarted) {
    return (
      <Fragment>
        <div className="timer loading">
          <section>
            <p>Loading...</p>
            <LinearProgress className="linear-progress" />
          </section>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <div className="timer">
        <section>
          <p>{timerDays}</p>
          <p>
            <small>Days</small>
          </p>
        </section>
        <p>:</p>
        <section>
          <p>{timerHours}</p>
          <p>
            <small>Hours</small>
          </p>
        </section>
        <p>:</p>
        <section>
          <p>{timerMinutes}</p>
          <p>
            <small>Minutes</small>
          </p>
        </section>
        <p>:</p>
        <section>
          <p>{timerSeconds}</p>
          <p>
            <small>Seconds</small>
          </p>
        </section>
      </div>
    </Fragment>
  );
}

export default CountdownTimer;

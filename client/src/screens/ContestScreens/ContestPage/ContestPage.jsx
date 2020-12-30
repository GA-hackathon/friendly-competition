import React, { Fragment, useState, useRef, useEffect } from 'react';
import Search from '../../../components/Form/Search';
import { useStateValue } from "../../../providers/CurrentUserProvider";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useParams } from 'react-router-dom';
import { getOneContest } from '../../../services/contests'
import FunOrangeLoading from "../../../components/Loading/FunOrangeLoading/FunOrangeLoading";

import './ContestPage.css'


function ContestPage() {
  const [{ currentUser }, dispatch] = useStateValue();
  const [contest, setContest] = useState(null);
  const [loaded, setLoaded] = useState(false);
  
  const { id } = useParams();
  
  useEffect(() => {
    const getData = async () => {
      const getContest = await getOneContest(id);
      setContest(getContest);
      setLoaded(true);
    };
    getData();
  }, []);

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

    if (!loaded) {
      return <FunOrangeLoading/>;
    }
  
    return (
        <Fragment>
        <header>
          <div className='submission-name'>{contest.name}</div>
          <span>Search Submissions:</span>
          <Search />
        </header>
        <main>
            <section className='timer-container'>
                <h2>Contest Ends In:</h2>
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
            </section>
            <h2>Contest Rules</h2>
            <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Turpis dictum dui sed lacinia. Est nibh interdum lectus faucibus urna arcu nibh. 
            Nunc non sit eget dignissim. Et nulla sed non ipsum risus, quis nisi suscipit.
            </div>
            <div>Contest Created by: <AccountCircleIcon className="icon" /><span>{currentUser?.first_name}</span><span>{currentUser?.last_name}</span></div>
        </main>
        </Fragment>
    )
}

export default ContestPage

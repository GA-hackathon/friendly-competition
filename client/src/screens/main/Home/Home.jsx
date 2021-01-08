import { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Wrapper from './styledHome'
import Layout from '../../../layout/Layout'
import { getAllContests } from '../../../services/contests'
import ContestCard from '../../../components/ContestComponents/ContestCard/ContestCard'
import FunOrangeLoading from '../../../components/Loading/FunOrangeLoading/FunOrangeLoading'
import ScrollToTopOnMount from '../../../components/Helpers/ScrollToTopOnMount'
import Button from '@material-ui/core/Button';

function Home() {
  const [allContests, setAllContests] = useState([])

  const [loaded, setLoaded] = useState(false)

  const compareDates = (contest1, contest2, property) => {
    let time1 = new Date(contest1[property]).getTime()
    let time2 = new Date(contest2[property]).getTime()

    if (time1 < time2) {
      return -1
    } else if (time1 > time2) {
      return 1
    } else {
      return 0
    }
  }

  useEffect(() => {
    const fetchContests = async () => {
      const contestData = await getAllContests()
      setAllContests(
        contestData
          .filter(
            (contest) =>
              compareDates(
                { ending_time: new Date().toISOString() },
                contest,
                'ending_time',
              ) < 1,
          )
          // only show 6 contests
          .slice(0, 6),
      )
      setLoaded(true)
    }
    fetchContests()
  }, [])

  // only get the new contests, based on created_at field
  // it shows the new contests which were created FIRST, where as in ending soon it shows the new contests which are just closest to ending
  const newContestsJSX = allContests
    .sort((contest1, contest2) =>
      compareDates(contest1, contest2, 'created_at'),
    )
    .map((contest) => (
      <ContestCard
        allContests={allContests}
        key={contest.id}
        contest={contest}
      />
    ))

  // only get the 6 ending soon
  // it's sorting in ascending order
  //  so the dates which are ending soon will be shown first
  const oldContestsJSX = allContests
    .sort((contest1, contest2) =>
      compareDates(contest1, contest2, 'ending_time'),
    )
    .map((contest) => (
      <ContestCard
        allContests={allContests}
        key={contest.id}
        contest={contest}
      />
    ))

    const history = useHistory()

    const routeChange = () => {
      let path = '/create-contest'
      history.push(path)
    }

  return (
    <>
      <ScrollToTopOnMount />
      <Layout>
        <Wrapper>
          <div className="row-1"></div>
          {!loaded ? (
            <FunOrangeLoading />
          ) : (
            <>
            <div style={{ fontSize: '2rem', margin: '1rem' }}>Ready to create a Contest?</div>
            <Button variant='contained' style={{ fontSize: '1.5rem', padding: '0.5rem 2.5rem' }} onClick={routeChange}>Create Challenge.ME</Button>
            <Link to='/' style={{ margin: '1rem'}}>What is Challenge.ME?</Link>
            <div className='leader-board'>
              <h5>Challenge.ME Leaderboard</h5>
            </div>
            <div className="all-contests inner-column">
              <h1 className="attention6"> Contests Ending Soon</h1>
              <div className="contest-list oldest">{oldContestsJSX}</div>
              <h1 className="attention">NEW Contests</h1>
              <div className="contest-list newest">{newContestsJSX}</div>
            </div>
            </>
          )}
        </Wrapper>
      </Layout>
    </>
  )
}

export default Home

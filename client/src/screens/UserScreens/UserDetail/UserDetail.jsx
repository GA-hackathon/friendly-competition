import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { checkContests, checkSubmissions } from '../../../utils/contestUtils';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { goBack } from '../../../utils/goBack';
import Wrapper from './styledUserDetail';
import FunOrangeLoading from '../../../components/Loading/FunOrangeLoading/FunOrangeLoading';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import { getOneUser } from '../../../services/users';

export default function UserDetail() {
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getContests = async () => {
      const getUser = await getOneUser(id);
      setUser(getUser);
      setLoaded(true);
    };
    getContests();
  }, [id]);

  const contestsJSX = user?.contests?.map((contest) => (
    <Link
      key={contest.id}
      className="contests-link"
      to={`./../contests/${contest.id}`}
    >
      {contest?.name}
    </Link>
  ));

  const submissionsJSX = user?.submissions?.map((submission) => (
    <Link
      key={submission.id}
      className="contests-link"
      to={`./../contests/${submission.contest_id}`}
    >
      {submission?.name}
    </Link>
  ));

  if (!loaded) {
    return <FunOrangeLoading />;
  }

  // https://stackoverflow.com/questions/49528336/how-to-make-space-between-strings-using-concat-method-in-javascript/49528547
  let fullName = user?.first_name?.concat(' ', user?.last_name);

  return (
    <Wrapper>
      <div className="content-container">
        <div className="title-container">
          <div className="arrow-container">
            <IconButton className="arrow-icon" onClick={goBack}>
              <ArrowBackIcon className="arrow-icon" />
            </IconButton>
          </div>
          <Typography className="title">
            {!user?.image && <AccountCircleIcon className="user-icon" />}
            {fullName}
          </Typography>
          {user?.image && (
            <img className="user-image" src={user?.image} alt={user?.name} />
          )}
        </div>
        <hr className="top-hr" />
        <div className="inner-column">
          <div className="check-contests">{checkContests(user)}</div>
          <div className="contests-container">{contestsJSX}</div>
          <div className="check-contests">{checkSubmissions(user)}</div>
          <div className="contests-container">{submissionsJSX}</div>
        </div>
        <br />
        <br />
        <hr className="bottom-hr" />
      </div>
    </Wrapper>
  );
}
